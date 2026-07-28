import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { LeadService } from "@/lib/crm/leadService";
import { LEAD_STATUSES, type LeadRow } from "@/lib/crm/types";

export const runtime = "nodejs";

const COLUMNS: { header: string; get: (l: LeadRow) => string }[] = [
  { header: "id", get: (l) => String(l.id) },
  { header: "nome", get: (l) => l.name },
  { header: "empresa", get: (l) => l.company_name ?? "" },
  { header: "telefone", get: (l) => l.phone ?? "" },
  { header: "email", get: (l) => l.email ?? "" },
  { header: "servico_interesse", get: (l) => l.service_interest ?? "" },
  { header: "origem", get: (l) => l.source ?? "" },
  { header: "midia", get: (l) => l.medium ?? "" },
  { header: "campanha", get: (l) => l.campaign ?? "" },
  { header: "pagina_conversao", get: (l) => l.conversion_page ?? "" },
  // gclid is what Google Ads' offline conversion import matches against the
  // original ad click — this is the whole point of this export.
  { header: "gclid", get: (l) => l.gclid ?? "" },
  { header: "fbclid", get: (l) => l.fbclid ?? "" },
  { header: "termo_busca", get: (l) => l.utm_term ?? "" },
  { header: "conteudo_anuncio", get: (l) => l.utm_content ?? "" },
  { header: "status", get: (l) => l.status },
  // Convenience column: Google Ads offline conversion import wants a plain
  // date/time. "fechado" is the status that represents a real conversion.
  { header: "conversion_time", get: (l) => new Date(l.updated_at).toISOString().replace("T", " ").slice(0, 19) },
  { header: "notas", get: (l) => l.notes ?? "" },
  { header: "criado_em", get: (l) => new Date(l.created_at).toISOString() },
];

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCsv(rows: LeadRow[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const lines = rows.map((row) => COLUMNS.map((c) => escapeCsvField(c.get(row))).join(","));
  return [header, ...lines].join("\r\n");
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const status = params.get("status");

  const { rows } = await LeadService.list({
    search: params.get("search") ?? undefined,
    status: status && LEAD_STATUSES.includes(status as never) ? (status as never) : undefined,
    source: params.get("source") ?? undefined,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
    limit: 10000,
    offset: 0,
  });

  const csv = "﻿" + toCsv(rows); // BOM so Excel opens UTF-8 accents correctly
  const filename = `leads-kmonvip-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
