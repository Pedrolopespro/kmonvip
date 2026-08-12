import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { LeadService } from "@/lib/crm/leadService";
import { LEAD_STATUSES } from "@/lib/crm/types";

export const runtime = "nodejs";

const CreateLeadSchema = z.object({
  name: z.string().min(1),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  serviceInterest: z.string().optional(),
  serviceCity: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  const { rows, total } = await LeadService.list({
    search: params.get("search") ?? undefined,
    status: status && LEAD_STATUSES.includes(status as never) ? (status as never) : undefined,
    source: params.get("source") ?? undefined,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
    limit: Number(params.get("limit") ?? "25"),
    offset: Number(params.get("offset") ?? "0"),
  });

  return NextResponse.json({ ok: true, rows, total });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = CreateLeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const lead = await LeadService.create({
    name: parsed.data.name,
    companyName: parsed.data.companyName ?? null,
    phone: parsed.data.phone ?? null,
    email: parsed.data.email ?? null,
    serviceInterest: parsed.data.serviceInterest ?? null,
    serviceCity: parsed.data.serviceCity ?? null,
    source: parsed.data.source ?? "manual",
    notes: parsed.data.notes ?? null,
  });

  return NextResponse.json({ ok: true, lead });
}
