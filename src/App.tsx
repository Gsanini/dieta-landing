import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Gift,
  LockKeyhole,
  Smartphone,
  X,
} from "lucide-react";
import { siteConfig } from "./config";
import {
  BenefitsSection,
  BonusesSection,
  DeliverableDetails,
  DeliverableSection,
  HeroBundlePreview,
  InHandSection,
  PriceSection,
  ResultsSection,
  SectionHeading,
  TestimonialsSection,
} from "./SalesSections";

const questions = [
  {
    question: "O que é o Protocolo Testo Max?",
    answer:
      "É um protocolo digital de alimentação e hábitos com foco na saúde hormonal masculina. Você acessa o conteúdo pelo aplicativo.",
  },
  {
    question: "O que está incluído na compra?",
    answer:
      "Você recebe o Protocolo Testo Max completo no aplicativo e os três bônus: Cardápio Testo Max, Lista de Compras do Homem e Testo Max na Vida Real.",
  },
  {
    question: "Como recebo e acesso o conteúdo?",
    answer:
      "Pelo aplicativo. As instruções de acesso e as condições da compra são apresentadas no checkout.",
  },
  {
    question: "É um suplemento ou reposição hormonal?",
    answer:
      "Não. É um material educativo sobre alimentação e hábitos. A compra não inclui suplementos, medicamentos ou hormônios.",
  },
  {
    question: "Vou atingir 1.000 ng/dL de testosterona?",
    answer:
      "Não há garantia de um valor ou de um prazo. A meta apresentada não é uma promessa de resultado. A testosterona depende de diversos fatores; suspeitas de deficiência precisam de avaliação médica. O conteúdo não substitui diagnóstico, acompanhamento ou tratamento individual.",
  },
  {
    question: "E se minha rotina for corrida?",
    answer:
      "Você recebe modelos de refeições, uma lista de compras e orientações para restaurantes, viagens e dias corridos. Consulte e aplique no seu ritmo.",
  },
  {
    question: "Quais são o valor e as formas de pagamento?",
    answer:
      "O valor final e as opções de pagamento aparecem no checkout. Clique em um dos botões de compra para conferir.",
  },
];

function PurchaseButton({
  label,
  onUnavailable,
}: {
  label: string;
  onUnavailable: () => void;
}) {
  const content = (
    <>
      <span>{label}</span>
      <ArrowUpRight size={21} aria-hidden='true' />
    </>
  );
  const className = "button button-primary purchase-button";
  const ariaLabel = `${label} — comprar o Protocolo Testo Max`;
  return siteConfig.checkoutUrl ? (
    <a
      className={className}
      href={siteConfig.checkoutUrl}
      aria-label={ariaLabel}
      data-checkout
    >
      {content}
    </a>
  ) : (
    <button
      className={className}
      onClick={onUnavailable}
      aria-label={ariaLabel}
      data-checkout
    >
      {content}
    </button>
  );
}

