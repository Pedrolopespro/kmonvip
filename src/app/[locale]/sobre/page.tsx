import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageHero from "@/components/page/PageHero";
import FeatureList from "@/components/page/FeatureList";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a KMON VIP — 35 Anos em Transporte Executivo no Brasil",
  description:
    "Há 35 anos a KMON VIP atende CEOs, autoridades, embaixadas e grandes eventos no Brasil com transporte executivo, blindado e diplomático de padrão internacional.",
  path: "/sobre",
  keywords: [
    "sobre KMON VIP",
    "história KMON VIP",
    "empresa transporte executivo Brasil",
    "transporte executivo 35 anos",
    "KMON VIP Brasília",
    "transporte VIP empresa",
    "transporte para embaixadas tradição",
    "missão e valores KMON VIP",
  ],
  image: "/images/timeline/2024 g20.webp",
});

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Sobre", path: "/sobre" },
          ]}
        />

        <PageHero
          eyebrow="Sobre a KMON VIP"
          title="35 anos transportando quem move o mundo"
          subtitle="Há mais de três décadas a KMON VIP atende CEOs, autoridades, embaixadas, delegações e grandes eventos no Brasil — com discrição, precisão e padrão internacional."
          image="/images/timeline/2024 g20.webp"
          imageAlt="KMON VIP — operações executivas"
        />

        <section className="py-12 md:py-16" style={{ background: "var(--c-paper)" }}>
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-base md:text-lg text-ink-700 leading-relaxed mb-6">
              Sediada em Brasília, capital política e diplomática do Brasil, a KMON VIP foi fundada em 1990 com a missão de oferecer transporte executivo de padrão internacional para o mercado mais exigente do país. Em três décadas e meia, atendemos visitas de Estado, cúpulas multilaterais, operações esportivas globais e o dia a dia corporativo de grandes companhias.
            </p>
            <p className="text-base md:text-lg text-ink-700 leading-relaxed mb-6">
              Nossa frota — executiva, blindada e dedicada a comitivas — opera 24 horas em seis capitais brasileiras. Os motoristas são treinados em protocolo executivo, direção defensiva e atendimento bilíngue. Cada operação é planejada com discrição absoluta, confidencialidade contratual e suporte ininterrupto.
            </p>
            <p className="text-base md:text-lg text-ink-700 leading-relaxed">
              Mais do que uma empresa de transporte, somos parceiros logísticos para quem não admite improviso. Quando a agenda exige precisão de relógio suíço e o nível de exposição não permite erro, a KMON VIP é a escolha consolidada do mercado.
            </p>

            <div className="mt-10">
              <Link
                href="/sobre/historia"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-brand-champagne-dark transition-colors"
              >
                Ver linha do tempo de operações &rarr;
              </Link>
            </div>
          </div>
        </section>

        <FeatureList
          heading="Pilares da KMON VIP"
          features={[
            { title: "Segurança", desc: "Frota blindada, motoristas treinados, planejamento de rota e escolta sob demanda." },
            { title: "Discrição", desc: "Confidencialidade absoluta em cada operação. Protocolo executivo e diplomático." },
            { title: "Precisão", desc: "Operação 24 horas, suporte ininterrupto e logística sob medida para agendas críticas." },
            { title: "Cobertura nacional", desc: "Brasília, São Paulo, Rio, Belo Horizonte, Manaus, Belém." },
            { title: "Histórico comprovado", desc: "Copa do Mundo, Olimpíadas, G20, COP, visitas de Estado." },
            { title: "Atendimento internacional", desc: "Motoristas bilíngues, recepção diplomática, padrão global." },
          ]}
        />

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
