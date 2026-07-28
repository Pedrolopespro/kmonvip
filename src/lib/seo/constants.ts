// ─── Site-wide constants ──────────────────────────────────────────────
export const SITE_URL = "https://www.kmonvip.com";
export const SITE_NAME = "KMON VIP";
export const SITE_TAGLINE = "Transporte Executivo, Blindado e Diplomático";
export const DEFAULT_OG_IMAGE = "/images/hero/mercedes-hero.webp";

export const BRAND_FOUNDED = "1990"; // TODO: confirm with client
export const BRAND_PHONE = "+55-61-99863-0303";
export const BRAND_EMAIL = "contato@kmonvip.com";
export const BRAND_WHATSAPP = "5561998630303";

// ─── Analytics IDs (single source of truth — used by the public layout AND /crm/configuracoes) ─
export const GTM_ID = "GTM-TPN3SG8Z";
export const CLARITY_ID = "xkjdgicz0s";
export const GSC_VERIFICATION = "EgswlTuyhrqkUXM3NlcmfA1KFJZ7Khe7uEFWJkxNdg8";

/** Best-effort service slug for a given pathname, e.g. "/servicos/transporte-blindado/brasilia" -> "transporte-blindado". */
export function deriveServiceFromPath(pathname: string): string | null {
  const match = services.find((s) => pathname.includes(`/servicos/${s.slug}`));
  return match?.slug ?? null;
}

