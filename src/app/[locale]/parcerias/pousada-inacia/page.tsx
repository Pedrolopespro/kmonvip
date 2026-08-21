import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BreadcrumbsNav from "@/components/page/BreadcrumbsNav";
import FAQ from "@/components/page/FAQ";
import WhatsAppCTA from "@/components/page/WhatsAppCTA";
import { QuoteButton } from "@/components/QuoteModal";
import { buildMetadata } from "@/lib/seo/metadata";

const IMG = "/images/parcerias/pousada-inacia";

/** Pre-filled so every lead from this page self-identifies in the WhatsApp inbox. */
const WA_MESSAGE =
  "Olá! Vim pelo site da KMON VIP e quero informações sobre o transporte para a Pousada Inácia, na Chapada dos Veadeiros.";

export const metadata: Metadata = buildMetadata({
  title: "Transporte Oficial da Pousada Inácia — Chapada dos Veadeiros",
  description:
    "Transporte oficial da Pousada Inácia. Frota executiva com motorista até Alto Paraíso de Goiás e 4x4 para as cachoeiras da Chapada dos Veadeiros.",
  path: "/parcerias/pousada-inacia",
  image: `${IMG}/hero-desktop.webp`,
  keywords: [
    "transporte Pousada Inácia",
    "transfer Chapada dos Veadeiros",
    "transfer Brasília Alto Paraíso",
    "transfer Goiânia Chapada dos Veadeiros",
    "passeio 4x4 Chapada dos Veadeiros",
    "transfer executivo Alto Paraíso de Goiás",
    "motorista particular Chapada dos Veadeiros",
    "Salto do Rio Preto passeio",
  ],
});

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const PAISAGEM = [
  {
    src: `${IMG}/salto-rio-preto.webp`,
    alt: "Salto do Rio Preto despencando em dois filetes no Parque Nacional da Chapada dos Veadeiros",
    title: "Salto do Rio Preto",
    caption: "Duas quedas lado a lado, dentro do Parque Nacional.",
  },
  {
    src: `${IMG}/santa-barbara.webp`,
    alt: "Poço de água esmeralda da Cachoeira Santa Bárbara, na Chapada dos Veadeiros",
    title: "Santa Bárbara",
    caption: "A água mais azul da Chapada, em um poço só seu.",
  },
  {
    src: `${IMG}/mirante-janela.webp`,
    alt: "Mirante da Janela, com a rocha emoldurando o vale e as cachoeiras da Chapada dos Veadeiros",
    title: "Mirante da Janela",
    caption: "A rocha abre e o vale inteiro aparece.",
  },
];

const EXPERIENCIA = [
  {
    n: "01",
    title: "Frota executiva",
    desc: "Sedans, SUVs e vans com espaço, climatização e silêncio. O tipo de carro em que as horas passam sem você perceber.",
  },
  {
    n: "02",
    title: "Motorista dedicado",
    desc: "Profissional que conhece a região, cuida da bagagem, das paradas e do horário. Você não se preocupa com nada.",
  },
  {
    n: "03",
    title: "De onde você estiver",
    desc: "Buscamos em Brasília, em Goiânia ou no aeroporto onde você desembarcar. O carro está lá quando você chega.",
  },
];

const QUATRO_X_QUATRO = [
  "Diárias e meias-diárias, com saída direto da pousada",
  "Motorista com conhecimento local das trilhas e acessos",
  "Roteiros combinados junto com a equipe da Inácia",
  "Veículos preparados para estrada de terra e serra",
];

const SAIDAS = [
  {
    origem: "Brasília",
    tempo: "≈ 3h",
    desc: "Do aeroporto, do hotel ou de onde você preferir. A saída mais usada por quem chega de avião.",
  },
  {
    origem: "Goiânia",
    tempo: "≈ 5h30",
    desc: "Do aeroporto Santa Genoveva ou de qualquer ponto da cidade, com paradas planejadas no caminho.",
  },
];

