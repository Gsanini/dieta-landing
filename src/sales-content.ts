export type ProtocolResult = {
  id: string;
  title: string;
  before: string;
  after: string;
  period: string;
  context: string;
};

export type ProtocolBonus = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  highlights: string[];
  format: string;
};

export type ProtocolTestimonial = {
  id: string;
  name: string;
  quote: string;
  context?: string;
  avatar?: string;
};

type SalesContent = {
  results: ProtocolResult[];
  bonuses: ProtocolBonus[];
  testimonials: ProtocolTestimonial[];
  price: {
    reference: number | null;
    current: number | null;
    paymentTerms: string;
  };
};

// Preencha com resultados documentados, relatos autorizados e condições reais.
// Imagens de antes/depois e prints estão em media-content.ts.
// Preços informados pelo usuário; formas de pagamento são exibidas no checkout.
export const salesContent: SalesContent = {
  results: [],
  bonuses: [
    {
      id: "cardapio-28-dias",
      title: "Cardápio Testo Max",
      shortTitle: "28 dias",
      description:
        "28 dias de refeições para você saber o que colocar no prato.",
      highlights: ["4 semanas organizadas", "Opções de substituição"],
      format: "Guia digital",
    },
    {
      id: "lista-de-compras",
      title: "Lista de Compras do Homem",
      shortTitle: "Compra certa",
      description:
        "Suas compras da semana organizadas em uma lista pronta para consultar.",
      highlights: ["Lista semanal", "Versão econômica e completa"],
      format: "Checklist digital",
    },
    {
      id: "testo-max-na-vida-real",
      title: "Testo Max na Vida Real",
      shortTitle: "Sem complicação",
      description:
        "O que escolher no restaurante, no churrasco e nos dias corridos.",
      highlights: ["Churrascos e restaurantes", "Viagens e dias corridos"],
      format: "Guia rápido",
    },
  ],
  testimonials: [],
  price: {
    reference: 197,
    current: 37.9,
    paymentTerms: "",
  },
};

// Imagens editoriais de pessoas fictícias; nunca cadastrar como resultados ou relatos.
export const protocolIllustrations = [
  {
    id: "foco",
    src: "/images/testo-man-focus.webp",
    title: "FOCO.",
    alt: "Imagem gerada por IA de um homem adulto musculoso em uma academia",
  },
  {
    id: "rotina",
    src: "/images/testo-man-routine.webp",
    title: "ROTINA.",
    alt: "Imagem gerada por IA de um homem adulto negro e forte em uma área de treino",
  },
  {
    id: "constancia",
    src: "/images/testo-man-consistency.webp",
    title: "CONSTÂNCIA.",
    alt: "Imagem gerada por IA de um homem adulto maduro e forte em um estúdio de treino",
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
