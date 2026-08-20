"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useQuoteModal } from "./QuoteModal";
import LanguageSwitcher from "./LanguageSwitcher";

const FLAGS: Record<string, string> = {
  pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸", zh: "🇨🇳", ja: "🇯🇵", fr: "🇫🇷", de: "🇩🇪",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const { open: openQuote } = useQuoteModal();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tLang = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (l: string) => {
    router.replace(pathname, { locale: l });
    setOpen(false);
  };

  const navLinks = [
    { label: tNav("home"),     href: "/" },
    { label: tNav("services"), href: "/servicos" },
    { label: tNav("fleet"),    href: "/frota" },
    { label: tNav("coverage"), href: "/atuacao" },
    { label: tNav("about"),    href: "/sobre" },
    { label: tNav("blog"),     href: "/blog" },
    { label: tNav("contact"),  href: "/contato" },
  ];

  // Show/hide header on scroll
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (y < 100) setVisible(true);
      else if (diff > 8) setVisible(false);
      else if (diff < -50) setVisible(true);

      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Body scroll lock when drawer open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* ─── Header bar (separate from drawer) ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-120%)",
          transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 pt-4">
          <nav className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white/80 backdrop-blur-xl px-6 py-3.5 shadow-sm">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logos/logo SVG KMON preta.svg"
                alt="KMON VIP"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm text-ink-700 transition-colors hover:text-ink-900 after:absolute after:left-0 after:right-full after:bottom-[-4px] after:h-px after:bg-ink-900 after:transition-all hover:after:right-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-paper transition-all hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {tCommon("requestQuote")}
              </button>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <div className="flex flex-col gap-1 w-4">
                <span
                  className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-ink-900 rounded-sm transition-all ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Backdrop (separate, dismisses drawer on click) ─── */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)" }}
      />

      {/* ─── Mobile drawer (top-level, not nested in header) ─── */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        className={`fixed inset-y-0 right-0 z-[60] flex flex-col w-full max-w-sm transition-transform duration-500 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "#0A0A0A",
          color: "#FAF9F5",
          boxShadow: open ? "-20px 0 60px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <Image
            src="/images/logos/logo SVG KMON preta.svg"
            alt="KMON VIP"
            width={100}
            height={33}
            className="h-7 w-auto object-contain invert"
          />
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col gap-1 px-6 pt-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/[0.08] text-2xl font-medium tracking-tight transition-all hover:text-brand-champagne hover:translate-x-1"
            >
              <span>{link.label}</span>
              <span className="opacity-30 text-lg">&rarr;</span>
            </Link>
          ))}
        </nav>

        {/* Language selector */}
        <div className="px-6 pt-4">
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40 mb-3">
            {tCommon("language")}
          </span>
          <div className="flex flex-wrap gap-2">
            {routing.locales.map((l) => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchLocale(l)}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-white bg-white text-ink-900 font-medium"
                      : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <span className="text-base leading-none">{FLAGS[l]}</span>
                  <span>{tLang(l)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 pb-8 pt-4 border-t border-white/[0.08] mt-4">
          <button
            type="button"
            onClick={() => { setOpen(false); openQuote(); }}
            className="block w-full text-center rounded-full py-4 font-medium text-sm transition-transform active:scale-[0.98]"
            style={{ background: "#FAF9F5", color: "#0A0A0A" }}
          >
            {tCommon("requestQuote")}
          </button>
          <p className="mt-4 text-xs text-center text-white/40">
            Atendimento 24h · contato@kmonvip.com
          </p>
        </div>
      </aside>
    </>
  );
}
