import { ChartNoAxesColumnIncreasing, ClipboardCheck, House, Utensils } from 'lucide-react';

// Shared by the hero and the interactive preview so both show the same app.
export const appScreens = [
  {
    id: 'inicio', label: 'Início', icon: House,
    title: 'Seu dia, organizado.',
    description: 'Hábitos, refeições e tarefas reunidos em uma só tela.',
    src: '/images/imgs-app/testo-max-inicio.webp',
    alt: 'Tela inicial do Testo Max com protocolo do dia, refeições e acompanhamento dos hábitos.',
  },
  {
    id: 'alimentacao', label: 'Alimentação', icon: Utensils,
    title: 'Do cardápio à lista de compras.',
    description: 'Veja as refeições do dia e organize o que levar do mercado.',
    src: '/images/imgs-app/testo-max-alimentacao.webp',
    alt: 'Tela de alimentação do Testo Max com plano de refeições, macronutrientes e lista de mercado.',
  },
  {
    id: 'protocolo', label: 'Protocolo', icon: ClipboardCheck,
    title: 'Saiba qual é o próximo passo.',
    description: 'Consulte a rotina e acompanhe os hábitos que já colocou em prática.',
    src: '/images/imgs-app/testo-max-protocolo.webp',
    alt: 'Tela de protocolos do Testo Max com tarefas diárias, hábitos essenciais e missão do dia.',
  },
  {
    id: 'progresso', label: 'Progresso', icon: ChartNoAxesColumnIncreasing,
    title: 'Veja sua constância ganhar forma.',
    description: 'Acompanhe sua semana, os hábitos concluídos e sua sequência de dias.',
    src: '/images/imgs-app/testo-max-progresso.webp',
    alt: 'Tela de progresso do Testo Max com sequência de dias, evolução semanal e estatísticas de hábitos.',
  },
];
