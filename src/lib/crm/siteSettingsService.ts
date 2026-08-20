import { connection } from "next/server";
import { sql } from "@/lib/db/client";

export type WhatsappFloatingConfig = {
  enabled: boolean;
  number: string;
};

const WHATSAPP_FLOATING_KEY = "whatsapp_floating";

// Matches the number hardcoded in WhatsAppButton before this setting existed —
// keeps behavior identical for every site until someone actually saves a change.
const DEFAULT_WHATSAPP_FLOATING: WhatsappFloatingConfig = {
  enabled: true,
  number: "5561998630303",
};

async function getValue<T>(key: string): Promise<T | null> {
  const rows = (await sql`SELECT value FROM site_settings WHERE key = ${key}`) as { value: T }[];
  return rows[0]?.value ?? null;
}

async function setValue(key: string, value: unknown): Promise<void> {
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}::jsonb, updated_at = now()
  `;
}

export const SiteSettingsService = {
  async getWhatsappFloating(): Promise<WhatsappFloatingConfig> {
    // Forces any Server Component reading this out of static prerendering —
    // without it, pages using generateStaticParams would bake in whatever the
    // DB had at build time and ignore live toggles from /crm/funcoes.
    await connection();
    const stored = await getValue<Partial<WhatsappFloatingConfig>>(WHATSAPP_FLOATING_KEY);
    return { ...DEFAULT_WHATSAPP_FLOATING, ...stored };
  },

  async setWhatsappFloating(patch: Partial<WhatsappFloatingConfig>): Promise<WhatsappFloatingConfig> {
    const current = await this.getWhatsappFloating();
    const next = { ...current, ...patch };
    await setValue(WHATSAPP_FLOATING_KEY, next);
    return next;
  },
};
