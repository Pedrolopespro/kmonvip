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
  "Olá! Vim pelo site da KMON VIP e quero informações sobre o transfer para a Pousada Inácia, na Chapada dos Veadeiros.";

export const metadata: Metadata = buildMetadata({
  title: "Transfer para a Pousada Inácia — Chapada dos Veadeiros | Transporte Oficial",
  description:
    "Transporte oficial da Pousada Inácia. Transfer executivo de Brasília e Goiânia até Alto Paraíso de Goiás e passeios 4x4 pelas trilhas da Chapada dos Veadeiros.",
  path: "/parcerias/pousada-inacia",
  image: `${IMG}/hero-desktop.webp`,
  keywords: [
    "transfer Pousada Inácia",
    "transfer Brasília Alto Paraíso",
    "transfer Goiânia Chapada dos Veadeiros",
    "transporte Chapada dos Veadeiros",
    "passeio 4x4 Chapada dos Veadeiros",
    "transfer executivo Alto Paraíso de Goiás",
    "transporte Alto Paraíso de Goiás",
    "motorista particular Chapada dos Veadeiros",
  ],
});

const ROTAS = [
  {
    origem: "Brasília",
    distancia: "≈ 230 km",
    tempo: "≈ 3h",
    desc: "Saída de qualquer ponto do DF, incluindo o Aeroporto Internacional de Brasília. BR-020 e GO-118 até a porta da pousada.",
  },
  {
    origem: "Goiânia",
    distancia: "≈ 420 km",
    tempo: "≈ 5h30",
    desc: "Saída de qualquer ponto de Goiânia, incluindo o Aeroporto Santa Genoveva. Paradas planejadas ao longo do trajeto.",
  },
];

const DIFERENCIAIS = [
  {
    n: "01",
    title: "Ninguém da sua família dirige",
    desc: "Motorista executivo do início ao fim. A viagem inteira é sua para descansar, trabalhar ou simplesmente olhar a estrada passar.",
  },
  {
    n: "02",
    title: "Porta a porta, sem baldeação",
    desc: "Buscamos onde você estiver — casa, escritório ou desembarque — e deixamos na recepção da Inácia. Sem locadora, sem devolução, sem fila.",
  },
  {
    n: "03",
    title: "Estrada conhecida",
    desc: "Nossos motoristas fazem esse trajeto. Sabem onde o asfalto muda, onde vale parar e a que horas a serra fica bonita.",
  },
];

const QUATRO_X_QUATRO = [
  "Diárias e meias-diárias, com saída direto da pousada",
  "Motorista com conhecimento local das trilhas e acessos",
  "Roteiros combinados junto com a equipe da Inácia",
  "Veículos preparados para estrada de terra e serra",
];

const FAQS = [
  {
    q: "Vocês buscam no Aeroporto de Brasília ou de Goiânia?",
    a: "Sim. O receptivo em aeroporto é parte do serviço: acompanhamos o status do voo, aguardamos no desembarque e seguimos direto para Alto Paraíso. Se o voo atrasar, o motorista espera — sem custo de reagendamento.",
  },
  {
    q: "Quantas pessoas cabem no transfer?",
    a: "Depende do veículo. Trabalhamos com sedans e SUVs executivos para até 4 passageiros, minivans e vans para grupos maiores, e comboios quando a família ou o grupo ocupa mais de um carro. Nos diga quantos são e montamos a configuração.",
  },
  {
    q: "Posso contratar só a ida, ou só a volta?",
    a: "Pode. Muitos hóspedes vão de carro próprio e voltam conosco, ou o contrário. Também operamos apenas o retorno da pousada para o aeroporto, com horário calculado para você embarcar sem correr.",
  },
  {
    q: "O passeio 4x4 é obrigatório junto com o transfer?",
    a: "Não. São serviços independentes. Você pode contratar apenas o transfer, apenas os passeios 4x4 durante a estadia, ou os dois — que é o formato mais escolhido, já que dispensa carro próprio na viagem inteira.",
  },
  {
    q: "Dá para fazer as cachoeiras sem 4x4?",
    a: "Algumas sim, outras não. Boa parte dos acessos mais bonitos da região termina em estrada de terra, que fica pesada na chuva e desgastante em carro baixo. O 4x4 com motorista resolve o acesso e ainda devolve seu dia — você chega para a trilha inteiro, não exausto da estrada.",
  },
  {
    q: "Como funciona a reserva e o pagamento?",
    a: "Fale com a gente pelo WhatsApp ou envie uma cotação com as datas. Confirmamos disponibilidade, veículo e valor por escrito antes de qualquer pagamento. A reserva é fechada com antecedência — em alta temporada, quanto antes melhor.",
  },
];

