"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/tracking/events";
import { sendGTMEvent } from "@next/third-parties/google";

export default function Footer() {
  const t = useTranslations("footer");
  const tServices = useTranslations("services");
  const tCoverage = useTranslations("coverage");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();
  return (
    <footer id="contato" className="bg-ink-900 text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/logos/logo SVG KMON preta.svg"
                alt="KMON VIP"
                width={120}
                height={40}
                className="h-8 w-auto object-contain invert"
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              {t("solutionsTitle")}
            </h4>
            <ul className="space-y-3">
              {[
                { slug: "transporte-executivo" },
                { slug: "transporte-blindado" },
                { slug: "transporte-diplomatico" },
                { slug: "eventos-e-congressos" },
                { slug: "transfers-executivos" },
                { slug: "vans-e-onibus" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/servicos/${item.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {tServices(`items.${item.slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atuação */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              {t("coverageTitle")}
            </h4>
            <ul className="space-y-3">
              {[
                { slug: "brasilia" },
                { slug: "sao-paulo" },
                { slug: "rio-de-janeiro" },
                { slug: "belo-horizonte" },
                { slug: "manaus" },
                { slug: "belem" },
              ].map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/atuacao/${item.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {tCoverage(`items.${item.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              {t("institutionalTitle")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: tNav("about"),     href: "/sobre" },
                { label: t("historyLink"),  href: "/sobre/historia" },
                { label: tNav("fleet"),     href: "/frota" },
                { label: tNav("coverage"),  href: "/atuacao" },
                // Single partner page for now; point this at a /parcerias hub once
                // the event landings (NFL, Rock in Rio, F1) exist.
                { label: t("partnersLink"), href: "/parcerias/pousada-inacia" },
                { label: tNav("contact"),   href: "/contato" },
                { label: t("privacy"),      href: "/politica-de-privacidade" },
                { label: "LGPD",            href: "/lgpd" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-white/40 mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  {t("whatsapp24h")}
                </span>
                <a
                  href="https://wa.me/5561998630303"
                  onClick={() => {
                    trackEvent({ eventType: "whatsapp_click", buttonId: "footer-whatsapp", buttonLocation: "footer" });
                    sendGTMEvent({ event: "whatsapp_click", button_location: "footer" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  +55 (61) 99863-0303
                </a>
              </li>
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  {t("email")}
                </span>
                <a
                  href="mailto:contato@kmonvip.com"
                  className="hover:text-white transition-colors"
                >
                  contato@kmonvip.com
                </a>
              </li>
              <li className="text-sm text-white/60">
                <span className="block text-white/40 text-xs mb-1">
                  {t("service")}
                </span>
                {t("serviceValue")}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.08]">
          <p className="text-xs text-white/30">
            &copy; {year} KMON VIP. {t("copyright")}
          </p>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidade" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/lgpd" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