// ─── Services (slug, name, keywords, image, FAQs) ────────────────────
export type Service = {
  slug: string;
  name: string;
  shortName: string;
  hook: string; // headline used as H1
  meta: { title: string; description: string; keywords: string[] };
  intro: string; // ~120-180 words
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "transporte-executivo",
    name: "Transporte Executivo",
    shortName: "Executivo",
    hook: "Transporte Executivo com Motorista — Mobilidade Corporativa de Alto Padrão",
    meta: {
      title: "Transporte Executivo com Motorista no Brasil",
      description: "Sedans e SUVs executivos com motorista para reuniões, agendas corporativas e deslocamentos individuais em Brasília, São Paulo, Rio e principais capitais.",
      keywords: [
        "transporte executivo",
        "transporte executivo com motorista",
        "motorista executivo",
        "carro executivo com motorista",
        "transporte corporativo Brasília",
        "transporte executivo São Paulo",
        "transporte executivo Rio de Janeiro",
        "sedan executivo com motorista",
        "SUV executivo com motorista",
        "transporte corporativo de luxo",
        "transporte VIP empresarial",
        "locação carro executivo",
        "transporte executivo corporativo",
        "chofer executivo",
        "motorista bilíngue executivo",
      ],
    },
    intro:
      "A KMON VIP oferece transporte executivo com motorista para empresas, executivos e líderes que exigem pontualidade, discrição e padrão internacional em cada deslocamento. Nossa frota premium reúne sedans e SUVs executivos com motoristas treinados, bilíngues e protocolados para atender agendas corporativas, recepções de clientes e deslocamentos individuais. Operação 24 horas em Brasília — sede da empresa — e atendimento nas principais capitais do Brasil, com planejamento logístico sob medida para cada operação. Há 35 anos atendendo CEOs, autoridades e delegações com o mais alto padrão de mobilidade.",
    features: [
      { title: "Frota premium renovada", desc: "Sedans executivos, sedans e SUVs blindados, mini vans e vans executivas de alto padrão." },
      { title: "Motoristas treinados e bilíngues", desc: "Profissionais com protocolo executivo, fluentes em inglês e espanhol." },
      { title: "Operação 24h", desc: "Atendimento contínuo com suporte operacional e backup de frota." },
      { title: "Discrição absoluta", desc: "Confidencialidade contratual e protocolo para agendas sensíveis." },
      { title: "Cobertura nacional", desc: "Brasília, São Paulo, Rio de Janeiro, Belo Horizonte, Manaus, Belém." },
    ],
    faqs: [
      {
        q: "Quais veículos compõem a frota executiva da KMON VIP?",
        a: "Sedans executivos (Toyota Corolla ou similar), sedans blindados (Mercedes-Benz Classe E Blindado), SUVs blindados (Jeep Commander Blindado), mini vans (Mercedes-Benz Vito), vans (Mercedes-Benz Sprinter) e ônibus premium.",
      },
      {
        q: "O motorista é treinado para atendimento executivo?",
        a: "Sim. Todos os motoristas KMON VIP passam por treinamento em protocolo executivo, direção defensiva, discrição e atendimento bilíngue (português, inglês e espanhol).",
      },
      {
        q: "Como funciona a contratação por período?",
        a: "Atendemos por hora, por diária, por evento ou em contratos contínuos (mensais). A cotação é personalizada conforme cidade, modelo de veículo e tempo de operação.",
      },
      {
        q: "Em quais cidades a KMON VIP opera?",
        a: "Atendemos em Brasília (sede), São Paulo, Rio de Janeiro, Belo Horizonte, Manaus e Belém. Outras cidades sob consulta.",
      },
    ],
    image: "/images/services/transporte-executivo.webp",
  },
  {
    slug: "transporte-blindado",
    name: "Transporte Blindado",
    shortName: "Blindado",
    hook: "Transporte Blindado Executivo com Motorista Treinado",
    meta: {
      title: "Transporte Blindado com Motorista no Brasil",
      description: "Veículos blindados com motorista treinado para agendas que exigem segurança elevada, confidencialidade e proteção. Brasília, São Paulo e Rio de Janeiro.",
      keywords: [
        "transporte blindado",
        "transporte blindado executivo",
        "carro blindado com motorista",
        "veículo blindado executivo",
        "blindado Brasília",
        "blindado com motorista São Paulo",
        "transporte VIP blindado",
        "SUV blindado com motorista",
        "escolta executiva",
        "motorista blindado treinado",
        "transporte seguro executivo",
        "blindado para diplomatas",
        "transporte blindado Rio de Janeiro",
        "locação carro blindado",
        "transporte blindado corporativo",
      ],
    },
    intro:
      "O transporte blindado da KMON VIP atende executivos, autoridades, diplomatas e personalidades que precisam combinar mobilidade premium com segurança elevada. Operamos veículos blindados, conduzidos por motoristas treinados em direção defensiva, evasiva e protocolo executivo. Cada operação é planejada com avaliação prévia de rotas, horários e pontos de risco, com suporte 24 horas e possibilidade de escolta dedicada. Discrição absoluta, confidencialidade contratual e padrão internacional em cada deslocamento — em Brasília, São Paulo, Rio de Janeiro e demais capitais sob demanda.",
    features: [
      { title: "Blindagem certificada", desc: "Veículos com proteção contra armamento de alta velocidade." },
      { title: "Motoristas treinados em segurança", desc: "Direção defensiva, evasiva e protocolo executivo." },
      { title: "Planejamento de rota", desc: "Avaliação prévia de trajeto, horários e pontos de risco." },
      { title: "Escolta sob demanda", desc: "Veículo batedor e equipe de segurança opcional." },
      { title: "Discrição operacional", desc: "Confidencialidade contratual em todas as agendas." },
    ],
    faqs: [
      {
        q: "Qual o nível de blindagem dos veículos KMON VIP?",
        a: "Nossa frota blindada conta com proteção certificada contra armamento de alta velocidade — o padrão recomendado para executivos, autoridades e diplomatas.",
      },
      {
        q: "Os motoristas têm treinamento específico para transporte blindado?",
        a: "Sim. Os motoristas designados para operações blindadas passam por treinamento contínuo em direção defensiva, direção evasiva e protocolo de segurança executiva.",
      },
      {
        q: "É possível contratar escolta junto ao transporte blindado?",
        a: "Sim, oferecemos veículo batedor e equipe de segurança dedicada sob demanda, dimensionados conforme o perfil da operação.",
      },
      {
        q: "Em quais cidades está disponível o transporte blindado?",
        a: "Disponível em Brasília, São Paulo e Rio de Janeiro com frota local. Demais capitais sob consulta com mobilização da frota.",
      },
    ],
    image: "/images/services/transporte-blindado.webp",
  },
  {
    slug: "transporte-diplomatico",
    name: "Transporte Diplomático",
    shortName: "Diplomático",
    hook: "Transporte Diplomático — Atendimento para Embaixadas, Delegações e Missões Oficiais",
    meta: {
      title: "Transporte Diplomático para Embaixadas no Brasil",
      description: "Mobilidade executiva com protocolo internacional para embaixadas, delegações estrangeiras, autoridades e missões oficiais em Brasília e capitais brasileiras.",
      keywords: [
        "transporte diplomático",
        "transporte para embaixadas",
        "transporte diplomático Brasília",
        "carro para autoridades",
        "transporte para delegações",
        "transporte para missões oficiais",
        "motorista diplomático",
        "transporte com protocolo internacional",
        "transporte VIP para diplomatas",
        "transporte para visita oficial",
        "transporte de cortesia diplomática",
        "transporte para chanceler",
        "transporte para embaixador",
        "frota para corpo diplomático",
        "transporte executivo internacional",
      ],
    },
    intro:
      "Há mais de três décadas a KMON VIP atende embaixadas, consulados, delegações estrangeiras e missões oficiais em Brasília — sede do governo brasileiro e do corpo diplomático no país. Oferecemos transporte com protocolo internacional, motoristas bilíngues e fluentes, frota executiva e blindada, planejamento de rotas para visitas oficiais, recepção de comitivas e cobertura completa de agendas diplomáticas. Atendemos cúpulas internacionais, visitas de Estado, recepções em embaixadas e operações de receptivo aeroportuário com a discrição e a precisão exigidas pelo segmento.",
    features: [
      { title: "Protocolo internacional", desc: "Atendimento conforme padrões diplomáticos e cerimoniais." },
      { title: "Motoristas bilíngues", desc: "Fluência em inglês e espanhol, treinamento em recepção diplomática." },
      { title: "Frota executiva e blindada", desc: "Sedans, SUVs e opções blindadas conforme demanda." },
      { title: "Operação para grandes eventos", desc: "G20, COP, visitas de Estado, cúpulas multilaterais." },
      { title: "Base em Brasília", desc: "Sede operacional no centro do corpo diplomático brasileiro." },
    ],
    faqs: [
      {
        q: "A KMON VIP atende embaixadas em Brasília?",
        a: "Sim. Brasília é nossa sede e atendemos regularmente embaixadas, consulados e missões diplomáticas há mais de três décadas, com contratos contínuos e operações pontuais.",
      },
      {
        q: "Já atenderam visitas de Estado e cúpulas internacionais?",
        a: "Sim. Participamos da Copa do Mundo 2014, Olimpíadas Rio 2016, G20 Brasil 2024, COP 30 2025 e visitas oficiais como Obama, Hillary Clinton, Biden, entre outras.",
      },
      {
        q: "Os motoristas falam outros idiomas?",
        a: "Sim. Nossos motoristas designados para operações diplomáticas são bilíngues (inglês/espanhol) e treinados em protocolo internacional.",
      },
      {
        q: "É possível contratar frota com escolta para comitivas?",
        a: "Sim. Combinamos sedans, SUVs, vans e veículos blindados com batedores e equipe de segurança dimensionada conforme o protocolo da missão.",
      },
    ],
    image: "/images/services/transporte-diplomatico.webp",
  },
  {
    slug: "eventos-e-congressos",
    name: "Eventos & Congressos",
    shortName: "Eventos",
    hook: "Transporte para Eventos e Congressos — Logística Executiva de Frota",
    meta: {
      title: "Transporte para Eventos e Congressos Corporativos",
      description: "Frota dedicada com vans, sedans, SUVs e ônibus executivos para congressos, feiras, convenções e operações de grande porte em todo o Brasil.",
      keywords: [
        "transporte para eventos",
        "transporte para congressos",
        "frota para eventos corporativos",
        "logística de transporte eventos",
        "transporte para feiras",
        "transporte VIP eventos",
        "frota para convenções",
        "transporte para cerimônias",
        "transporte para festas",
        "transporte para palestrantes",
        "frota corporativa eventos",
        "transporte para delegações eventos",
        "transporte para staff de evento",
        "frota dedicada congresso",
        "transporte para convenção corporativa",
      ],
    },
    intro:
      "A KMON VIP estrutura operações completas de mobilidade para grandes eventos, congressos, convenções, feiras corporativas e cerimônias. Coordenamos frota mista — vans, sedans, SUVs e ônibus executivos — com planejamento logístico de rotas, horários, recepção de palestrantes, deslocamento de staff e transfer de convidados VIP. Há 35 anos atendendo grandes operações no Brasil, com expertise em eventos como Copa do Mundo, Olimpíadas, G20, COP, Fórmula 1 e congressos corporativos de alto padrão.",
    features: [
      { title: "Frota mista coordenada", desc: "Vans, sedans, SUVs e ônibus operando em sinergia." },
      { title: "Planejamento logístico", desc: "Rotas, horários, recepção, transfer e suporte dedicado." },
      { title: "Equipe de campo", desc: "Coordenador presencial e suporte 24h durante o evento." },
      { title: "Atendimento a VIPs", desc: "Frota executiva separada para palestrantes e convidados especiais." },
      { title: "Experiência em grandes eventos", desc: "Copa 2014, Olimpíadas 2016, G20 2024, COP 30 2025." },
    ],
    faqs: [
      {
        q: "A KMON VIP atende eventos de grande porte?",
        a: "Sim. Já operamos em Copa do Mundo, Olimpíadas, G20, COP, GP Brasil de F1 e diversos congressos internacionais e corporativos.",
      },
      {
        q: "Como é dimensionada a frota para eventos?",
        a: "Após briefing, dimensionamos a frota (vans, sedans, SUVs, ônibus) e a equipe (motoristas, coordenadores, suporte) conforme o número de participantes, agenda e logística do evento.",
      },
      {
        q: "Atendem cerimônias e festas particulares?",
        a: "Sim. Oferecemos transporte executivo para cerimônias, festas, casamentos e eventos sociais com motorista, frota premium e protocolo discreto.",
      },
      {
        q: "É possível contratar com coordenador presencial?",
        a: "Sim. Em operações de grande porte, designamos coordenador presencial que gerencia a frota em tempo real durante o evento.",
      },
    ],
    image: "/images/services/eventos-congressos.webp",
  },
  {
    slug: "transfers-executivos",
    name: "Transfers Executivos",
    shortName: "Transfers",
    hook: "Transfer Aeroporto, Hotel e Eventos — Atendimento Executivo Profissional",
    meta: {
      title: "Transfer Aeroporto Executivo com Motorista",
      description: "Traslados executivos com motorista entre aeroporto, hotel, reuniões e compromissos. Pontualidade, recepção em portões e atendimento bilíngue.",
      keywords: [
        "transfer aeroporto",
        "transfer executivo",
        "transfer aeroporto com motorista",
        "transfer Brasília aeroporto",
        "transfer São Paulo Guarulhos",
        "transfer Rio Galeão",
        "transfer Congonhas executivo",
        "receptivo executivo aeroporto",
        "transfer hotel reunião",
        "transfer VIP aeroporto",
        "transfer executivo corporativo",
        "motorista para transfer",
        "transfer aeroporto Brasília JK",
        "transfer in out executivo",
        "transfer para diplomatas",
      ],
    },
    intro:
      "A KMON VIP oferece transfers executivos entre aeroportos, hotéis, reuniões, eventos e compromissos corporativos. Receptivo em portão de desembarque, motorista uniformizado, frota premium e atendimento bilíngue para passageiros internacionais. Monitoramento de voos em tempo real, garantia de pontualidade e protocolo discreto. Disponível 24 horas em Brasília (Aeroporto JK), São Paulo (Guarulhos e Congonhas), Rio de Janeiro (Galeão e Santos Dumont) e demais capitais atendidas.",
    features: [
      { title: "Receptivo em portão", desc: "Motorista aguarda no desembarque com placa identificadora." },
      { title: "Monitoramento de voo", desc: "Acompanhamento em tempo real, ajuste automático de horário." },
      { title: "Atendimento bilíngue", desc: "Motoristas fluentes em inglês e espanhol." },
      { title: "Frota premium", desc: "Sedans, SUVs e vans executivas para grupos." },
      { title: "Cobertura 24 horas", desc: "Operação contínua em todos os aeroportos atendidos." },
    ],
    faqs: [
      {
        q: "Como funciona o transfer com receptivo aeroportuário?",
        a: "Motorista aguarda no portão de desembarque com placa identificadora, recolhe a bagagem e conduz o passageiro ao veículo já estacionado em local conveniente.",
      },
      {
        q: "O serviço inclui monitoramento de voo?",
        a: "Sim. Acompanhamos o status do voo em tempo real e ajustamos automaticamente o horário do receptivo em caso de atraso ou antecipação.",
      },
      {
        q: "Atendem em quais aeroportos?",
        a: "Brasília (JK), São Paulo (Guarulhos e Congonhas), Rio de Janeiro (Galeão e Santos Dumont), Belo Horizonte (Confins), Manaus e Belém.",
      },
      {
        q: "É possível contratar transfer para grupos?",
        a: "Sim. Oferecemos vans executivas e ônibus para transfers de grupos, com coordenação logística para múltiplos passageiros.",
      },
    ],
    image: "/images/services/transfers.webp",
  },
  {
    slug: "vans-e-onibus",
    name: "Vans e Ônibus",
    shortName: "Vans e Ônibus",
    hook: "Vans Executivas e Ônibus Premium — Mobilidade para Grupos",
    meta: {
      title: "Locação de Vans Executivas e Ônibus Premium com Motorista",
      description: "Vans executivas Mercedes-Benz Sprinter e ônibus premium com motorista para grupos, delegações, eventos e operações de transporte coletivo executivo.",
      keywords: [
        "locação de van executiva",
        "van executiva com motorista",
        "Mercedes Sprinter executiva",
        "ônibus executivo com motorista",
        "ônibus premium para evento",
        "transporte para grupos executivo",
        "transporte de delegação",
        "transporte para staff",
        "van para transfer de grupo",
        "ônibus para congresso",
        "ônibus para excursão corporativa",
        "transporte coletivo executivo",
        "frota para staff de evento",
        "van executiva Brasília",
        "ônibus executivo São Paulo",
      ],
    },
    intro:
      "Para grupos, delegações, staff de eventos e equipes corporativas, a KMON VIP oferece vans executivas Mercedes-Benz Sprinter e ônibus premium com motorista. Configurações de 8 a 50 passageiros, frota com poltronas reclináveis, ar-condicionado, áudio, Wi-Fi e acabamento executivo. Atende congressos, convenções, excursões corporativas, transfers de delegações esportivas, comitivas governamentais e operações de grande porte. Operação coordenada em Brasília e demais capitais brasileiras.",
    features: [
      { title: "Vans Mercedes-Benz Sprinter", desc: "8 a 15 passageiros, acabamento executivo, Wi-Fi e ar." },
      { title: "Ônibus premium", desc: "30 a 50 passageiros, poltronas reclináveis, áudio e ar-condicionado." },
      { title: "Motoristas profissionais", desc: "Habilitação categoria D, treinados em conforto e segurança." },
      { title: "Frota coordenada", desc: "Operação simultânea de múltiplas vans e ônibus." },
      { title: "Atendimento nacional", desc: "Brasília, SP, RJ, BH, Manaus, Belém e capitais sob demanda." },
    ],
    faqs: [
      {
        q: "Qual a capacidade das vans executivas?",
        a: "As vans Mercedes-Benz Sprinter atendem de 8 a 15 passageiros, com acabamento executivo, Wi-Fi, ar-condicionado e poltronas confortáveis.",
      },
      {
        q: "Quantos passageiros comportam os ônibus premium?",
        a: "Os ônibus executivos atendem de 30 a 50 passageiros, com poltronas reclináveis, ar-condicionado, áudio e padrão de conforto premium.",
      },
      {
        q: "Atendem grupos de delegações esportivas e corporativas?",
        a: "Sim. Temos histórico de atendimento a delegações esportivas internacionais e operações corporativas como congressos, convenções e cúpulas.",
      },
      {
        q: "É possível combinar vans, ônibus e sedans em uma única operação?",
        a: "Sim. Para eventos com VIPs e grupos, combinamos sedans/SUVs executivos com vans/ônibus para staff e convidados, sob coordenação única.",
      },
    ],
    image: "/images/services/vans-onibus.webp",
  },
];

