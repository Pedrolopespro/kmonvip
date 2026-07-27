import { sql } from "@/lib/db/client";
import type { LeadFilters, LeadInput, LeadRow, LeadStatus } from "./types";

function normalizePhone(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  return digits.length > 0 ? digits : null;
}

export const LeadService = {
  /** Creates a lead, or — if a lead with the same phone was created in the last 30 days —
   * updates that existing lead instead (avoids duplicate leads from repeat form submissions). */
  async createOrMerge(input: LeadInput): Promise<LeadRow> {
    const phoneNormalized = normalizePhone(input.phone);

    if (phoneNormalized) {
      const existing = (await sql`
        SELECT * FROM leads
        WHERE phone_normalized = ${phoneNormalized}
          AND created_at > now() - interval '30 days'
        ORDER BY created_at DESC
        LIMIT 1
      `) as LeadRow[];

      if (existing[0]) {
        const noteAddition = `Nova solicitação em ${new Date().toLocaleString("pt-BR")}${
          input.serviceInterest ? ` — serviço: ${input.serviceInterest}` : ""
        }`;
        const mergedNotes = existing[0].notes ? `${existing[0].notes}\n${noteAddition}` : noteAddition;
        // Keep first-touch gclid/fbclid if the lead already has one (matches the
        // 90-day first-touch cookie in tracking/attribution.ts) — only backfill
        // when the existing record doesn't have a value yet.
        const gclid = existing[0].gclid ?? input.gclid ?? null;
        const fbclid = existing[0].fbclid ?? input.fbclid ?? null;
        const updated = (await sql`
          UPDATE leads
          SET updated_at = now(), notes = ${mergedNotes}, gclid = ${gclid}, fbclid = ${fbclid}
          WHERE id = ${existing[0].id}
          RETURNING *
        `) as LeadRow[];
        return updated[0];
      }
    }

    const inserted = (await sql`
      INSERT INTO leads (
        name, company_name, phone, phone_normalized, email, service_interest,
        source, medium, campaign, conversion_page, gclid, fbclid, status, notes
      ) VALUES (
        ${input.name}, ${input.companyName ?? null}, ${input.phone ?? null}, ${phoneNormalized},
        ${input.email ?? null}, ${input.serviceInterest ?? null}, ${input.source ?? null},
        ${input.medium ?? null}, ${input.campaign ?? null}, ${input.conversionPage ?? null},
        ${input.gclid ?? null}, ${input.fbclid ?? null},
        'novo', ${input.notes ?? null}
      )
      RETURNING *
    `) as LeadRow[];
    return inserted[0];
  },

  async create(input: LeadInput): Promise<LeadRow> {
    const phoneNormalized = normalizePhone(input.phone);
    const inserted = (await sql`
      INSERT INTO leads (
        name, company_name, phone, phone_normalized, email, service_interest,
        source, medium, campaign, conversion_page, gclid, fbclid, status, notes
      ) VALUES (
        ${input.name}, ${input.companyName ?? null}, ${input.phone ?? null}, ${phoneNormalized},
        ${input.email ?? null}, ${input.serviceInterest ?? null}, ${input.source ?? null},
        ${input.medium ?? null}, ${input.campaign ?? null}, ${input.conversionPage ?? null},
        ${input.gclid ?? null}, ${input.fbclid ?? null},
        'novo', ${input.notes ?? null}
      )
      RETURNING *
    `) as LeadRow[];
    return inserted[0];
  },

  async getById(id: number): Promise<LeadRow | null> {
    const rows = (await sql`SELECT * FROM leads WHERE id = ${id}`) as LeadRow[];
    return rows[0] ?? null;
  },

  async update(
    id: number,
    patch: Partial<{ status: LeadStatus; notes: string; name: string; companyName: string; email: string; phone: string; serviceInterest: string }>
  ): Promise<LeadRow | null> {
    const current = await this.getById(id);
    if (!current) return null;

    const next = {
      name: patch.name ?? current.name,
      company_name: patch.companyName ?? current.company_name,
      email: patch.email ?? current.email,
      phone: patch.phone ?? current.phone,
      phone_normalized: patch.phone ? normalizePhone(patch.phone) : current.phone_normalized,
      service_interest: patch.serviceInterest ?? current.service_interest,
      status: patch.status ?? current.status,
      notes: patch.notes ?? current.notes,
    };

    const rows = (await sql`
      UPDATE leads SET
        name = ${next.name}, company_name = ${next.company_name}, email = ${next.email},
        phone = ${next.phone}, phone_normalized = ${next.phone_normalized},
        service_interest = ${next.service_interest}, status = ${next.status}, notes = ${next.notes},
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `) as LeadRow[];
    return rows[0] ?? null;
  },

  async list(filters: LeadFilters): Promise<{ rows: LeadRow[]; total: number }> {
    const limit = filters.limit ?? 25;
    const offset = filters.offset ?? 0;
    const search = filters.search ? `%${filters.search}%` : null;

    const rows = (await sql`
      SELECT * FROM leads
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search} OR company_name ILIKE ${search})
        AND (${filters.status ?? null}::text IS NULL OR status = ${filters.status ?? null})
        AND (${filters.source ?? null}::text IS NULL OR source = ${filters.source ?? null})
        AND (${filters.from ?? null}::text IS NULL OR created_at >= ${filters.from ?? null}::timestamptz)
        AND (${filters.to ?? null}::text IS NULL OR created_at <= ${filters.to ?? null}::timestamptz)
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as LeadRow[];

    const totalRows = (await sql`
      SELECT COUNT(*)::int AS count FROM leads
      WHERE (${search}::text IS NULL OR name ILIKE ${search} OR phone ILIKE ${search} OR company_name ILIKE ${search})
        AND (${filters.status ?? null}::text IS NULL OR status = ${filters.status ?? null})
        AND (${filters.source ?? null}::text IS NULL OR source = ${filters.source ?? null})
        AND (${filters.from ?? null}::text IS NULL OR created_at >= ${filters.from ?? null}::timestamptz)
        AND (${filters.to ?? null}::text IS NULL OR created_at <= ${filters.to ?? null}::timestamptz)
    `) as { count: number }[];

    return { rows, total: totalRows[0]?.count ?? 0 };
  },

  async countTotal(): Promise<number> {
    const rows = (await sql`SELECT COUNT(*)::int AS count FROM leads`) as { count: number }[];
    return rows[0]?.count ?? 0;
  },

  async countByStatus(status: LeadStatus): Promise<number> {
    const rows = (await sql`SELECT COUNT(*)::int AS count FROM leads WHERE status = ${status}`) as { count: number }[];
    return rows[0]?.count ?? 0;
  },

  async topSource(sinceDays = 30): Promise<string | null> {
    const rows = (await sql`
      SELECT source, COUNT(*)::int AS count
      FROM leads
      WHERE created_at >= now() - (${sinceDays} || ' days')::interval AND source IS NOT NULL
      GROUP BY source
      ORDER BY count DESC
      LIMIT 1
    `) as { source: string; count: number }[];
    return rows[0]?.source ?? null;
  },
};
