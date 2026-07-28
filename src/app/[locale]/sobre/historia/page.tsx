import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import Authority from "@/components/Authority";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Linha do Tempo — Grandes Operações e Eventos KMON VIP",
  description:
    "De Obama em 2011 à COP 30 em 2025 — linha do tempo das principais operações e eventos atendidos pela KMON VIP em 35 anos de história.",
  path: "/sobre/historia",
  keywords: [
    "história KMON VIP",
    "linha do tempo KMON VIP",
    "operações KMON VIP",
    "G20 Brasil 2024 transporte",
    "COP 30 Belém transporte",
    "Copa do Mundo 2014 transporte",
    "Olimpíadas Rio 2016 transporte",
    "visita Obama Brasil transporte",
    "visita Biden Brasil transporte",
    "cidadania honorária Lewis Hamilton",
  ],
});

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Sobre", path: "/sobre" },
            { name: "História", path: "/sobre/historia" },
          ]}
        />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              História
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              35 anos de operações que moveram o Brasil
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Da visita do Presidente Obama em 2011 à COP 30 em 2025. Linha do tempo das principais operações atendidas pela KMON VIP.
            </p>
          </div>
        </section>

        {/* Reusa o componente Authority com a timeline interativa */}
        <Authority />

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