const FAQS = [
  {
    q: "Não sou de Brasília nem de Goiânia. Vocês atendem mesmo assim?",
    a: "Sim — é o caso da maioria dos hóspedes. Você chega de avião em Brasília ou Goiânia e o carro já está no desembarque, no horário do seu voo. Se preferir outro ponto de encontro, combinamos com você.",
  },
  {
    q: "Vocês buscam no aeroporto?",
    a: "Sim. O motorista aguarda no desembarque com identificação e segue direto para Alto Paraíso. Combinamos o horário a partir do seu voo.",
  },
  {
    q: "Quantas pessoas cabem?",
    a: "Sedans e SUVs executivos para até 4 passageiros, minivans e vans para grupos maiores, e comboios quando o grupo ocupa mais de um carro. Nos diga quantos são e montamos a configuração.",
  },
  {
    q: "Posso contratar só a ida, ou só a volta?",
    a: "Pode. Muitos hóspedes vão de carro próprio e voltam conosco, ou o contrário. Também operamos apenas o retorno da pousada para o aeroporto, com horário calculado para você embarcar sem correr.",
  },
  {
    q: "O passeio 4x4 é obrigatório junto com o transporte?",
    a: "Não. São serviços independentes. Você pode contratar apenas o transporte, apenas os passeios durante a estadia, ou os dois — o formato mais escolhido, já que dispensa carro próprio na viagem inteira.",
  },
  {
    q: "Como funciona a reserva?",
    a: "Fale com a gente pelo WhatsApp ou envie uma cotação com as datas. Confirmamos disponibilidade, veículo e valor por escrito antes de qualquer pagamento. Em alta temporada, quanto antes melhor.",
  },
];