// ─── Cities ──────────────────────────────────────────────────────────
export type City = {
  slug: string;
  name: string;
  shortName: string;
  region: string; // UF
  geo: { lat: number; lng: number };
  hook: string;
  meta: { title: string; description: string; keywords: string[] };
  intro: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
  image: string;
  isHQ?: boolean;
};

export const cities: City[] = [
  {
    slug: "brasilia",
    name: "Brasília",
    shortName: "Brasília",
    region: "DF",
    geo: { lat: -15.79, lng: -47.88 },
    isHQ: true,
    hook: "Transporte Executivo em Brasília — 35 Anos Atendendo Setor Público e Diplomático",
    meta: {
      title: "Transporte Executivo em Brasília — KMON VIP",
      description: "Transporte executivo, blindado e diplomático em Brasília. 35 anos atendendo embaixadas, autoridades, órgãos públicos e eventos corporativos no DF.",
      keywords: [
        "transporte executivo Brasília",
        "motorista executivo DF",
        "transporte blindado Brasília",
        "transporte diplomático Brasília",
        "carro executivo Brasília",
        "transfer aeroporto Brasília JK",
        "transporte para embaixada Brasília",
        "transporte corporativo Brasília",
        "transporte VIP DF",
        "frota executiva Brasília",
        "transporte para autoridades DF",
        "motorista bilíngue Brasília",
        "transporte para Esplanada dos Ministérios",
        "transporte para Palácio do Planalto",
        "transporte executivo Lago Sul",
      ],
    },
    intro:
      "Brasília é a sede operacional da KMON VIP. Há 35 anos atendemos o corpo diplomático, autoridades federais, órgãos públicos, embaixadas e o setor corporativo na capital federal. Nossa frota — executiva, blindada e dedicada a comitivas — opera 24 horas com motoristas bilíngues treinados em protocolo executivo e diplomático. Cobrimos todas as regiões: Esplanada dos Ministérios, Setor Hoteleiro, Lago Sul, Lago Norte, Asa Norte, Asa Sul, Aeroporto Internacional JK e Park Way.",
    highlights: [
      "Sede operacional KMON VIP",
      "Atendimento ao corpo diplomático e embaixadas",
      "Cobertura 24h em todo o Distrito Federal",
      "Transfer Aeroporto Internacional JK",
      "Frota blindada com base local",
    ],
    faqs: [
      {
        q: "A KMON VIP é sediada em Brasília?",
        a: "Sim. Brasília é nossa base operacional desde 1990. Atendemos diariamente embaixadas, autoridades, órgãos federais e empresas no Distrito Federal.",
      },
      {
        q: "Atendem o Aeroporto Internacional de Brasília?",
        a: "Sim. Transfers executivos no Aeroporto JK com receptivo em portão, monitoramento de voo e cobertura 24 horas.",
      },
      {
        q: "Há frota blindada local em Brasília?",
        a: "Sim. Operamos frota blindada com base permanente em Brasília, disponível para autoridades, executivos e diplomatas no DF.",
      },
    ],
    image: "/images/cities/Brasilia.webp",
  },
  {
    slug: "sao-paulo",
    name: "São Paulo",
    shortName: "São Paulo",
    region: "SP",
    geo: { lat: -23.55, lng: -46.63 },
    hook: "Transporte Executivo em São Paulo — Atendimento Corporativo e Financeiro",
    meta: {
      title: "Transporte Executivo em São Paulo — KMON VIP",
      description: "Transporte executivo e blindado com motorista em São Paulo. Atendimento ao mercado financeiro, multinacionais, eventos corporativos e transfers aeroportuários.",
      keywords: [
        "transporte executivo São Paulo",
        "transporte blindado São Paulo",
        "motorista executivo SP",
        "carro executivo São Paulo",
        "transfer Guarulhos executivo",
        "transfer Congonhas executivo",
        "transporte corporativo SP",
        "transporte para Faria Lima",
        "transporte para Avenida Paulista",
        "transporte VIP São Paulo",
        "frota executiva SP",
        "transporte para multinacionais SP",
        "transporte para Itaim Bibi",
        "transporte para Vila Olímpia",
        "motorista bilíngue São Paulo",
      ],
    },
    intro:
      "Em São Paulo, a KMON VIP atende executivos, multinacionais, eventos corporativos e o mercado financeiro com transporte executivo e blindado. Cobertura nas principais regiões corporativas — Faria Lima, Itaim Bibi, Vila Olímpia, Berrini, Paulista, Jardins — e nos aeroportos de Guarulhos (GRU) e Congonhas (CGH). Frota premium, motoristas treinados e atendimento bilíngue para reuniões, agendas estratégicas, eventos e operações continuadas.",
    highlights: [
      "Cobertura Faria Lima, Paulista, Itaim, Vila Olímpia",
      "Transfer GRU (Guarulhos) e CGH (Congonhas)",
      "Atendimento ao mercado financeiro",
      "Frota blindada disponível",
      "Operação para eventos corporativos",
    ],
    faqs: [
      {
        q: "Atendem nos aeroportos de Guarulhos e Congonhas?",
        a: "Sim. Transfers executivos com receptivo nos dois aeroportos paulistas, com monitoramento de voo e atendimento bilíngue.",
      },
      {
        q: "Há frota blindada em São Paulo?",
        a: "Sim. Frota blindada disponível em São Paulo para agendas que exigem segurança elevada.",
      },
      {
        q: "Atendem nas principais regiões corporativas?",
        a: "Sim. Cobertura completa em Faria Lima, Itaim Bibi, Vila Olímpia, Berrini, Paulista, Jardins e demais regiões de SP.",
      },
    ],
    image: "/images/cities/sao-paulo.webp",
  },
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    shortName: "Rio",
    region: "RJ",
    geo: { lat: -22.91, lng: -43.17 },
    hook: "Transporte Executivo no Rio de Janeiro — Eventos, Autoridades e Turismo Premium",
    meta: {
      title: "Transporte Executivo no Rio de Janeiro — KMON VIP",
      description: "Transporte executivo, blindado e VIP no Rio de Janeiro. Atendimento a autoridades, artistas, turismo premium, eventos e operações corporativas no RJ.",
      keywords: [
        "transporte executivo Rio de Janeiro",
        "transporte blindado Rio",
        "motorista executivo RJ",
        "carro executivo Rio",
        "transfer Galeão executivo",
        "transfer Santos Dumont executivo",
        "transporte VIP Rio de Janeiro",
        "transporte para artistas Rio",
        "turismo executivo Rio",
        "transporte para eventos Rio",
        "frota executiva Rio",
        "transporte para Copacabana",
        "transporte para Ipanema",
        "transporte para Barra da Tijuca",
        "motorista bilíngue Rio",
      ],
    },
    intro:
      "No Rio de Janeiro, a KMON VIP opera turismo executivo de alto padrão, atendimento a autoridades, artistas internacionais e operações corporativas. Cobertura nos aeroportos do Galeão (GIG) e Santos Dumont (SDU), nas zonas Sul, Centro e Barra da Tijuca, e nos principais hotéis e centros de convenção da cidade. Histórico de atendimento em grandes eventos como Olimpíadas 2016, Copa do Mundo 2014, Fórmula 1 e turnês internacionais.",
    highlights: [
      "Transfer Galeão (GIG) e Santos Dumont (SDU)",
      "Cobertura Copacabana, Ipanema, Leblon, Barra",
      "Atendimento a artistas e celebridades internacionais",
      "Operação em grandes eventos (Olimpíadas, F1, Copa)",
      "Turismo executivo premium",
    ],
    faqs: [
      {
        q: "Atendem nos aeroportos do Rio?",
        a: "Sim. Transfers executivos no Galeão (GIG) e Santos Dumont (SDU), com receptivo em portão e cobertura 24h.",
      },
      {
        q: "Já atenderam celebridades e artistas internacionais no Rio?",
        a: "Sim. Atendimento a turnês como The Killers, Red Hot Chili Peppers e personalidades como Mike Tyson, entre outras.",
      },
      {
        q: "Atendem em quais regiões do Rio?",
        a: "Cobertura completa Zona Sul (Copacabana, Ipanema, Leblon, Lagoa), Centro, Barra da Tijuca e principais pontos turísticos e corporativos.",
      },
    ],
    image: "/images/cities/rio-de-janeiro.webp",
  },
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    shortName: "BH",
    region: "MG",
    geo: { lat: -19.92, lng: -43.94 },
    hook: "Transporte Executivo em Belo Horizonte — Atendimento Corporativo em Minas Gerais",
    meta: {
      title: "Transporte Executivo em Belo Horizonte — KMON VIP",
      description: "Transporte executivo com motorista em Belo Horizonte. Atendimento a empresas, eventos corporativos e agendas estratégicas em BH e região metropolitana.",
      keywords: [
        "transporte executivo Belo Horizonte",
        "transporte executivo BH",
        "motorista executivo Minas Gerais",
        "carro executivo BH",
        "transfer Confins executivo",
        "transporte corporativo Belo Horizonte",
        "transporte VIP BH",
        "frota executiva Belo Horizonte",
        "transporte para eventos BH",
        "transporte para Savassi",
        "transporte para Funcionários BH",
        "motorista bilíngue BH",
        "transporte para empresas mineração",
        "transporte para FIEMG",
        "transporte executivo Minas",
      ],
    },
    intro:
      "Em Belo Horizonte, a KMON VIP atende empresas, eventos corporativos e agendas estratégicas com transporte executivo e motoristas profissionais. Cobertura na capital mineira e região metropolitana, com transfer no Aeroporto Internacional de Confins (CNF). Atendimento a setores como mineração, indústria e finanças, com frota executiva e operação flexível para reuniões, recepções e operações continuadas.",
    highlights: [
      "Transfer Aeroporto Internacional de Confins (CNF)",
      "Cobertura BH e região metropolitana",
      "Atendimento a setor de mineração e indústria",
      "Operação para eventos corporativos",
      "Motoristas profissionais e treinados",
    ],
    faqs: [
      {
        q: "Atendem no Aeroporto de Confins?",
        a: "Sim. Transfers executivos no Aeroporto Internacional Tancredo Neves (Confins/CNF) e Aeroporto da Pampulha.",
      },
      {
        q: "Há atendimento na região metropolitana de BH?",
        a: "Sim. Cobertura na capital e principais cidades da Grande BH como Contagem, Nova Lima, Betim.",
      },
      {
        q: "Atendem o setor de mineração?",
        a: "Sim. Atendemos executivos e comitivas do setor de mineração e indústria, com agendas técnicas e visitas de campo.",
      },
    ],
    image: "/images/cities/belo-horizonte.webp",
  },
  {
    slug: "manaus",
    name: "Manaus",
    shortName: "Manaus",
    region: "AM",
    geo: { lat: -3.12, lng: -60.02 },
    hook: "Transporte Executivo em Manaus — Operação Executiva na Região Norte",
    meta: {
      title: "Transporte Executivo em Manaus — KMON VIP",
      description: "Transporte executivo com motorista em Manaus. Atendimento a executivos, autoridades e operações corporativas no Polo Industrial e Amazônia.",
      keywords: [
        "transporte executivo Manaus",
        "motorista executivo Manaus",
        "carro executivo Manaus",
        "transfer Eduardo Gomes executivo",
        "transporte VIP Manaus",
        "transporte corporativo Manaus",
        "frota executiva Manaus",
        "transporte para Polo Industrial Manaus",
        "transporte para Zona Franca",
        "transporte executivo Amazonas",
        "transporte para autoridades Manaus",
        "transporte para eventos Manaus",
        "motorista bilíngue Manaus",
        "transporte executivo Amazônia",
        "transporte para Ponta Negra",
      ],
    },
    intro:
      "Em Manaus, a KMON VIP atende operações executivas, corporativas e institucionais com transporte executivo profissional. Cobertura no Aeroporto Internacional Eduardo Gomes, no Polo Industrial de Manaus, na Zona Franca e nas principais regiões corporativas e hoteleiras. Atendimento estratégico para o setor industrial, autoridades em missão na região Norte e visitantes internacionais.",
    highlights: [
      "Transfer Aeroporto Internacional Eduardo Gomes",
      "Atendimento Polo Industrial de Manaus",
      "Cobertura Zona Franca e regiões corporativas",
      "Atendimento ao setor industrial",
      "Operação para missões na Amazônia",
    ],
    faqs: [
      {
        q: "Atendem no Polo Industrial de Manaus?",
        a: "Sim. Atendemos executivos e operações corporativas do Polo Industrial e da Zona Franca de Manaus.",
      },
      {
        q: "Há transfer no Aeroporto Internacional Eduardo Gomes?",
        a: "Sim. Transfers executivos com receptivo em portão no Aeroporto Internacional de Manaus.",
      },
      {
        q: "Atendem operações na Amazônia?",
        a: "Sim. Apoiamos missões corporativas e institucionais na região Amazônica com logística integrada a partir de Manaus.",
      },
    ],
    image: "/images/cities/Manaus.webp",
  },
  {
    slug: "belem",
    name: "Belém",
    shortName: "Belém",
    region: "PA",
    geo: { lat: -1.46, lng: -48.5 },
    hook: "Transporte Executivo em Belém — Cidade Estratégica para Grandes Operações",
    meta: {
      title: "Transporte Executivo em Belém — KMON VIP",
      description: "Transporte executivo, diplomático e para eventos em Belém. Atendimento à COP 30 e grandes operações internacionais na Amazônia.",
      keywords: [
        "transporte executivo Belém",
        "motorista executivo Belém",
        "transporte COP 30 Belém",
        "transfer aeroporto Belém",
        "transporte VIP Belém",
        "transporte para delegações Belém",
        "transporte para eventos Belém",
        "frota executiva Belém",
        "transporte corporativo Belém",
        "transporte para autoridades Belém",
        "transporte executivo Pará",
        "transporte para Hangar Belém",
        "transporte diplomático Belém",
        "transporte para Amazônia Pará",
        "transporte para Val de Cans",
      ],
    },
    intro:
      "Belém é cidade estratégica para grandes eventos internacionais e operações corporativas. A KMON VIP atende a capital paraense com transporte executivo, diplomático e para eventos — incluindo a COP 30 e demais cúpulas internacionais sediadas na Amazônia. Cobertura no Aeroporto Internacional Val de Cans, no Hangar Centro de Convenções, hotéis principais e em todo o entorno de Belém.",
    highlights: [
      "Atendimento à COP 30 e cúpulas internacionais",
      "Transfer Aeroporto Internacional Val de Cans",
      "Cobertura Hangar Centro de Convenções",
      "Operação para delegações internacionais",
      "Frota executiva e blindada sob demanda",
    ],
    faqs: [
      {
        q: "Atenderam a COP 30 em Belém?",
        a: "Sim. Atuamos na COP 30 com frota executiva para delegações internacionais e autoridades em missão na Amazônia.",
      },
      {
        q: "Há transfer no Aeroporto Val de Cans?",
        a: "Sim. Transfers executivos com receptivo no Aeroporto Internacional Val de Cans, em Belém.",
      },
      {
        q: "Atendem eventos no Hangar Centro de Convenções?",
        a: "Sim. Operação dedicada a eventos no Hangar e em demais centros de convenção e hotéis de Belém.",
      },
    ],
    image: "/images/cities/belem.webp",
  },
];

