import FloatingLanguageButton from "./FloatingLanguageButton";
import WhatsAppButtonClient from "./WhatsAppButtonClient";
import { SiteSettingsService } from "@/lib/crm/siteSettingsService";

// Server Component: reads the live toggle from /crm/funcoes so every page that
// renders <WhatsAppButton /> reflects it without an extra client-side fetch/flash.
export default async function WhatsAppButton() {
  const { enabled, number } = await SiteSettingsService.getWhatsappFloating();

  if (!enabled) {
    // The language switcher is a separate feature that happens to float in the
    // same corner — hiding WhatsApp shouldn't take it down too.
    return <FloatingLanguageButton />;
  }

  return <WhatsAppButtonClient number={number} />;
}