export default function PousadaInaciaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] md:min-h-[88vh] flex items-end overflow-hidden">
          {/* Art direction: a portrait crop on phones, the wide shot on desktop.
           * Plain <picture> so only ONE file downloads — two <Image fill> siblings
           * would preload both. Sources are already optimized webp. */}
          <picture>
            <source media="(min-width: 768px)" srcSet={`${IMG}/hero-desktop.webp`} />
            <img
              src={`${IMG}/hero-mobile.webp`}
              alt="Frota KMON VIP estacionada na entrada da Pousada Inácia ao entardecer"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          {/* Bottom-weighted scrim: the sky stays readable, the copy sits on solid dark */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 28%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0.35) 100%)",
            }}
          />

          <div className="relative z-10 w-full mx-auto max-w-7xl px-5 pb-14 md:pb-20 pt-32">
            <div className="max-w-3xl">
              <span
                className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] mb-6"
                style={{ color: "var(--brand-champagne)" }}
              >
                <span className="h-px w-8" style={{ background: "var(--brand-champagne)" }} />
                Transporte oficial · Pousada Inácia
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-paper mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                A Chapada começa
                <br />
                na porta da sua casa.
              </h1>

              <p className="text-base md:text-xl text-white/70 leading-relaxed max-w-2xl mb-9">
                Transfer executivo de Brasília e Goiânia até a Pousada Inácia, em Alto Paraíso.
                E 4x4 para as trilhas que a estrada comum não alcança.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <WhatsAppCTA
                  message={WA_MESSAGE}
                  buttonId="pousada-inacia-hero-whatsapp"
                  buttonLocation="pousada-inacia-hero"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Falar no WhatsApp
                </WhatsAppCTA>

                <QuoteButton
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium border transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--c-paper)" }}
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
          <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 text-center sm:text-left">
            <Image
              src={`${IMG}/logo-pousada-inacia.webp`}
              alt="Pousada Inácia"
              width={110}
              height={80}
              className="h-12 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block h-10 w-px bg-ink-200" />
            <p className="text-sm text-ink-500 leading-relaxed max-w-xl">
              A <strong className="font-medium text-ink-900">KMON VIP</strong> é o transporte oficial da{" "}
              <strong className="font-medium text-ink-900">Pousada Inácia</strong> — Fazenda Almécegas,
              Alto Paraíso de Goiás, Chapada dos Veadeiros.
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

        {/* ─── A ESTRADA ────────────────────────────────────────── */}
        <section className="py-16 md:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
                  A viagem
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.1]"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  São 230 km de Brasília.
                  <br />
                  420 de Goiânia.
                  <br />
                  <span style={{ color: "var(--brand-champagne-ink)" }}>A pergunta é quem dirige.</span>
                </h2>
              </div>

              <div className="lg:col-span-7 lg:pt-12">
                <div className="space-y-5 text-base md:text-lg text-ink-500 leading-relaxed max-w-2xl">
                  <p>
                    Chegar à Chapada dos Veadeiros é simples no mapa e cansativo no volante. Três horas
                    de BR-020 e GO-118 saindo de Brasília. Quase seis, saindo de Goiânia.
                  </p>
                  <p>
                    Some o trecho final, a serra no fim da tarde, a bagagem, as crianças — e a viagem que
                    deveria começar relaxante começa com o pescoço travado e o dia perdido.
                  </p>
                  <p className="text-ink-900 font-medium text-lg md:text-xl">
                    O ponto nunca foi o carro. É quem vai dirigir ele.
                  </p>
                  <p>
                    Com a KMON, ninguém da sua família dirige. Você entra, reclina, e a Chapada aparece
                    na janela.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferenciais */}
            <div className="grid md:grid-cols-3 gap-px mt-16 md:mt-24 bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
              {DIFERENCIAIS.map((d) => (
                <div key={d.n} className="bg-paper p-8 md:p-10">
                  <span
                    className="block text-xs font-medium tracking-[0.1em] mb-6"
                    style={{ color: "var(--brand-champagne-ink)" }}
                  >
                    {d.n}
                  </span>
                  <h3 className="text-lg font-medium tracking-tight text-ink-900 mb-3 leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── O DESTINO ────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white border-y border-ink-100">
          <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
                O destino
              </span>
              <h2
                className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
                style={{ letterSpacing: "-0.025em" }}
              >
                Pousada Inácia
              </h2>
              <div className="space-y-4 text-base md:text-lg text-ink-500 leading-relaxed">
                <p>
                  Dez suítes na Fazenda Almécegas, no ponto onde as águas descem o rio em uma sequência
                  de cachoeiras que fizeram a fama da região.
                </p>
                <p>
                  Piscina de frente para a mata nativa, SPA, e o L&rsquo;Alcofa servindo cozinha autoral
                  com ingredientes do cerrado. Cinco estrelas em plena Chapada — a dez minutos do
                  Santuário Ecológico Vale Dourado.
                </p>
                <p className="text-ink-900">
                  Você cuida da reserva. <span className="font-medium">Nós cuidamos de te levar até lá.</span>
                </p>
              </div>

              <a
                href="https://pousadainacia.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-ink-900 border-b border-ink-300 pb-1 hover:border-ink-900 transition-colors"
              >
                Conhecer a Pousada Inácia
                <span style={{ color: "var(--brand-champagne-ink)" }}>&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── 4X4 ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-28" style={{ background: "var(--c-ink-900)" }}>
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-3xl mb-12 md:mb-16">
              <span
                className="text-[11px] font-medium uppercase tracking-[0.14em] mb-4 block"
                style={{ color: "var(--brand-champagne)" }}
              >
                Passeios 4x4
              </span>
              <h2
                className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] text-paper mb-7"
                style={{ letterSpacing: "-0.03em" }}
              >
                As trilhas que o sedan não faz.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-white/65 leading-relaxed">
                <p>
                  A Chapada guarda o melhor dela no fim de estradas de terra. Cachoeiras que despencam
                  por dezenas de metros, mirantes que abrem o vale inteiro, poços de água transparente
                  onde raramente há mais de dez pessoas.
                </p>
                <p>
                  Nossa frota 4x4 leva você até lá — com motorista que conhece o acesso, a hora certa da
                  luz e o caminho de volta antes de escurecer.
                </p>
                <p className="text-paper font-medium text-lg md:text-xl">
                  Você desce do carro pronto para a trilha. Não exausto dela.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 relative aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-ink-800">
                <Image
                  src={`${IMG}/hilux-trilha.webp`}
                  alt="Toyota Hilux 4x4 da KMON VIP em estrada de terra na Chapada dos Veadeiros"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-5">
                <div className="relative aspect-[4/3] lg:flex-1 rounded-2xl overflow-hidden bg-ink-800">
                  <Image
                    src={`${IMG}/hilux-mirante.webp`}
                    alt="Toyota Hilux 4x4 parada diante das formações rochosas da Chapada dos Veadeiros"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 mt-12 max-w-4xl">
              {QUATRO_X_QUATRO.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/70">
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

        {/* ─── ROTAS ────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500 mb-4 block">
                Rotas
              </span>
              <h2
                className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1]"
                style={{ letterSpacing: "-0.025em" }}
              >
                Duas saídas. Um destino.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {ROTAS.map((r) => (
                <article
                  key={r.origem}
                  className="rounded-2xl border border-ink-100 bg-white p-8 md:p-10 hover:border-ink-300 transition-colors"
                >
                  <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink-900">
                      {r.origem}
                    </h3>
                    <span className="text-ink-300">&rarr;</span>
                    <span className="text-base text-ink-500">Pousada Inácia</span>
                  </div>

                  <div className="flex gap-8 mb-6 pb-6 border-b border-ink-100">
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.1em] text-ink-500 mb-1">
                        Distância
                      </span>
                      <span className="text-lg font-medium text-ink-900">{r.distancia}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.1em] text-ink-500 mb-1">
                        Tempo
                      </span>
                      <span className="text-lg font-medium text-ink-900">{r.tempo}</span>
                    </div>
                  </div>

                  <p className="text-sm text-ink-500 leading-relaxed">{r.desc}</p>
                </article>
              ))}
            </div>

            <p className="text-sm text-ink-500 leading-relaxed mt-8 max-w-2xl">
              Operamos também o trecho inverso — retorno da pousada para o aeroporto no dia do voo, com
              horário calculado para você embarcar sem correr.
            </p>
          </div>
        </section>

        {/* ─── WHATSAPP INLINE ──────────────────────────────────── */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5">
            <div
              className="rounded-3xl px-7 py-12 md:px-16 md:py-16 flex flex-col lg:flex-row lg:items-center gap-9 lg:gap-12"
              style={{ background: "var(--c-ink-50)", border: "1px solid var(--c-ink-100)" }}
            >
              <div className="flex-1">
                <h2
                  className="text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Já tem data marcada na Inácia?
                </h2>
                <p className="text-base text-ink-500 leading-relaxed max-w-xl">
                  Manda a data e de onde você sai. Respondemos com veículo, horário e valor — sem
                  formulário longo, sem espera.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <WhatsAppCTA
                  message={WA_MESSAGE}
                  buttonId="pousada-inacia-band-whatsapp"
                  buttonLocation="pousada-inacia-band"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]"
                  style={{ background: "var(--c-ink-900)", color: "var(--c-paper)" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Falar no WhatsApp
                </WhatsAppCTA>

                <QuoteButton
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium border border-ink-200 bg-white text-ink-700 transition-all hover:border-ink-900 hover:text-ink-900 active:scale-[0.97]"
                >
                  Solicitar cotação
                </QuoteButton>
              </div>
            </div>
          </div>
        </section>

        <FAQ faqs={FAQS} heading="Perguntas frequentes" />

        {/* ─── CTA FINAL ────────────────────────────────────────── */}
        <section className="py-20 md:py-28" style={{ background: "var(--c-ink-900)" }}>
          <div className="mx-auto max-w-3xl px-5 text-center">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em] mb-5 block"
              style={{ color: "var(--brand-champagne)" }}
            >
              Chapada dos Veadeiros
            </span>
            <h2
              className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] text-paper mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              A estrada é nossa.
              <br />
              O descanso é seu.
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Transfer de Brasília e Goiânia até a Pousada Inácia, e 4x4 para as trilhas da Chapada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppCTA
                message={WA_MESSAGE}
                buttonId="pousada-inacia-final-whatsapp"
                buttonLocation="pousada-inacia-final"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
                style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </WhatsAppCTA>

              <QuoteButton
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium border transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--c-paper)" }}
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