// ─── Fleet ───────────────────────────────────────────────────────────
export type FleetCategory = {
  slug: string;
  name: string;
  hook: string;
  meta: { title: string; description: string; keywords: string[] };
  intro: string;
  specs: { passengers: string; model: string };
  features: string[];
  image: string;
};

export const fleet: FleetCategory[] = [
  {
    slug: "sedan-executivo",
    name: "Sedan Executivo",
    hook: "Sedan Executivo com Motorista — Toyota Corolla ou Similar",
    meta: {
      title: "Sedan Executivo com Motorista — Locação",
      description: "Sedan executivo Toyota Corolla ou similar com motorista, para 1 a 4 passageiros. Mobilidade premium para executivos e agendas individuais.",
      keywords: [
        "sedan executivo com motorista",
        "Toyota Corolla executivo",
        "locação sedan executivo",
        "carro executivo Brasília",
        "sedan executivo São Paulo",
        "sedan VIP com motorista",
        "transporte executivo sedan",
        "sedan corporativo",
        "sedan com motorista Rio de Janeiro",
        "sedan executivo Brasília",
      ],
    },
    intro: "Sedans executivos com motorista para deslocamentos corporativos, reuniões, recepções de clientes e agendas individuais. Frota Toyota Corolla ou similar, com acabamento premium, ar-condicionado, motorista uniformizado e atendimento bilíngue.",
    specs: { passengers: "1 a 4 passageiros", model: "Toyota Corolla ou similar" },
    features: ["Acabamento premium", "Ar-condicionado", "Wi-Fi disponível", "Motorista uniformizado", "Atendimento bilíngue"],
    image: "/images/fleet/corola-sedan-executivo.webp",
  },
  {
    slug: "sedan-blindado",
    name: "Sedan Blindado",
    hook: "Sedan Blindado com Motorista — Mercedes-Benz Classe E Blindado",
    meta: {
      title: "Sedan Blindado com Motorista — Locação",
      description: "Sedan blindado Mercedes-Benz Classe E ou similar com motorista treinado. Segurança elevada com discrição e conforto executivo para 1 a 4 passageiros.",
      keywords: [
        "sedan blindado com motorista",
        "Mercedes Classe E blindado",
        "sedan blindado Brasília",
        "sedan blindado São Paulo",
        "locação sedan blindado",
        "carro blindado discreto",
        "sedan blindado executivo",
        "blindado com motorista treinado",
        "sedan blindado Rio de Janeiro",
        "sedan blindado com motorista",
      ],
    },
    intro: "Sedans blindados com motorista treinado em direção defensiva e evasiva. Mercedes-Benz Classe E Blindado ou similar — segurança elevada com discrição absoluta e conforto de alto padrão, para executivos e autoridades que exigem proteção sem abrir mão da elegância.",
    specs: { passengers: "1 a 4 passageiros", model: "Mercedes-Benz Classe E Blindado ou similar" },
    features: ["Blindagem certificada", "Motorista treinado em segurança", "Discrição absoluta", "Ar-condicionado dual zone", "Planejamento de rota"],
    image: "/images/fleet/classe-e.webp",
  },
  {
    slug: "suv-blindado",
    name: "SUV Blindado",
    hook: "SUV Blindado com Motorista — Jeep Commander Blindado",
    meta: {
      title: "SUV Blindado com Motorista — Locação",
      description: "SUV blindado Jeep Commander ou similar com motorista treinado em direção defensiva. Para 1 a 4 passageiros. Proteção máxima para executivos, autoridades e diplomatas.",
      keywords: [
        "SUV blindado com motorista",
        "Jeep Commander blindado",
        "SUV blindado Brasília",
        "SUV blindado São Paulo",
        "locação SUV blindado",
        "blindado para diplomatas",
        "SUV blindado certificado",
        "transporte blindado VIP",
        "SUV blindado Rio de Janeiro",
        "SUV blindado com motorista treinado",
      ],
    },
    intro: "SUVs blindados com motorista treinado em direção defensiva e evasiva. Jeep Commander Blindado ou similar — maior volume e proteção para comitivas e autoridades que exigem segurança elevada em deslocamentos de alto risco.",
    specs: { passengers: "1 a 4 passageiros", model: "Jeep Commander Blindado ou similar" },
    features: ["Blindagem certificada", "Motorista treinado em segurança", "Comunicação segura", "Janelas seladas", "Planejamento de rota"],
    image: "/images/fleet/suv-commander.webp",
  },
  {
    slug: "minivan-executiva",
    name: "Mini Van Executiva",
    hook: "Mini Van Executiva com Motorista — Mercedes-Benz Vito ou Similar",
    meta: {
      title: "Mini Van Executiva com Motorista — Locação",
      description: "Mini van executiva Mercedes-Benz Vito ou similar para 1 a 7 passageiros. Conforto e privacidade para grupos pequenos, transfers VIP e deslocamentos corporativos.",
      keywords: [
        "minivan executiva com motorista",
        "Mercedes Vito executiva",
        "minivan VIP Brasília",
        "locação minivan executiva",
        "van pequena com motorista",
        "transfer VIP grupo pequeno",
        "minivan corporativa",
        "minivan com motorista São Paulo",
        "Vito executiva locação",
        "transporte grupo pequeno executivo",
      ],
    },
    intro: "Mini vans executivas com motorista profissional para grupos pequenos, transfers VIP, jantares corporativos e deslocamentos discretos com conforto e privacidade. Frota Mercedes-Benz Vito ou similar, com acabamento executivo e atendimento bilíngue.",
    specs: { passengers: "1 a 7 passageiros", model: "Mercedes-Benz Vito ou similar" },
    features: ["Acabamento executivo", "Privacidade para grupos", "Ar-condicionado", "Motorista uniformizado", "Atendimento bilíngue"],
    image: "/images/fleet/mini-van-vito.webp",
  },
  {
    slug: "van-executiva",
    name: "Van Executiva",
    hook: "Van Executiva Mercedes-Benz Sprinter — 8 a 15 Passageiros",
    meta: {
      title: "Van Executiva com Motorista — Mercedes Sprinter",
      description: "Van executiva Mercedes-Benz Sprinter para 8 a 15 passageiros. Conforto premium, Wi-Fi, ar-condicionado e motorista profissional para grupos e delegações.",
      keywords: [
        "van executiva com motorista",
        "Mercedes Sprinter executiva",
        "locação van executiva",
        "van para grupos",
        "van VIP com motorista",
        "transporte para delegação van",
        "van corporativa",
        "van para staff de evento",
        "Sprinter 15 passageiros",
        "locação Sprinter executiva",
      ],
    },
    intro: "Vans executivas Mercedes-Benz Sprinter com motorista profissional para grupos, delegações, eventos corporativos e operações de transfer coletivo. Configuração de 8 a 15 passageiros, com acabamento executivo, ar-condicionado, Wi-Fi e poltronas confortáveis.",
    specs: { passengers: "8 a 15 passageiros", model: "Mercedes-Benz Sprinter ou similar" },
    features: ["Acabamento executivo", "Wi-Fi a bordo", "Ar-condicionado", "Poltronas reclináveis", "Compartimento para bagagem"],
    image: "/images/fleet/sprinter.webp",
  },
  {
    slug: "onibus-premium",
    name: "Ônibus Premium",
    hook: "Ônibus Executivo Premium — 30 a 50 Passageiros",
    meta: {
      title: "Ônibus Executivo Premium com Motorista — Locação",
      description: "Ônibus executivo premium para 30 a 50 passageiros. Poltronas reclináveis, ar-condicionado e motorista profissional para congressos e delegações.",
      keywords: [
        "ônibus executivo com motorista",
        "ônibus premium para evento",
        "locação ônibus executivo",
        "Marcopolo Paradiso locação",
        "ônibus para congresso",
        "ônibus para delegação",
        "ônibus VIP",
        "ônibus corporativo",
        "ônibus 50 passageiros",
        "ônibus para staff",
      ],
    },
    intro: "Ônibus executivos premium para congressos, delegações, comitivas e operações de grande volume. Frota Marcopolo Paradiso ou similar, com poltronas reclináveis, ar-condicionado, áudio e padrão de conforto premium para 30 a 50 passageiros.",
    specs: { passengers: "30 a 50 passageiros", model: "Marcopolo Paradiso ou similar" },
    features: ["Poltronas reclináveis", "Ar-condicionado central", "Sistema de áudio e microfone", "Compartimento amplo de bagagem", "Banheiro a bordo"],
    image: "/images/fleet/onibus-executivo.webp",
  },
];