export default function PousadaInaciaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        {/* svh (not vh) so mobile browser chrome doesn't push the CTAs off-screen */}
        <section className="relative min-h-[92svh] md:min-h-[88vh] flex items-end overflow-hidden">
          {/* Art direction: portrait crop on phones, wide shot on desktop.
           * Plain <picture> so only ONE file downloads — two <Image fill>
           * siblings would preload both. Sources are already optimized webp. */}
          <picture>
            <source media="(min-width: 768px)" srcSet={`${IMG}/hero-desktop.webp`} />
            <img
              src={`${IMG}/hero-mobile.webp`}
              alt="Frota KMON VIP na entrada da Pousada Inácia, na Chapada dos Veadeiros, ao entardecer"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.78) 30%, rgba(10,10,10,0.22) 60%, rgba(10,10,10,0.35) 100%)",
            }}
          />

          {/* pb clears the site's fixed mobile language button (bottom-24 right-6,
           * 56px tall) so it never sits on top of the primary CTA. */}
          <div className="relative z-10 w-full mx-auto max-w-7xl px-5 pb-40 md:pb-20 pt-28">
            <div className="max-w-3xl">
              <span
                className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] mb-5 md:mb-6"
                style={{ color: "var(--brand-champagne)" }}
              >
                <span className="h-px w-6 sm:w-8" style={{ background: "var(--brand-champagne)" }} />
                Transporte oficial · Pousada Inácia
              </span>

              <h1
                className="text-[2.3rem] leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-paper mb-5 md:mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                Uma chegada à altura
                <br className="hidden sm:block" /> da Chapada dos Veadeiros.
              </h1>

              <p className="text-[15px] sm:text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mb-7 md:mb-9">
                Frota executiva com motorista até a Pousada Inácia e 4x4 para as cachoeiras.
                Você só olha pela janela.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <WhatsAppCTA
                  message={WA_MESSAGE}
                  buttonId="pousada-inacia-hero-whatsapp"
                  buttonLocation="pousada-inacia-hero"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  <WhatsAppIcon />
                  Falar no WhatsApp
                </WhatsAppCTA>

                <QuoteButton
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium border transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                  style={{ borderColor: "rgba(255,255,255,0.32)", color: "var(--c-paper)" }}
                >
                  Solicitar cotação
                  <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
                </QuoteButton>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAIXA DE PARCERIA ────────────────────────────────── */}
        <section className="border-b border-ink-100" style={{ background: "var(--c-ink-50)" }}>
          <div className="mx-auto max-w-7xl px-5 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
            <Image
              src={`${IMG}/logo-pousada-inacia.webp`}
              alt="Pousada Inácia"
              width={110}
              height={80}
              className="h-11 md:h-12 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block h-10 w-px bg-ink-200" />
            <p className="text-[13px] sm:text-sm text-ink-500 leading-relaxed max-w-xl">
              A <strong className="font-medium text-ink-900">KMON VIP</strong> é o transporte oficial da{" "}
              <strong className="font-medium text-ink-900">Pousada Inácia</strong> — Alto Paraíso de Goiás,
              Chapada dos Veadeiros.
            </p>
          </div>
        </section>

        {/* No "/parcerias" crumb yet — the hub page doesn't exist until the event
         * landings land, and a crumb linking to a 404 is worse than no crumb. */}
        <BreadcrumbsNav
          crumbs={[
            { name: "Início", path: "/" },
            { name: "Pousada Inácia", path: "/parcerias/pousada-inacia" },
          ]}
        />

        {/* ─── A PAISAGEM ───────────────────────────────────────── */}
        <section className="pt-10 pb-14 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-3xl mb-8 md:mb-14">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-3 md:mb-4 block">
                A paisagem
              </span>
              <h2
                className="text-[1.9rem] leading-[1.12] sm:text-4xl md:text-5xl font-medium tracking-tight mb-5"
                style={{ letterSpacing: "-0.025em" }}
              >
                Um dos lugares mais bonitos do Brasil.
              </h2>
              <p className="text-[15px] md:text-lg text-ink-500 leading-relaxed">
                Águas cor de esmeralda, quedas que despencam por dezenas de metros e mirantes que abrem o
                vale inteiro. Tudo isso a poucos quilômetros da Pousada Inácia — e no ritmo que você quiser.
              </p>
            </div>

            {/* Horizontal snap-scroll on phones (the majority here), grid on desktop */}
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {PAISAGEM.map((p) => (
                <figure key={p.title} className="snap-center shrink-0 w-[78vw] sm:w-[55vw] md:w-auto">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ink-100">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 78vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3.5">
                    <h3 className="text-base font-medium tracking-tight text-ink-900">{p.title}</h3>
                    <p className="text-[13px] sm:text-sm text-ink-500 leading-relaxed mt-1">{p.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ─── A EXPERIÊNCIA ────────────────────────────────────── */}
        <section className="py-14 md:py-24 bg-white border-y border-ink-100">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl mb-9 md:mb-14">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-3 md:mb-4 block">
                A experiência
              </span>
              <h2
                className="text-[1.9rem] leading-[1.12] sm:text-4xl md:text-5xl font-medium tracking-tight"
                style={{ letterSpacing: "-0.025em" }}
              >
                Conforto do primeiro ao último quilômetro.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
              {EXPERIENCIA.map((d) => (
                <div key={d.n} className="bg-white p-7 md:p-10">
                  <span
                    className="block text-xs font-medium tracking-[0.1em] mb-4 md:mb-6"
                    style={{ color: "var(--brand-champagne-ink)" }}
                  >
                    {d.n}
                  </span>
                  <h3 className="text-lg font-medium tracking-tight text-ink-900 mb-2.5 leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-[15px] sm:text-sm text-ink-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── O DESTINO ────────────────────────────────────────── */}
        <section className="py-14 md:py-24">
          <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100 order-2 lg:order-1">
              <Image
                src={`${IMG}/pousada-piscina.webp`}
                alt="Piscina e sede da Pousada Inácia, cercada pela mata nativa do cerrado"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-3 md:mb-4 block">
                O destino
              </span>
              <h2
                className="text-[1.9rem] leading-[1.12] sm:text-4xl font-medium tracking-tight mb-5"
                style={{ letterSpacing: "-0.025em" }}
              >
                Pousada Inácia
              </h2>
              <div className="space-y-4 text-[15px] md:text-lg text-ink-500 leading-relaxed">
                <p>
                  Dez suítes na Fazenda Almécegas, no ponto onde as águas descem o rio em uma sequência de
                  cachoeiras que fizeram a fama da região.
                </p>
                <p>
                  Piscina de frente para a mata nativa, SPA, e o L&rsquo;Alcofa servindo cozinha autoral com
                  ingredientes do cerrado. Cinco estrelas em plena Chapada.
                </p>
                <p className="text-ink-900">
                  Você cuida da reserva.{" "}
                  <span className="font-medium">Nós cuidamos de te levar até lá.</span>
                </p>
              </div>

              <a
                href="https://pousadainacia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-7 text-sm font-medium text-ink-900 border-b border-ink-300 pb-1 hover:border-ink-900 transition-colors"
              >
                Conhecer a Pousada Inácia
                <span style={{ color: "var(--brand-champagne-ink)" }}>&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── 4X4 ──────────────────────────────────────────────── */}
        <section className="py-14 md:py-28" style={{ background: "var(--c-ink-900)" }}>
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-3xl mb-9 md:mb-16">
              <span
                className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] mb-3 md:mb-4 block"
                style={{ color: "var(--brand-champagne)" }}
              >
                Passeios 4x4
              </span>
              <h2
                className="text-[1.9rem] leading-[1.1] sm:text-4xl md:text-5xl font-medium tracking-tight text-paper mb-5 md:mb-7"
                style={{ letterSpacing: "-0.03em" }}
              >
                As cachoeiras mais bonitas ficam no fim de estradas de terra.
              </h2>
              <div className="space-y-4 text-[15px] md:text-lg text-white/65 leading-relaxed">
                <p>
                  Nossa frota 4x4 leva você até elas — com motorista que conhece o acesso, a hora certa da
                  luz e o melhor caminho de volta.
                </p>
                <p className="text-paper font-medium text-base md:text-xl">
                  Você desce do carro pronto para a trilha.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
              <div className="lg:col-span-8 relative aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-ink-800">
                <Image
                  src={`${IMG}/hilux-trilha.webp`}
                  alt="Toyota Hilux 4x4 da KMON VIP em estrada de terra na Chapada dos Veadeiros"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-4 relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-ink-800">
                <Image
                  src={`${IMG}/hilux-mirante.webp`}
                  alt="Toyota Hilux 4x4 parada diante das formações rochosas da Chapada dos Veadeiros"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3.5 mt-9 md:mt-12 max-w-4xl">
              {QUATRO_X_QUATRO.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] md:text-base text-white/70">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: "var(--brand-champagne)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── SAÍDAS ───────────────────────────────────────────── */}
        <section className="py-14 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl mb-8 md:mb-12">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-3 md:mb-4 block">
                Saídas
              </span>
              <h2
                className="text-[1.9rem] leading-[1.12] sm:text-4xl font-medium tracking-tight mb-4"
                style={{ letterSpacing: "-0.025em" }}
              >
                De onde você preferir sair.
              </h2>
              <p className="text-[15px] md:text-lg text-ink-500 leading-relaxed">
                A maioria dos hóspedes chega de avião e pega o carro já no desembarque. Se você vem de
                outra cidade ou prefere outro ponto de encontro, combinamos com você.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {SAIDAS.map((r) => (
                <article
                  key={r.origem}
                  className="rounded-2xl border border-ink-100 bg-white p-7 md:p-10 hover:border-ink-300 transition-colors"
                >
                  {/* Stacked on phones — side by side the time gets clipped at 390px */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-5 pb-5 border-b border-ink-100">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink-900">
                      {r.origem}
                    </h3>
                    <span className="text-sm text-ink-500 sm:shrink-0">{r.tempo} de viagem</span>
                  </div>
                  <p className="text-[15px] sm:text-sm text-ink-500 leading-relaxed">{r.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHATSAPP INLINE ──────────────────────────────────── */}
        <section className="pb-14 md:pb-24">
          <div className="mx-auto max-w-7xl px-5">
            <div
              className="rounded-3xl px-6 py-10 md:px-16 md:py-16 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-12"
              style={{ background: "var(--c-ink-50)", border: "1px solid var(--c-ink-100)" }}
            >
              <div className="flex-1">
                <h2
                  className="text-[1.6rem] leading-tight md:text-3xl font-medium tracking-tight mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Já tem data marcada na Inácia?
                </h2>
                <p className="text-[15px] md:text-base text-ink-500 leading-relaxed max-w-xl">
                  Manda a data e de onde você sai. Respondemos com veículo, horário e valor — sem
                  formulário longo, sem espera.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <WhatsAppCTA
                  message={WA_MESSAGE}
                  buttonId="pousada-inacia-band-whatsapp"
                  buttonLocation="pousada-inacia-band"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
                  style={{ background: "var(--c-ink-900)", color: "var(--c-paper)" }}
                >
                  <WhatsAppIcon />
                  Falar no WhatsApp
                </WhatsAppCTA>

                <QuoteButton className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium border border-ink-200 bg-white text-ink-700 transition-all hover:border-ink-900 hover:text-ink-900 active:scale-[0.97]">
                  Solicitar cotação
                </QuoteButton>
              </div>
            </div>
          </div>
        </section>

        <FAQ faqs={FAQS} heading="Perguntas frequentes" />

        {/* ─── CTA FINAL ────────────────────────────────────────── */}
        <section className="py-16 md:py-28" style={{ background: "var(--c-ink-900)" }}>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span
              className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] mb-4 md:mb-5 block"
              style={{ color: "var(--brand-champagne)" }}
            >
              Chapada dos Veadeiros
            </span>
            <h2
              className="text-[2rem] leading-[1.08] md:text-5xl font-medium tracking-tight text-paper mb-4 md:mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              A Chapada te espera.
              <br />A gente te leva.
            </h2>
            <p className="text-[15px] md:text-lg text-white/60 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
              Transporte oficial da Pousada Inácia, com frota executiva e 4x4 para as cachoeiras.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
              <WhatsAppCTA
                message={WA_MESSAGE}
                buttonId="pousada-inacia-final-whatsapp"
                buttonLocation="pousada-inacia-final"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
                style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
              >
                <WhatsAppIcon />
                Falar no WhatsApp
              </WhatsAppCTA>

              <QuoteButton
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] sm:text-sm font-medium border transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.32)", color: "var(--c-paper)" }}
              >
                Solicitar cotação
                <span style={{ color: "var(--brand-champagne)" }}>&rarr;</span>
              </QuoteButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
