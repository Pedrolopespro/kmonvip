import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import PageCTA from "@/components/page/PageCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { fleet } from "@/lib/seo/constants";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: "Frota Executiva — Sedans, SUVs, Blindados, Vans e Ônibus Premium",
    description:
      "Frota KMON VIP: sedans executivos, SUVs premium, veículos blindados, vans Mercedes-Benz Sprinter e ônibus premium. Operação 24h em todo o Brasil.",
    path: "/frota",
    keywords: [
      "frota executiva KMON VIP",
      "sedan executivo com motorista",
      "SUV premium com motorista",
      "veículo blindado executivo",
      "van Mercedes Sprinter",
      "ônibus premium",
      "frota para comitiva",
      "locação frota executiva",
    ],
  });
}

export default function FrotaHub() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Frota", path: "/frota" },
          ]}
        />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
              Frota
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5 max-w-3xl">
              Frota executiva para diferentes níveis de operação
            </h1>
            <p className="text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
              Sedans executivos, SUVs premium, veículos blindados, vans Mercedes-Benz Sprinter e ônibus premium — sob coordenação única.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fleet.map((f) => (
              <Link
                key={f.slug}
                href={`/frota/${f.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-ink-800 block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-paper">
                  <h2 className="text-lg font-medium tracking-tight mb-2">{f.name}</h2>
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">{f.specs.model}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-brand-champagne">
                    Ver categoria
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <PageCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