function PurchaseSection({
  id,
  step,
  title,
  label,
  onUnavailable,
  primary = false,
}: {
  id: string;
  step: string;
  title: string;
  label: string;
  onUnavailable: () => void;
  primary?: boolean;
}) {
  return (
    <section
      id={id}
      className={`purchase-section${primary ? " purchase-primary" : ""}`}
      data-sales-section='purchase'
      data-sales-step={step}
      aria-labelledby={`${id}-title`}
    >
      <div className='container purchase-inner'>
        <div>
          <p className='eyebrow'>PROTOCOLO COMPLETO + 3 BÔNUS</p>
          <h2 id={`${id}-title`}>{title}</h2>
        </div>
        <div className='purchase-action'>
          <PurchaseButton label={label} onUnavailable={onUnavailable} />
          <p>
            <LockKeyhole size={13} />
            Conteúdo digital · Acesso pelo aplicativo
          </p>
        </div>
      </div>
    </section>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className='modal'
      aria-labelledby='modal-title'
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className='modal-heading'>
        <h2 id='modal-title'>{title}</h2>
        <button
          className='icon-button modal-close'
          onClick={onClose}
          aria-label='Fechar janela'
          autoFocus
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export default function App() {
  const [modal, setModal] = useState<"offer" | "privacy" | "terms" | null>(
    null,
  );
  const openOffer = () => setModal("offer");
  return (
    <div id='inicio' className='site-shell'>
      <a className='skip-link' href='#conteudo'>
        Pular para o conteúdo
      </a>
      <main id='conteudo'>
        <section
          className='hero'
          data-sales-section='hero'
          data-sales-step='1'
          aria-labelledby='hero-title'
        >
          <div className='hero-offer-strip'>BAIXE E COMEÇE AINDA HOJE!</div>
          <div className='container hero-inner'>
            <h1 id='hero-title'>
              AUMENTE A SUA TESTOSTERONA ATÉ 10X+ COM A DIETA ESPECIALIZADA
              <span className='headline-second'>
                DO PROTOCOLO
                <span className='headline-accent'> TESTO MAX</span>
              </span>
            </h1>
            <p className='hero-description'>
              <strong>Protocolo Testo Max + 3 bônus.</strong>{" "}
              <span className='eyebrow hero-eyebrow'>
                PARE DE DEIXAR VOCÊ PARA DEPOIS.
              </span>
            </p>
            <HeroBundlePreview />
            <div className='hero-perks'>
              <span>
                <Smartphone size={15} />
                Prático e fácil de usar
              </span>
              <span>
                <Gift size={15} />3 bônus incluídos
              </span>
              <span>
                <Check size={15} />
                Passo a passo diário
              </span>
            </div>
            <PurchaseButton
              label='Quero meu Testo Max agora'
              onUnavailable={openOffer}
            />
          </div>
        </section>

        <ResultsSection />
        <DeliverableSection />
        {/* <DeliverableDetails /> */}
        <TestimonialsSection />
        <BonusesSection />
        <ResultsSection
          id='resultados-novamente'
          step='5'
          title='Veja mais'
          accent='comparações.'
          offset={4}
        />
        <DeliverableDetails repeated />
        <BenefitsSection />
        <InHandSection />
        <TestimonialsSection
          id='depoimentos-experiencia'
          step='5.4'
          start={4}
          end={7}
          featured
        />
        <BonusesSection detailed />
        <PriceSection />
        <PurchaseSection
          id='comprar'
          step='7'
          title='Leve o pacote completo.'
          label='Quero o protocolo + 3 bônus'
          onUnavailable={openOffer}
          primary
        />
        <ResultsSection
          id='resultados-final'
          step='7.1'
          title='Olhe de novo.'
          accent='Compare a diferença.'
          offset={7}
        />
        <TestimonialsSection
          id='depoimentos-final'
          step='7.2'
          start={7}
          end={10}
        />
        <PurchaseSection
          id='comecar-agora'
          step='7.3'
          title='Agora é a sua vez de começar.'
          label='Quero meu Testo Max agora'
          onUnavailable={openOffer}
        />
        <BenefitsSection repeated />
        <PurchaseSection
          id='meu-proximo-passo'
          step='7.5'
          title='Dê o primeiro passo hoje.'
          label='Quero o protocolo + 3 bônus'
          onUnavailable={openOffer}
        />

        <section
          id='duvidas'
          className='faq-section section-space light-section'
          data-sales-section='faq'
          data-sales-step='8'
          aria-labelledby='faq-title'
        >
          <div className='container faq-grid'>
            <SectionHeading
              id='faq-title'
              eyebrow='PERGUNTAS FREQUENTES'
              title='Ficou com'
              accent='alguma dúvida?'
            />
            <div className='faq-list'>
              {questions.map(({ question, answer }, index) => (
                <details key={question}>
                  <summary>
                    <span className='faq-number'>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{question}</span>
                    <ChevronDown size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className='site-footer'>
        <div className='container footer-inner'>
          <span className='footer-brand'>
            PROTOCOLO <strong>TESTO MAX.</strong>
          </span>
          <p>Conteúdo educativo. Resultados individuais variam.</p>
          <div>
            <button onClick={() => setModal("privacy")}>Privacidade</button>
            <button onClick={() => setModal("terms")}>Termos de uso</button>
          </div>
        </div>
      </footer>

      {modal === "offer" && (
        <Modal title='Checkout indisponível' onClose={() => setModal(null)}>
          <p>
            O link de pagamento ainda não está disponível nesta página. Tente
            novamente mais tarde.
          </p>
          <button
            className='button button-primary'
            onClick={() => setModal(null)}
          >
            Entendi <ArrowRight size={19} />
          </button>
        </Modal>
      )}
      {modal === "privacy" && (
        <Modal title='Sua privacidade' onClose={() => setModal(null)}>
          <p>
            Esta página não possui formulário de cadastro, ferramentas de
            análise ou cookies de publicidade próprios.
          </p>
          <p>
            As fontes são fornecidas pelo Google Fonts, que pode receber dados
            técnicos da conexão, como endereço IP. A plataforma de compra,
            quando disponibilizada, terá sua própria política de privacidade.
          </p>
        </Modal>
      )}
      {modal === "terms" && (
        <Modal title='Termos de uso' onClose={() => setModal(null)}>
          <p>
            Esta página apresenta o Protocolo Testo Max. O conteúdo é educativo
            e não oferece diagnóstico, prescrição alimentar ou tratamento
            hormonal.
          </p>
          <p>
            Não há promessa de um nível específico de testosterona ou de
            resultados em determinado prazo. Procure acompanhamento profissional
            para orientações individuais.
          </p>
          <p>
            Preço, acesso e condições de contratação são apresentados na
            plataforma de compra.
          </p>
        </Modal>
      )}
    </div>
  );
}
