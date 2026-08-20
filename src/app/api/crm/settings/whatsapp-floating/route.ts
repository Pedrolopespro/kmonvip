import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { SiteSettingsService } from "@/lib/crm/siteSettingsService";

export const runtime = "nodejs";

const UpdateSchema = z.object({
  enabled: z.boolean().optional(),
  number: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 10 && v.length <= 15, {
      message: "Número deve ter entre 10 e 15 dígitos (código do país + DDD + número).",
    })
    .optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const config = await SiteSettingsService.getWhatsappFloating();
  return NextResponse.json({ ok: true, config });
}

export async function PATCH(req: NextRequest) {
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

  const parsed = UpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 400 }
    );
  }

  const config = await SiteSettingsService.setWhatsappFloating(parsed.data);
  return NextResponse.json({ ok: true, config });
}