// ─── Cross-segment pages (8 selected) ────────────────────────────────
export type CrossPage = {
  serviceSlug: string;
  citySlug: string;
  hook: string; // H1
  meta: { title: string; description: string; keywords: string[] };
  intro: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
};

export const crossPages: CrossPage[] = [
  // Transporte Executivo + 3 cidades
  {
    serviceSlug: "transporte-executivo",
    citySlug: "brasilia",
    hook: "Transporte Executivo em Brasília — Sedans e SUVs com Motorista",
    meta: {
      title: "Transporte Executivo em Brasília com Motorista",
      description: "Sedans e SUVs executivos com motorista em Brasília. Atendimento a embaixadas, órgãos públicos, eventos e agendas corporativas no DF.",
      keywords: ["transporte executivo Brasília", "motorista executivo DF", "sedan executivo Brasília", "carro executivo Brasília", "transfer JK executivo", "transporte corporativo DF", "transporte para Esplanada dos Ministérios", "transporte para embaixadas Brasília", "motorista bilíngue Brasília", "frota executiva DF", "transporte VIP Brasília", "transporte para Lago Sul"],
    },
    intro: "Em Brasília, a KMON VIP oferece transporte executivo com motorista há 35 anos. Atendemos diariamente embaixadas, ministérios, executivos corporativos e visitantes oficiais. Frota Mercedes-Benz Classe E e SUVs premium, operando 24 horas com cobertura completa no DF — Esplanada, Setor Hoteleiro, Lago Sul, Lago Norte, Park Way e Aeroporto JK.",
    bullets: ["Frota Mercedes-Benz Classe E e SUVs premium", "Cobertura 24h em todo o DF", "Atendimento a embaixadas e ministérios", "Motoristas bilíngues treinados em protocolo"],
    faqs: [
      { q: "Qual a frota disponível em Brasília?", a: "Sedans executivos, sedans e SUVs blindados, mini vans, vans executivas e ônibus premium. Frota completa operando 24 horas na cidade." },
      { q: "Quantas horas por dia operam em Brasília?", a: "Operação 24 horas, com cobertura contínua em todo o DF e Aeroporto Internacional JK." },
      { q: "Atendem o corpo diplomático em Brasília?", a: "Sim. Brasília é nossa sede e atendemos diariamente embaixadas, consulados e missões diplomáticas." },
    ],
  },
  {
    serviceSlug: "transporte-executivo",
    citySlug: "sao-paulo",
    hook: "Transporte Executivo em São Paulo — Mercado Financeiro e Corporativo",
    meta: {
      title: "Transporte Executivo em São Paulo com Motorista",
      description: "Sedans e SUVs executivos com motorista em São Paulo. Atendimento ao mercado financeiro, Faria Lima, Paulista, Itaim e aeroportos de Guarulhos e Congonhas.",
      keywords: ["transporte executivo São Paulo", "motorista executivo SP", "sedan executivo SP", "carro executivo São Paulo", "transfer Guarulhos", "transfer Congonhas", "transporte Faria Lima", "transporte Paulista", "transporte Itaim Bibi", "frota executiva São Paulo", "transporte para multinacional SP", "transporte VIP São Paulo"],
    },
    intro: "Em São Paulo, a KMON VIP atende o mercado financeiro, multinacionais e eventos corporativos com sedans e SUVs executivos. Cobertura nos principais polos — Faria Lima, Itaim Bibi, Vila Olímpia, Paulista, Berrini — e nos aeroportos de Guarulhos e Congonhas. Motoristas bilíngues, frota premium e operação 24 horas.",
    bullets: ["Cobertura Faria Lima, Paulista, Itaim, Berrini", "Transfer Guarulhos (GRU) e Congonhas (CGH)", "Atendimento ao mercado financeiro", "Motoristas bilíngues fluentes em inglês"],
    faqs: [
      { q: "Atendem nos aeroportos de SP?", a: "Sim. Transfers executivos em Guarulhos (GRU) e Congonhas (CGH), com receptivo em portão e monitoramento de voo." },
      { q: "A frota cobre o ABC e Alphaville?", a: "Sim. Atendemos toda a Grande São Paulo, incluindo ABC, Alphaville, Tamboré e demais regiões corporativas." },
      { q: "Há motoristas com inglês fluente?", a: "Sim. Todos os motoristas designados a passageiros internacionais são bilíngues, fluentes em inglês e espanhol." },
    ],
  },
  {
    serviceSlug: "transporte-executivo",
    citySlug: "rio-de-janeiro",
    hook: "Transporte Executivo no Rio de Janeiro — Sedans Premium com Motorista",
    meta: {
      title: "Transporte Executivo no Rio de Janeiro com Motorista",
      description: "Sedans e SUVs executivos com motorista no Rio de Janeiro. Atendimento corporativo, transfers nos aeroportos Galeão e Santos Dumont, eventos e turismo executivo.",
      keywords: ["transporte executivo Rio de Janeiro", "motorista executivo RJ", "sedan executivo Rio", "transfer Galeão", "transfer Santos Dumont", "carro executivo Rio", "transporte corporativo Rio", "transporte para Copacabana", "transporte para Ipanema", "transporte para Barra", "frota executiva Rio", "transporte VIP Rio"],
    },
    intro: "No Rio de Janeiro, a KMON VIP oferece sedans executivos e SUVs premium com motorista para executivos, autoridades, artistas e turismo de alto padrão. Cobertura completa Zona Sul, Centro, Barra da Tijuca e aeroportos Galeão (GIG) e Santos Dumont (SDU). Atendimento bilíngue para turismo internacional e operações corporativas.",
    bullets: ["Transfer GIG (Galeão) e SDU (Santos Dumont)", "Cobertura Copacabana, Ipanema, Leblon, Barra", "Atendimento a turismo executivo internacional", "Operação 24 horas"],
    faqs: [
      { q: "Atendem turismo executivo no Rio?", a: "Sim. Atendemos turismo executivo de alto padrão, com motoristas bilíngues e roteiros personalizados pelos principais pontos da cidade." },
      { q: "Há transfer nos dois aeroportos?", a: "Sim. Cobrimos tanto o Aeroporto Internacional do Galeão (GIG) quanto o Santos Dumont (SDU)." },
      { q: "Atendem na Barra da Tijuca?", a: "Sim. Cobertura completa na Barra da Tijuca, Recreio e Jacarepaguá, além de Zona Sul e Centro." },
    ],
  },
  // Transporte Blindado + 3 cidades
  {
    serviceSlug: "transporte-blindado",
    citySlug: "brasilia",
    hook: "Transporte Blindado em Brasília — Frota Blindada e Escolta",
    meta: {
      title: "Transporte Blindado em Brasília com Motorista",
      description: "Veículos blindados com motorista treinado em Brasília. Atendimento a autoridades, executivos e diplomatas no Distrito Federal.",
      keywords: ["transporte blindado Brasília", "carro blindado Brasília", "blindado DF", "SUV blindado Brasília", "blindado com motorista DF", "transporte VIP blindado Brasília", "blindado para autoridade Brasília", "blindado para diplomata Brasília", "escolta executiva Brasília", "blindado Lago Sul", "veículo blindado Esplanada", "transporte blindado executivo DF"],
    },
    intro: "Em Brasília, a KMON VIP opera frota blindada com base local permanente. Atendemos autoridades federais, executivos corporativos e diplomatas com motoristas treinados em direção defensiva e protocolo executivo. Operação coordenada com avaliação de rota, escolta opcional e cobertura 24 horas em todo o Distrito Federal.",
    bullets: ["Frota blindada com base permanente em BSB", "Motoristas treinados em direção defensiva", "Escolta opcional sob demanda", "Cobertura 24h em todo o DF"],
    faqs: [
      { q: "Há frota blindada disponível diariamente em Brasília?", a: "Sim. Mantemos base operacional permanente em Brasília com frota blindada disponível 24 horas." },
      { q: "Os motoristas blindados têm formação específica?", a: "Sim. Treinamento contínuo em direção defensiva, evasiva e protocolo executivo para operações em DF." },
      { q: "Atendem o corpo diplomático com blindado?", a: "Sim. Atendimento contínuo a embaixadas e missões diplomáticas em Brasília com frota blindada." },
    ],
  },
  {
    serviceSlug: "transporte-blindado",
    citySlug: "sao-paulo",
    hook: "Transporte Blindado em São Paulo — Veículos Blindados com Motorista Treinado",
    meta: {
      title: "Transporte Blindado em São Paulo com Motorista",
      description: "SUVs e sedans blindados com motorista treinado em São Paulo. Atendimento a executivos, autoridades e mercado financeiro em SP.",
      keywords: ["transporte blindado São Paulo", "carro blindado São Paulo", "blindado SP", "SUV blindado São Paulo", "blindado com motorista SP", "blindado para executivo SP", "blindado Faria Lima", "blindado Vila Olímpia", "escolta executiva São Paulo", "transporte blindado Avenida Paulista", "blindado para mercado financeiro", "veículo blindado VIP SP"],
    },
    intro: "Em São Paulo, a KMON VIP oferece transporte blindado com motorista treinado para executivos, autoridades e líderes do mercado financeiro. Cobertura nas principais regiões corporativas e atendimento em aeroportos de Guarulhos e Congonhas. Planejamento de rota, escolta opcional e operação coordenada para agendas sensíveis.",
    bullets: ["SUVs e sedans blindados", "Motoristas treinados em segurança executiva", "Cobertura Faria Lima, Paulista, Itaim", "Escolta opcional e planejamento de rota"],
    faqs: [
      { q: "Há frota blindada em São Paulo?", a: "Sim. Frota blindada disponível em São Paulo, com cobertura nos principais polos corporativos e aeroportos." },
      { q: "É possível contratar escolta junto ao blindado em SP?", a: "Sim. Oferecemos veículo batedor e equipe de segurança opcional, dimensionados conforme o perfil da operação." },
      { q: "Atendem em Guarulhos e Congonhas com blindado?", a: "Sim. Receptivo blindado em ambos os aeroportos paulistas." },
    ],
  },
  {
    serviceSlug: "transporte-blindado",
    citySlug: "rio-de-janeiro",
    hook: "Transporte Blindado no Rio de Janeiro — Veículos Blindados com Motorista",
    meta: {
      title: "Transporte Blindado no Rio de Janeiro com Motorista",
      description: "Veículos blindados com motorista treinado no Rio de Janeiro. Atendimento a executivos, autoridades, artistas internacionais e turismo VIP.",
      keywords: ["transporte blindado Rio de Janeiro", "carro blindado Rio", "blindado RJ", "SUV blindado Rio", "blindado com motorista Rio", "blindado para artista Rio", "blindado para celebridade RJ", "escolta executiva Rio", "blindado Copacabana", "blindado Ipanema", "blindado Barra da Tijuca", "transporte blindado Galeão"],
    },
    intro: "No Rio de Janeiro, a KMON VIP oferece transporte blindado com motorista treinado para executivos, autoridades, artistas internacionais e turismo VIP. Cobertura nos aeroportos Galeão e Santos Dumont, hotéis Zona Sul, eventos e centros corporativos. Histórico de atendimento a celebridades internacionais e operações de alta exposição.",
    bullets: ["Frota blindada no Rio de Janeiro", "Atendimento a artistas e celebridades", "Transfer blindado GIG e SDU", "Cobertura Zona Sul e Barra"],
    faqs: [
      { q: "A KMON VIP atende celebridades com blindado no Rio?", a: "Sim. Histórico de atendimento a turnês internacionais e personalidades com operação blindada discreta no RJ." },
      { q: "Há blindado disponível para transfer aeroportuário no Rio?", a: "Sim. Frota blindada disponível para transfer em Galeão (GIG) e Santos Dumont (SDU)." },
      { q: "Atendem na Barra da Tijuca com blindado?", a: "Sim. Cobertura completa Zona Sul, Barra, Recreio e Jacarepaguá com frota blindada." },
    ],
  },
  // Diplomático Brasília
  {
    serviceSlug: "transporte-diplomatico",
    citySlug: "brasilia",
    hook: "Transporte Diplomático em Brasília — Atendimento a Embaixadas e Missões",
    meta: {
      title: "Transporte Diplomático em Brasília — Embaixadas e Delegações",
      description: "Transporte com protocolo internacional para embaixadas, delegações estrangeiras e missões oficiais em Brasília. KMON VIP há 35 anos no corpo diplomático.",
      keywords: ["transporte diplomático Brasília", "transporte para embaixada Brasília", "transporte para delegação estrangeira", "carro para embaixador DF", "transporte para missão oficial Brasília", "transporte para cúpula internacional", "transporte para chanceler Brasília", "transporte para visita de Estado", "frota para corpo diplomático", "motorista diplomático Brasília", "transporte VIP embaixada", "transporte para consulado Brasília"],
    },
    intro: "Em Brasília, sede do governo brasileiro, a KMON VIP atende embaixadas, consulados, delegações estrangeiras e missões oficiais há 35 anos. Oferecemos transporte com protocolo internacional, motoristas bilíngues fluentes, frota executiva e blindada, planejamento de rotas para visitas oficiais e cobertura completa de agendas diplomáticas — incluindo cúpulas internacionais como G20 2024.",
    bullets: ["35 anos atendendo o corpo diplomático", "Motoristas bilíngues e protocolados", "Frota executiva e blindada", "Histórico em G20, cúpulas e visitas de Estado"],
    faqs: [
      { q: "Há quanto tempo a KMON VIP atende embaixadas em Brasília?", a: "Há 35 anos. Brasília é nossa sede desde 1990 e mantemos contratos com embaixadas, consulados e missões diplomáticas." },
      { q: "Atenderam o G20 Brasil 2024 em Brasília?", a: "Sim. Participamos da operação do G20 com frota dedicada a delegações internacionais e autoridades." },
      { q: "Os motoristas são treinados em protocolo internacional?", a: "Sim. Treinamento contínuo em protocolo diplomático, cerimonial, recepção e atendimento bilíngue." },
    ],
  },
  // Eventos Brasília
  {
    serviceSlug: "eventos-e-congressos",
    citySlug: "brasilia",
    hook: "Transporte para Eventos e Congressos em Brasília",
    meta: {
      title: "Transporte para Eventos e Congressos em Brasília",
      description: "Frota dedicada com vans, sedans, SUVs e ônibus executivos para eventos, congressos e convenções em Brasília. Coordenação completa de mobilidade.",
      keywords: ["transporte para eventos Brasília", "transporte para congresso Brasília", "frota para evento corporativo DF", "transporte para Centro de Convenções Ulysses", "transporte para palestrante Brasília", "frota para staff evento Brasília", "transporte para convenção Brasília", "ônibus para evento DF", "van para evento Brasília", "logística de transporte evento Brasília", "transporte para cerimônia Brasília", "frota dedicada evento DF"],
    },
    intro: "Em Brasília, a KMON VIP estrutura operações completas de mobilidade para eventos, congressos e convenções — incluindo cúpulas internacionais como G20 2024. Coordenamos frota mista (vans, sedans, SUVs e ônibus) com planejamento logístico, recepção de palestrantes, transfer de staff e cobertura no Centro de Convenções Ulysses Guimarães e demais espaços.",
    bullets: ["Frota mista coordenada (vans, sedans, SUVs, ônibus)", "Cobertura Centro de Convenções Ulysses Guimarães", "Atendimento a palestrantes e VIPs", "Operação simultânea para grandes eventos"],
    faqs: [
      { q: "Atendem o Centro de Convenções Ulysses Guimarães?", a: "Sim. Operação dedicada a eventos no Ulysses Guimarães e demais centros de convenção e hotéis em Brasília." },
      { q: "É possível contratar frota dedicada para staff e palestrantes?", a: "Sim. Estruturamos frota mista — vans/ônibus para staff, sedans/SUVs para palestrantes e VIPs — sob coordenação única." },
      { q: "Atenderam grandes eventos em Brasília?", a: "Sim. Participamos do G20 Brasil 2024 e diversos congressos, cúpulas e eventos corporativos na capital." },
    ],
  },
];
