import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "crypto";
import { z } from "zod";
import { EventService } from "@/lib/crm/eventService";
import { LeadService } from "@/lib/crm/leadService";

export const runtime = "nodejs";

const TO_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "contato@kmonvip.com";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "KMON VIP <naoresponda@kmonvip.com>";

const QuoteSchema = z.object({
  html: z.string().optional(),
  text: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  purpose: z.string().optional(),
  serviceType: z.string().optional(),
  vehicleProtection: z.string().optional(),
  landingPage: z.string().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  gclid: z.string().nullable().optional(),
  fbclid: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
});

function hashIp(ip: string): string {
  const dailySalt = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}:${dailySalt}`).digest("hex");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/quote] RESEND_API_KEY not configured");
    return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
  }

  let rawPayload: unknown;
  try {
    rawPayload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = QuoteSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
  const payload = parsed.data;

  const { html, text, fullName, email } = payload;
  if (!html && !text) {
    return NextResponse.json({ ok: false, error: "Missing email content" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIp(ip);
  const allowed = await EventService.isWithinRateLimit(ipHash).catch(() => true);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  // Persist lead + interaction event. Never fail the request if the DB write fails —
  // the email below is the guaranteed side effect this endpoint has always had.
  try {
    if (fullName) {
      await LeadService.createOrMerge({
        name: fullName,
        companyName: payload.company ?? null,
        phone: payload.phone ? `${payload.countryCode ?? ""}${payload.phone}` : null,
        email: email ?? null,
        serviceInterest: payload.serviceType ?? null,
        source: payload.utmSource ?? null,
        medium: payload.utmMedium ?? null,
        campaign: payload.utmCampaign ?? null,
        conversionPage: payload.landingPage ?? null,
        gclid: payload.gclid ?? null,
        fbclid: payload.fbclid ?? null,
      });
    }

    await EventService.record({
      eventType: "form_submission",
      pageUrl: payload.landingPage ?? null,
      service: payload.serviceType ?? null,
      utmSource: payload.utmSource ?? null,
      utmMedium: payload.utmMedium ?? null,
      utmCampaign: payload.utmCampaign ?? null,
      gclid: payload.gclid ?? null,
      fbclid: payload.fbclid ?? null,
      referrer: payload.referrer ?? null,
      ipHash,
    });
  } catch (dbError) {
    console.error("[api/quote] DB write failed (email will still be sent)", dbError);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email && typeof email === "string" ? email : undefined,
    subject: `Nova solicitação de cotação — ${fullName || "Site KMON VIP"}`,
    html: html || undefined,
    text: text || html!.replace(/<[^>]+>/g, " "),
  });

  if (error) {
    console.error("[api/quote] Resend error", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
