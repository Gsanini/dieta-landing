import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Flame,
  Heart,
  Leaf,
  Play,
  ShieldCheck,
  Sprout,
  Utensils,
  Volume2,
  X,
} from "lucide-react";
import { getVideoSource, siteConfig } from "./config";
import Reviews from "./Reviews";

const sectionContainer =
  "mx-auto w-[calc(100%-40px)] max-w-[1120px] min-[701px]:w-[calc(100%-64px)] min-[1001px]:w-[calc(100%-96px)]";

const eyebrow =
  "flex items-center gap-2.5 text-[7px] font-semibold tracking-[1.5px] text-[#c1d99b] min-[701px]:text-[8px] min-[701px]:tracking-[1.7px]";

const heading =
  "font-manrope text-[33px] font-medium leading-[1.22] tracking-[-1.2px] min-[701px]:text-[37px] min-[701px]:tracking-[-1.5px]";

const headingAccent =
  "font-editorial text-[1.17em] font-normal italic tracking-[-0.6px] text-[#c1d99b]";

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-6 rounded-[5px] border border-[#d2e4b2] bg-[#c1d99b] px-6 py-3.5 text-[11px] font-semibold leading-[1.4] text-[#233015] shadow-[0_4px_19px_#97c34d0b] transition hover:-translate-y-0.5 hover:bg-[#d0e7aa] hover:shadow-[0_7px_26px_#a9cf7330] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b] active:translate-y-0 motion-reduce:transform-none";

const pillars = [
  {
    number: "01",
    icon: Utensils,
    title: "Comida de verdade.",
    text: "Carne, ovos, frutas, raízes e gorduras naturais. Voltar ao básico começa por dar espaço à comida de verdade no seu prato.",
    tag: "O BÁSICO NO CENTRO DA MESA",
  },
  {
    number: "02",
    icon: Flame,
    title: "Sem viver de restrição.",
    text: "A proposta não é passar fome nem viver contando folha de alface. É olhar para a sua alimentação com a atenção que você merece.",
    tag: "CUIDAR DE VOCÊ COMEÇA NO PRATO",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Uma rotina possível.",
    text: "Entre trabalho, casa e família, cuidar de você também precisa ter espaço. Com escolhas simples, sem fazer de uma prateleira de suplementos a base da sua rotina.",
    tag: "PARA A VIDA QUE VOCÊ TEM HOJE",
  },
];

const everydaySigns = [
  "Acordar quebrado, antes mesmo de o dia começar.",
  "Subir uma escada e já ficar sem fôlego.",
  "Ver a barriga crescer a cada ano.",
  "Sentir que a força já não é a mesma.",
  "Chegar em casa sem disposição para a família.",
  "Depender de mais um café para aguentar o dia.",
];

const familyMoments = [
  {
    icon: ShieldCheck,
    title: "Força para carregar.",
    text: "Seu filho no colo. As compras da casa. O peso da própria família, literalmente e figurativamente.",
  },
  {
    icon: Flame,
    title: "Disposição para acompanhar.",
    text: "Correr, brincar e participar. Viver os momentos com os seus filhos, em vez de só assistir de longe.",
  },
  {
    icon: Heart,
    title: "Presença para compartilhar.",
    text: "Ter energia para a vida a dois. Ser o marido que sua mulher admira e estar inteiro quando vocês estão juntos.",
  },
];

const questions = [
  {
    question: "O que é a Dieta da Selva?",
    answer:
      "É uma proposta sobre alimentação e hábitos para homens que querem cuidar de si e estar presentes para a família. O ponto de partida é voltar ao básico: carne, ovos, frutas, raízes, gorduras naturais e comida de verdade no centro da rotina.",
  },
  {
    question: "É para mim, mesmo sem querer um abdômen trincado?",
    answer:
      "Sim. A conversa aqui é com o homem que quer cuidar do corpo para a vida que leva: trabalhar, estar com a mulher, brincar com os filhos e acompanhar a família. Você não precisa ter como objetivo virar fisiculturista para começar a se cuidar.",
  },
  {
    question: "Vou precisar passar fome ou comprar vários suplementos?",
    answer:
      "A proposta parte da comida de verdade, sem fazer da fome ou de uma prateleira de suplementos o caminho. As quantidades, restrições e eventuais necessidades de suplementação dependem de cada pessoa e devem ser individualizadas com um profissional.",
  },
  {
    question: "E se minha rotina já for corrida com trabalho e família?",
    answer:
      "É justamente essa realidade que orienta a proposta: cuidar da alimentação precisa ter espaço na vida de quem já tem responsabilidades. Conheça os pilares nesta página e, quando a apresentação completa estiver disponível, avalie como a abordagem se encaixa na sua rotina.",
  },
  {
    question: "Como posso conhecer o programa completo?",
    answer:
      "Assista à apresentação nesta página quando ela estiver disponível. Os detalhes do programa, o que está incluído e as condições de acesso serão apresentados antes de qualquer compra.",
  },
];

function Brand() {
  return (
    <a
      className="inline-flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b]"
      href="#inicio"
      aria-label="Dieta da Selva — início"
    >
      <span className="grid h-10 w-8 place-items-center text-[#c1d99b]">
        <Leaf className="h-7 w-7 -rotate-[13deg]" strokeWidth={1.5} />
      </span>
      <span className="flex flex-col font-manrope text-[7px] font-semibold leading-[1.65] tracking-[2.7px]">
        DIETA DA{" "}
        <strong className="text-lg font-bold leading-[1.1] tracking-[1.6px]">
          SELVA<span className="text-[#c1d99b]">.</span>
        </strong>
      </span>
    </a>
  );
}

function Modal({
  children,
  title,
  onClose,
  video = false,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  video?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={`relative m-auto max-h-[calc(100dvh-48px)] w-[calc(100%-36px)] overflow-auto rounded-[15px] border border-[#46523b] bg-[#161c13] p-0 text-[#e9eddf] shadow-[0_25px_100px_#0009] backdrop:bg-[#040704]/85 backdrop:backdrop-blur-md ${
        video
          ? "max-w-[1040px] overflow-hidden bg-[#080a07] pt-[54px] [&_iframe]:block [&_iframe]:aspect-video [&_iframe]:max-h-[calc(100dvh-120px)] [&_iframe]:w-full [&_iframe]:border-0 [&_iframe]:bg-[#080a07] [&_video]:block [&_video]:aspect-video [&_video]:max-h-[calc(100dvh-120px)] [&_video]:w-full [&_video]:bg-[#080a07] max-[700px]:w-[calc(100%-20px)]"
          : "max-w-[560px]"
      }`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className={`absolute z-10 grid h-10 w-10 place-items-center rounded-full border border-[#69755944] bg-[#10170dd9] text-[#d9e5cb] transition hover:bg-[#2d3c23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1d99b] ${
          video ? "right-2 top-1.5" : "right-3 top-3"
        }`}
        aria-label="Fechar janela"
        onClick={onClose}
        autoFocus
      >
        <X size={21} />
      </button>
      {children}
    </dialog>
  );
}

function ComingSoon({
  icon,
  eyebrowText,
  title,
  accent,
  description,
  buttonText,
  onClick,
}: {
  icon: ReactNode;
  eyebrowText: string;
  title: string;
  accent: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_50%_0%,#445c253b,transparent_65%)] px-6 pb-8 pt-[53px] text-center min-[701px]:px-[42px] min-[701px]:pb-11 min-[701px]:pt-[58px]">
      <span className="mx-auto mb-6 grid h-[65px] w-[65px] place-items-center rounded-full border border-[#526342] bg-[#bed58d07] text-[#c1d99b]">
        {icon}
      </span>
      <p className={`${eyebrow} mb-4 justify-center text-[6px] min-[701px]:text-[8px]`}>
        {eyebrowText}
      </p>
      <h2 className={`${heading} text-[29px] min-[701px]:text-[34px]`}>
        {title}
        <br />
        <span className={headingAccent}>{accent}</span>
      </h2>
      <p className="mx-auto mb-7 mt-5 max-w-[360px] text-[11px] leading-[1.9] text-[#a8b29b] min-[701px]:text-xs">
        {description}
      </p>
      <button className={`${primaryButton} text-[10px]`} onClick={onClick}>
        {buttonText} <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default function App() {
  const [modal, setModal] = useState<
    "video" | "offer" | "privacy" | "terms" | null
  >(null);
  const video = getVideoSource(siteConfig.videoUrl);

  function openOffer() {
    if (siteConfig.checkoutUrl) window.location.assign(siteConfig.checkoutUrl);
    else setModal("offer");
  }

  function explore() {
    setModal(null);
    window.setTimeout(
      () =>
        document.getElementById("metodo")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        }),
      0,
    );
  }

  return (
    <div
      id="inicio"
      className="min-h-screen overflow-x-hidden bg-[#10120f] font-sans text-[#f0f0e9] antialiased selection:bg-[#c1d99b] selection:text-[#10120f]"
    >
      <a
        className="fixed left-3 top-2.5 z-[100] -translate-y-[150%] rounded-[5px] bg-[#c1d99b] p-3.5 text-[#141a0f] transition focus:translate-y-0"
        href="#conteudo"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        <section
          className="relative isolate overflow-hidden px-5 pt-10 text-center min-[701px]:px-6 min-[701px]:pt-[55px] min-[1600px]:pt-[69px]"
          aria-labelledby="hero-title"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-36 -z-10 h-[1000px] w-[1300px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(94,119,59,.13),transparent_61%)]"
            aria-hidden="true"
          />

          <h1
            id="hero-title"
            className="mx-auto max-w-[1020px] text-balance font-manrope text-[clamp(2.25rem,4.8vw,4rem)] font-medium leading-[1.16] tracking-[-2px] max-[380px]:text-[34px] min-[701px]:tracking-[-3px] min-[1600px]:text-[68px]"
          >
            Sua família conta com você.
            <br />
            <span className="font-editorial text-[1.1em] font-normal italic tracking-[-1px] text-[#c1d99b]">
              Seu corpo aguenta?
            </span>
          </h1>
          <p className="mx-auto mt-[18px] max-w-[680px] text-[13px] leading-[1.85] text-[#a1a59a] min-[701px]:text-sm min-[701px]:leading-[1.8]">
            Cansaço, falta de fôlego e a barriga crescendo não são só “a idade”.
            <br className="max-[700px]:hidden" /> Dê o play e descubra por que
            sua rotina pode estar deixando você mais fraco — e como começar a
            virar esse jogo.
          </p>

          <div
            className="mx-auto mt-7 w-full max-w-[850px] scroll-mt-9 min-[701px]:mt-8 min-[1600px]:max-w-[900px]"
            id="apresentacao"
          >
            <button
              className="group relative block aspect-[1.54] w-full overflow-hidden rounded-[9px] border border-[#586247] bg-[#131b10] p-0 text-left shadow-[0_0_0_5px_#c1d99b04,0_25px_75px_#0005] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b] min-[701px]:aspect-[1.96] min-[701px]:rounded-xl min-[1600px]:aspect-[1.98]"
              onClick={() => setModal("video")}
              aria-label="Assistir à apresentação da Dieta da Selva"
            >
              <img
                className="block h-full w-full object-cover brightness-[.81] saturate-[.8] transition-transform duration-1000 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                src={siteConfig.poster}
                alt="Alimentos naturais sobre uma mesa rústica, cercados pelo verde da floresta"
                width="1672"
                height="941"
                fetchPriority="high"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,#070d0780_0%,transparent_40%,#05090410_50%,#060a07bf_100%)]" />
              <span className="absolute left-[17px] right-[17px] top-[15px] flex items-center justify-between min-[701px]:left-[29px] min-[701px]:right-[29px] min-[701px]:top-[23px]">
                <span className="flex items-center gap-1.5 text-[6px] font-medium tracking-[1.05px] text-[#dddccc] min-[701px]:gap-2 min-[701px]:text-[8px] min-[701px]:tracking-[1.6px]">
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-[#c9d6b350] text-[#cdd9b7] min-[701px]:h-6 min-[701px]:w-6">
                    <Leaf className="h-3 w-3 min-[701px]:h-3.5 min-[701px]:w-3.5" />
                  </span>
                  COMIDA DE VERDADE. UM NOVO COMEÇO.
                </span>
                <span className="text-[7px] tracking-[1.3px] text-[#bdc2b5] max-[700px]:hidden">
                  FILME DE APRESENTAÇÃO
                </span>
              </span>
              <span className="absolute left-1/2 top-[48%] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 min-[701px]:top-[49%] min-[701px]:gap-[15px]">
                <span className="grid h-[68px] w-[68px] place-items-center rounded-full border border-[#d7e5c449] bg-[#c9ddae09] shadow-[0_0_0_9px_#c9ddae07] transition group-hover:scale-105 group-hover:shadow-[0_0_0_13px_#c9ddae09] min-[701px]:h-[87px] min-[701px]:w-[87px]">
                  <span className="grid h-[51px] w-[51px] place-items-center rounded-full border border-[#e9f2d8a1] bg-[#d7e6c1e3] text-[#2a3720] shadow-[0_4px_30px_#0003] backdrop-blur-[10px] min-[701px]:h-16 min-[701px]:w-16">
                    <Play
                      className="ml-1 h-[21px] w-[21px] min-[701px]:h-[27px] min-[701px]:w-[27px]"
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  </span>
                </span>
                <span className="text-[8px] tracking-[.45px] text-[#e1e5d9] [text-shadow:0_2px_6px_#000] min-[701px]:text-[9px]">
                  Conheça a Dieta da Selva.
                </span>
              </span>
              <span className="absolute bottom-[18px] left-[17px] right-[17px] flex items-end justify-between gap-2.5 min-[701px]:bottom-[25px] min-[701px]:left-[29px] min-[701px]:right-[29px]">
                <span className="font-editorial text-[21px] leading-[1.2] tracking-[-.2px] min-[701px]:text-[27px]">
                  Força para estar presente.
                  <span className="mt-1 block max-w-60 font-sans text-[7px] leading-[1.5] tracking-normal text-[#b7baab] min-[701px]:mt-1.5 min-[701px]:max-w-none min-[701px]:text-[9px]">
                    Cuide do homem com quem sua família conta.
                  </span>
                </span>
                <span className="mb-0 flex shrink-0 items-center gap-0 rounded-full border border-[#b9cf9860] p-1 text-[0] tracking-[1.4px] text-[#e1e7d4] min-[701px]:mb-[3px] min-[701px]:gap-[13px] min-[701px]:rounded-none min-[701px]:border-0 min-[701px]:p-0 min-[701px]:text-[8px]">
                  ASSISTIR AGORA <ArrowUpRight size={16} />
                </span>
              </span>
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] text-[#868e7c] min-[701px]:gap-2 min-[701px]:text-[9px]">
              <Volume2 className="h-3 w-3 text-[#a9b794] min-[701px]:h-3.5 min-[701px]:w-3.5" />
              <span>Um convite para voltar ao básico e cuidar de você.</span>
            </div>
          </div>

          <a
            className={`${primaryButton} mt-6 w-full max-w-[330px] min-[701px]:w-auto min-[701px]:min-w-[305px]`}
            href="#metodo"
          >
            Quero voltar a me sentir forte <ArrowRight size={18} />
          </a>
          <div className="mt-3.5 flex items-center justify-center gap-2.5 text-[8px] text-[#a0a593] min-[701px]:mt-[15px] min-[701px]:gap-[13px] min-[701px]:text-[9px]">
            <span className="flex items-center gap-1.5">
              <Leaf className="h-3 w-3 text-[#90a476]" /> Comida de verdade
            </span>
            <i className="h-[3px] w-[3px] rounded-full bg-[#555f48]" />
            <span className="flex items-center gap-1.5">
              <Heart className="h-3 w-3 text-[#90a476]" /> Você e sua família
            </span>
          </div>
          <a
            className="mx-auto mb-7 mt-9 flex w-fit flex-col items-center gap-3 text-[#777f6d] transition hover:text-[#c1d99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b] min-[701px]:mb-10 min-[701px]:mt-12"
            href="#realidade"
            aria-label="Conhecer para quem é a Dieta da Selva"
          >
            <span className="text-[6px] tracking-[2.1px] min-[701px]:text-[7px]">
              ESSA ROTINA PARECE COM A SUA?
            </span>
            <ArrowDown size={15} />
          </a>
        </section>

        <section
          className={`${sectionContainer} grid grid-cols-1 gap-7 border-t border-white/[.12] pt-10 min-[701px]:grid-cols-2 min-[701px]:gap-x-8 min-[701px]:gap-y-10 min-[701px]:pt-16 min-[1001px]:gap-x-[70px]`}
          id="realidade"
          aria-labelledby="reality-title"
        >
          <div>
            <p className={`${eyebrow} mb-4 min-[701px]:mb-5`}>
              <span className="h-px w-6 bg-[#8ba56d]" /> UMA CONVERSA DE HOMEM PARA HOMEM
            </p>
            <h2 id="reality-title" className={heading}>
              Sua responsabilidade aumentou.
              <br />
              <span className={headingAccent}>E a sua disposição?</span>
            </h2>
            <p className="mt-[18px] text-[13px] leading-[1.9] text-[#a8ae9f] min-[701px]:mt-[22px] min-[701px]:text-sm">
              Você virou marido. Talvez tenha virado pai. Virou o cara que deveria estar pronto. Mas, no meio de tanta responsabilidade, cuidar do próprio corpo foi ficando para depois.
            </p>
            <p className="mt-[18px] text-[13px] leading-[1.9] text-[#a8ae9f] min-[701px]:mt-[22px] min-[701px]:text-sm">
              Uma coisa é falar que faria qualquer coisa pela sua mulher e pelos seus filhos. Outra é perceber que o cansaço já está decidindo o que você consegue fazer com eles.
            </p>
          </div>
          <div className="self-start rounded-[10px] border border-[#38432d] bg-[#181e14] px-5 py-6 min-[701px]:p-6 min-[1001px]:p-[30px]">
            <p className="text-sm font-semibold text-[#c1d99b]">Você se reconhece aqui?</p>
            <ul className="mb-6 mt-[18px] list-none p-0">
              {everydaySigns.map((sign) => (
                <li
                  className="flex items-baseline gap-3 border-b border-white/[.12] py-3 text-[13px] leading-[1.65] text-[#c5cbbd]"
                  key={sign}
                >
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#b6a27e]" aria-hidden="true" />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="font-editorial text-[23px] italic leading-[1.4] text-[#a9b09f]">
              “É a idade.” <span className="block">“Depois dos 30 é assim mesmo.”</span>
            </p>
          </div>
          <div className="col-span-full border-l-2 border-[#c1d99b] bg-[linear-gradient(90deg,#c1d99b09,transparent)] px-5 py-[22px] min-[701px]:px-8 min-[701px]:py-7">
            <p className="font-manrope text-lg leading-[1.6] tracking-[-.4px] min-[701px]:text-xl">
              Não, irmão.{" "}
              <strong className="font-medium text-[#c1d99b]">
                Você ainda é novo demais para estar se sentindo velho.
              </strong>
            </p>
            <p className="mt-3.5 max-w-[800px] text-[13px] leading-[1.9] text-[#a8ae9f]">
              Pão, açúcar, delivery, ultraprocessados, cerveja todo final de semana… e café para sobreviver ao próximo dia. Sua vida mudou. Está na hora de olhar também para o que você coloca no prato.
            </p>
          </div>
        </section>

        <section
          className={`${sectionContainer} py-12 min-[701px]:py-[76px]`}
          aria-labelledby="capability-title"
        >
          <div className="mx-auto max-w-[850px] text-center">
            <p className={`${eyebrow} mb-4 justify-center min-[701px]:mb-5`}>
              <span className="h-px w-6 bg-[#8ba56d]" /> EXISTE UM MOTIVO MAIOR
            </p>
            <h2
              id="capability-title"
              className={`${heading} text-balance text-[29px] min-[701px]:text-[clamp(28px,3vw,37px)]`}
            >
              Talvez você não queira um abdômen trincado.
              <br />
              <span className={headingAccent}>Talvez só queira se sentir forte de novo.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[13px] leading-[1.9] text-[#a8ae9f] min-[701px]:mt-6 min-[701px]:text-sm">
              Não estou falando de virar fisiculturista. Estou falando de ser um homem capaz. Olhar no espelho e reconhecer alguém que quer estar pronto para a vida que construiu.
            </p>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-3.5 min-[701px]:mt-10 min-[701px]:grid-cols-3 min-[701px]:gap-[18px] min-[1001px]:gap-[30px]">
            {familyMoments.map(({ icon: Icon, title, text }) => (
              <article
                className="relative rounded-lg border border-white/[.12] bg-[#151a12] py-[23px] pl-16 pr-5 min-[701px]:p-5 min-[1001px]:px-6 min-[1001px]:py-7"
                key={title}
              >
                <Icon
                  className="absolute left-5 top-6 h-[22px] w-[22px] text-[#c1d99b] min-[701px]:static min-[701px]:mb-[22px] min-[701px]:h-[25px] min-[701px]:w-[25px]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-manrope text-[15px] font-medium leading-[1.5] tracking-[-.35px] min-[701px]:text-base">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#a8ae9f]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${sectionContainer} border-t border-white/[.12] pt-10 min-[701px]:pt-[62px]`}
          id="metodo"
          aria-labelledby="philosophy-title"
        >
          <div className="block min-[701px]:flex min-[701px]:items-end min-[701px]:justify-between min-[701px]:gap-9 min-[1001px]:gap-[60px]">
            <div>
              <p className={`${eyebrow} mb-4 min-[701px]:mb-5`}>
                <span className="h-px w-6 bg-[#8ba56d]" /> CONHEÇA A DIETA DA SELVA
              </p>
              <h2 id="philosophy-title" className={heading}>
                Voltar ao básico.
                <br />
                <span className={headingAccent}>Começar por você.</span>
              </h2>
            </div>
            <p className="mt-[22px] w-full text-[11px] leading-[1.9] text-[#989e90] min-[701px]:mt-0 min-[701px]:w-[345px] min-[701px]:pb-1 min-[701px]:text-[13px]">
              Foi pensando no homem que tem uma família, responsabilidades e uma vida inteira pela frente que surgiu a Dieta da Selva. Uma forma de trazer a comida de verdade de volta à sua rotina.
            </p>
          </div>
          <ul
            className="mt-[26px] flex list-none flex-wrap justify-start gap-x-6 gap-y-3 border-y border-white/[.12] py-[22px] min-[701px]:mt-[38px] min-[701px]:justify-between min-[701px]:gap-x-7 min-[701px]:gap-y-4 min-[701px]:py-6"
            aria-label="A base da Dieta da Selva"
          >
            {["Carne", "Ovos", "Frutas", "Raízes", "Gorduras naturais"].map((food) => (
              <li
                className="whitespace-nowrap font-editorial text-[28px] min-[701px]:text-[clamp(25px,2.8vw,35px)]"
                key={food}
              >
                {food}<span className="text-[#c1d99b]" aria-hidden="true">.</span>
              </li>
            ))}
          </ul>
          <div
            className="mt-[30px] grid scroll-mt-10 grid-cols-1 gap-0 min-[701px]:mt-11 min-[701px]:grid-cols-3 min-[701px]:gap-[26px] min-[1001px]:gap-[35px]"
            id="pilares"
          >
            {pillars.map(({ number, icon: Icon, title, text, tag }) => (
              <article
                className="relative border-t border-[#39422f] py-6 pl-[59px] min-[701px]:px-0 min-[701px]:pb-6 min-[701px]:pt-[26px]"
                key={number}
              >
                <div className="mb-0 flex items-center justify-between min-[701px]:mb-6">
                  <span className="absolute left-0.5 top-5 flex h-9 w-9 items-center text-[#c1d99b] min-[701px]:static min-[701px]:w-auto">
                    <Icon size={23} strokeWidth={1.5} />
                  </span>
                  <span className="absolute right-0 top-[26px] font-manrope text-[8px] tracking-[1px] text-[#646f57] min-[701px]:static min-[701px]:text-[10px]">
                    /{number}
                  </span>
                </div>
                <h3 className="mb-2.5 pr-8 font-manrope text-base font-medium tracking-[-.35px] min-[701px]:mb-3 min-[701px]:pr-0">
                  {title}
                </h3>
                <p className="max-w-[295px] pr-3.5 text-[11px] leading-[1.9] text-[#929a88] min-[701px]:pr-0 min-[701px]:text-[13px]">
                  {text}
                </p>
                <span className="mt-4 block text-[6px] tracking-[1.1px] text-[#a2ad92] min-[701px]:mt-[26px] min-[701px]:text-[7px] min-[701px]:tracking-[1.4px]">
                  {tag}
                </span>
              </article>
            ))}
          </div>
          <div className="mt-0 flex items-center justify-center gap-2 border-y border-white/[.12] px-2 py-5 text-center text-[9px] leading-[1.7] text-[#919986] min-[701px]:mt-3 min-[701px]:py-6 min-[701px]:text-[10px]">
            <Leaf className="text-[#99af7d]" size={15} />
            <p className="max-w-[300px] min-[701px]:max-w-none">
              Cuidar de você também é uma forma de{" "}
              <span className="text-[#cbd2c0]">cuidar de quem conta com você.</span>
            </p>
          </div>
        </section>

        <Reviews />

        <section
          className={`${sectionContainer} relative isolate mt-11 flex min-h-0 items-center justify-between gap-[38px] overflow-hidden rounded-[10px] border border-[#39482e] bg-[#192216] px-[26px] py-8 min-[701px]:mt-[76px] min-[701px]:min-h-[350px] min-[701px]:p-[38px] min-[1001px]:px-[54px] min-[1001px]:py-[47px]`}
          id="comecar"
          aria-labelledby="invitation-title"
        >
          <img
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[67%_center] opacity-65 min-[701px]:object-[center_25%]"
            src={siteConfig.poster}
            alt=""
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#192216fa,#192216df_60%,#182215a0)] min-[701px]:bg-[linear-gradient(90deg,#192216_0%,#192216f5_38%,#18221599_70%,#18221580)]"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className={`${eyebrow} mb-4 text-[6px] tracking-[1.3px] min-[701px]:text-[7px] min-[701px]:tracking-[1.6px]`}>
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#c1d99b] shadow-[0_0_10px_#bed58d44]" /> POR VOCÊ. POR QUEM VOCÊ AMA.
            </p>
            <h2
              id="invitation-title"
              className={`${heading} text-balance text-[31px] min-[701px]:text-[clamp(30px,3.1vw,39px)]`}
            >
              Sua família precisa de você.
              <br />
              <span className={headingAccent}>Cuide do homem que vai estar lá.</span>
            </h2>
            <p className="my-5 max-w-[510px] text-[11px] leading-[1.85] text-[#a8b19c] min-[701px]:mb-6 min-[701px]:mt-[17px] min-[701px]:text-[13px]">
              Sua família pode contar com você por décadas. Talvez esteja na hora de começar a cuidar de quem vai precisar estar presente em cada uma delas. Se essa conversa bateu em você, conheça a Dieta da Selva.
            </p>
            <button
              className={`${primaryButton} w-full gap-[15px] px-3 text-[10px] min-[701px]:w-auto min-[701px]:gap-6 min-[701px]:px-5`}
              onClick={openOffer}
            >
              Quero conhecer a Dieta da Selva <ArrowUpRight size={18} />
            </button>
            <span className="mt-3 flex items-center gap-1.5 text-[9px] leading-[1.6] text-[#9daa8e]">
              <Check size={13} /> O primeiro passo é cuidar de você.
            </span>
          </div>
          <div className="mr-3 hidden h-[178px] w-[178px] shrink-0 flex-col items-center justify-center rounded-full border border-[#b1c89440] bg-[#17221445] outline outline-1 outline-offset-[10px] outline-[#b1c89417] backdrop-blur-[3px] min-[701px]:flex">
            <ShieldCheck className="mb-4 text-[#bbd49b]" size={34} strokeWidth={1} />
            <span className="text-[6px] tracking-[2.4px] text-[#c0cdae]">FORÇA PARA</span>
            <strong className="my-1 font-editorial text-[28px] font-normal italic text-[#d1dfbb]">Estar presente.</strong>
            <span className="text-[6px] tracking-[2.4px] text-[#c0cdae]">QUEM CONTA COM VOCÊ</span>
          </div>
        </section>

        <section
          className={`${sectionContainer} block py-12 min-[701px]:grid min-[701px]:grid-cols-[1fr_1.65fr] min-[701px]:gap-10 min-[701px]:py-20 min-[1001px]:gap-[70px]`}
          id="duvidas"
          aria-labelledby="faq-title"
        >
          <div>
            <p className={`${eyebrow} mb-4 min-[701px]:mb-5`}>
              <span className="h-px w-6 bg-[#8ba56d]" /> SEM COMPLICAÇÃO
            </p>
            <h2 id="faq-title" className={heading}>
              Antes de<span className="max-[700px]:inline min-[701px]:hidden"> </span>
              <br className="max-[700px]:hidden" />
              <span className={headingAccent}>começar.</span>
            </h2>
            <p className="mt-3 text-[11px] leading-[1.8] text-[#929a88] min-[701px]:mt-[18px]">
              Respostas claras para <br className="max-[700px]:hidden" />as suas primeiras dúvidas.
            </p>
          </div>
          <div className="mt-[26px] border-t border-white/[.12] min-[701px]:mt-[5px]">
            {questions.map(({ question, answer }, index) => (
              <details key={question} className="group border-b border-white/[.12]">
                <summary className="flex cursor-pointer list-none items-center gap-3 py-[22px] text-[11px] font-medium leading-[1.5] group-open:text-[#c1d99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b] [&::-webkit-details-marker]:hidden min-[701px]:gap-[18px] min-[701px]:py-6">
                  <span className="text-[8px] text-[#617052] min-[701px]:text-[9px]">0{index + 1}</span>
                  <span>{question}</span>
                  <ChevronDown className="ml-auto h-4 w-4 text-[#93a780] transition-transform group-open:rotate-180 min-[701px]:h-[18px] min-[701px]:w-[18px]" />
                </summary>
                <p className="max-w-[560px] pb-6 pl-6 pr-7 text-[11px] leading-[1.9] text-[#a4ad98] min-[701px]:pl-8">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={`${sectionContainer} border-t border-white/[.12] pb-[22px] pt-6 min-[701px]:pt-8`}>
        <div className="flex flex-wrap items-center gap-[15px] min-[701px]:flex-nowrap min-[701px]:gap-6">
          <Brand />
          <p className="order-3 w-full text-[9px] text-[#a1a895] min-[701px]:order-none min-[701px]:ml-auto min-[701px]:mr-[30px] min-[701px]:w-auto min-[701px]:text-[10px]">
            Comida de verdade. Por você e por quem você ama.
          </p>
          <a
            className="ml-auto grid h-[34px] w-[34px] place-items-center rounded-full border border-[#3c4731] text-[#afbd9e] transition hover:border-[#c1d99b] hover:text-[#c1d99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b] min-[701px]:ml-0"
            href="#inicio"
            aria-label="Voltar ao início"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="mt-6 flex flex-col items-start gap-4 text-[7px] text-[#7d8772] min-[701px]:mt-[30px] min-[701px]:flex-row min-[701px]:items-center min-[701px]:justify-between min-[701px]:gap-[18px] min-[701px]:text-[8px]">
          <span>© {new Date().getFullYear()} Dieta da Selva. Todos os direitos reservados.</span>
          <div className="flex gap-5 min-[701px]:gap-[23px]">
            <button
              className="bg-transparent py-1 text-[8px] text-[#a2aa98] transition hover:text-[#c1d99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b]"
              onClick={() => setModal("privacy")}
            >
              Privacidade
            </button>
            <button
              className="bg-transparent py-1 text-[8px] text-[#a2aa98] transition hover:text-[#c1d99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1d99b]"
              onClick={() => setModal("terms")}
            >
              Termos de uso
            </button>
          </div>
        </div>
        <p className="mt-4 max-w-[520px] text-[7px] leading-[1.8] text-[#78816e]">
          Conteúdo informativo. Não substitui orientação médica ou nutricional individualizada. Resultados e necessidades variam de pessoa para pessoa.
        </p>
      </footer>

      {modal === "video" && (
        <Modal
          title="Apresentação da Dieta da Selva"
          onClose={() => setModal(null)}
          video={Boolean(video)}
        >
          {video ? (
            video.type === "embed" ? (
              <iframe
                src={video.url}
                title="Apresentação da Dieta da Selva"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <video src={video.url} poster={siteConfig.poster} controls autoPlay playsInline>
                <p>Seu navegador não suporta este vídeo.</p>
              </video>
            )
          ) : (
            <ComingSoon
              icon={<Play size={27} strokeWidth={1.5} />}
              eyebrowText="EM BREVE"
              title="O primeiro passo"
              accent="começa por você."
              description="A apresentação da Dieta da Selva está sendo preparada. Enquanto isso, conheça a proposta para homens que querem cuidar de si e estar presentes para a família."
              buttonText="Conhecer a Dieta da Selva"
              onClick={explore}
            />
          )}
        </Modal>
      )}

      {modal === "offer" && (
        <Modal title="Programa em breve" onClose={() => setModal(null)}>
          <ComingSoon
            icon={<Sprout size={31} strokeWidth={1.5} />}
            eyebrowText="DIETA DA SELVA · EM BREVE"
            title="Por você e por"
            accent="quem conta com você."
            description="O programa completo estará disponível em breve. Volte a esta página para conhecer os detalhes e as condições de acesso."
            buttonText="Entendi, volto em breve"
            onClick={() => setModal(null)}
          />
        </Modal>
      )}

      {(modal === "privacy" || modal === "terms") && (
        <Modal
          title={modal === "privacy" ? "Privacidade" : "Termos de uso"}
          onClose={() => setModal(null)}
        >
          <div className="px-6 pb-7 pt-[53px] min-[701px]:px-[38px] min-[701px]:pb-[35px] min-[701px]:pt-[50px]">
            <p className={eyebrow}>DIETA DA SELVA</p>
            <h2 className={`${heading} mb-6 mt-4 text-[31px]`}>
              {modal === "privacy" ? "Sua privacidade." : "Termos de uso."}
            </h2>
            <div className="space-y-[15px] text-xs leading-[1.9] text-[#aeb5a5]">
              {modal === "privacy" ? (
                <>
                  <p>Esta versão da página não possui formulários de cadastro, ferramentas de análise ou cookies de publicidade próprios.</p>
                  <p>As fontes são fornecidas pelo Google Fonts, que pode receber dados técnicos da conexão, como endereço IP. Quando um vídeo externo estiver disponível, o provedor poderá processar dados ao iniciar a reprodução. Links de compra, quando disponibilizados, levarão a uma plataforma com sua própria política de privacidade.</p>
                  <p>Estas informações serão atualizadas conforme novos recursos forem disponibilizados.</p>
                </>
              ) : (
                <>
                  <p>Esta página apresenta a proposta da Dieta da Selva e contém material informativo. Não oferece diagnóstico, prescrição alimentar ou tratamento de saúde.</p>
                  <p>Consulte um profissional de saúde para orientações individuais. A proposta não representa uma promessa de resultados específicos.</p>
                  <p>O programa está em preparação. Conteúdo, preço e condições de contratação serão informados quando a oferta estiver disponível. Nenhuma compra é realizada nesta versão da página.</p>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
