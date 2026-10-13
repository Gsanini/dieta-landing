import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Gift,
  Heart,
  ShoppingBasket,
  Smartphone,
  Target,
  Utensils,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { AppShowcase } from "./AppShowcase";
import { InstallTutorial } from "./InstallTutorial";
import { appScreens } from "./app-screens";
import {
  beforeAfterImages,
  newBeforeAfterImages,
  whatsappImages,
} from "./media-content";
import { formatPrice, salesContent } from "./sales-content";
import { siteConfig } from "./config";

const firstResultsImages = beforeAfterImages.slice(0, -3);
const bonusResultsImages = newBeforeAfterImages.slice(0, -3);
const finalResultsImages = [
  ...beforeAfterImages.slice(-3),
  ...newBeforeAfterImages.slice(-3),
];

export function SectionHeading({
  id,
  title,
  accent,
  children,
  centered = true,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " heading-centered" : ""}`}>
      <div>
        <h2 id={id}>
          {title}
          {accent && (
            <>
              <br />
              <span>{accent}</span>
            </>
          )}
        </h2>
      </div>
      {children && <div className='section-intro'>{children}</div>}
    </div>
  );
}

export function ResultsSection({
  id = "resultados",
  step = "2",
  title = "Veja o resultado de quem seguiu",
  accent = "o protocolo Testo Max.",
  offset = 0,
  images: suppliedImages = firstResultsImages,
}: {
  id?: string;
  step?: string;
  title?: string;
  accent?: string;
  offset?: number;
  images?: typeof beforeAfterImages;
}) {
  const images = [
    ...suppliedImages.slice(offset),
    ...suppliedImages.slice(0, offset),
  ];
  return (
    <section
      id={id}
      className='results-section section-space'
      data-sales-section='results'
      data-sales-step={step}
      aria-labelledby={`${id}-title`}
    >
      <div className='container'>
        <SectionHeading
          id={`${id}-title`}
          eyebrow='ANTES / COM O TESTO MAX'
          title={title}
          accent={accent}
        />
        <ImageCarousel
          id={id}
          images={images}
          label='Comparações: antes e com o Testo Max'
          autoplay
        />
      </div>
    </section>
  );
}

export function HeroBundlePreview({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`hero-app-preview${compact ? " offer-product-preview" : ""}`}
    >
      <div className='hero-device hero-device-macbook'>
        <img
          src='/images/landing/testo-max-hero-macbook.webp'
          alt=''
          width={1460}
          height={954}
          fetchPriority={compact ? undefined : "high"}
          loading={compact ? "lazy" : "eager"}
          decoding='async'
          draggable={false}
        />
        <div className='hero-macbook-screen'>
          <img
            src='/images/imgs-app/testo-max-inicio-desktop-v2.webp'
            alt='Tela inicial do Testo Max adaptada para desktop, com protocolo diário, plano alimentar, progresso e lista de mercado. Exibida no MacBook.'
            width={1672}
            height={941}
            loading={compact ? "lazy" : "eager"}
            decoding='async'
            draggable={false}
          />
        </div>
      </div>
      <div className='hero-device hero-device-iphone'>
        <img
          src='/images/landing/testo-max-hero-iphone.webp'
          alt=''
          width={640}
          height={1284}
          loading={compact ? "lazy" : "eager"}
          decoding='async'
          draggable={false}
        />
        <div className='hero-iphone-screen'>
          <img
            src={appScreens[1].src}
            alt={`${appScreens[1].alt} Exibida no iPhone.`}
            width={941}
            height={1672}
            loading={compact ? "lazy" : "eager"}
            decoding='async'
            draggable={false}
          />
        </div>
      </div>
    </figure>
  );
}

export function ProductMockup() {
  return (
    <div
      className='product-scene'
      aria-label='Apresentação ilustrativa do Protocolo Testo Max em formato digital'
      role='img'
    >
      <div className='product-back-card' aria-hidden='true'>
        <span>
          SEU NOVO
          <br />
          PONTO DE PARTIDA.
        </span>
        <span>ALIMENTAÇÃO · HÁBITOS · ROTINA</span>
      </div>
      <div className='product-device' aria-hidden='true'>
        <div className='device-camera' />
        <div className='device-content'>
          <span className='device-kicker'>PROTOCOLO</span>
          <strong className='device-wordmark'>
            TESTO
            <br />
            <span>MAX.</span>
          </strong>
          <span className='device-subtitle'>O ESSENCIAL. BEM FEITO.</span>
          <img
            src={siteConfig.foodImage}
            alt=''
            width='1536'
            height='1024'
            loading='lazy'
          />
          <div className='device-bottom'>
            <span>ALIMENTAÇÃO E HÁBITOS</span>
            <ArrowRight size={17} />
          </div>
        </div>
      </div>
      <span className='product-access'>
        <Smartphone size={19} />
        <span>
          Seu protocolo.
          <br />
          <strong>Sempre com você.</strong>
        </span>
      </span>
    </div>
  );
}

export function DeliverableSection() {
  return (
    <section
      id='protocolo'
      className='deliverable-section app-deliverable section-space'
      data-sales-section='deliverable'
      data-sales-step='3'
      aria-labelledby='protocol-title'
    >
      <div className='container'>
        <SectionHeading
          id='protocol-title'
          eyebrow='O QUE VOCÊ RECEBE'
          title='O protocolo completo.'
          accent='Na sua mão.'
        >
          Conheça o TESTO MAX e o tudo que ele te oferece. Sua alimentação, seus
          hábitos e seu progresso, direto no aplicativo.
        </SectionHeading>
        <AppShowcase />
        <div className='app-offer-link'>
          <a className='button button-primary' href='#oferta'>
            Quero acessar o Testo Max{" "}
            <ArrowRight size={19} aria-hidden='true' />
          </a>
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: Utensils,
    title: "Monte seu prato.",
    text: "Conheça os alimentos e use os modelos de refeições.",
  },
  {
    icon: Activity,
    title: "Cuide da sua rotina.",
    text: "Alimentação, movimento e descanso no mesmo protocolo.",
  },
  {
    icon: CalendarDays,
    title: "Planeje sua semana.",
    text: "Consulte o cardápio e leve a lista para o mercado.",
  },
];

export function DeliverableDetails({
  repeated = false,
}: {
  repeated?: boolean;
}) {
  const id = repeated ? "detalhes-na-pratica" : "detalhes";
  return (
    <section
      id={id}
      className={`details-section section-space${repeated ? "" : " light-section"}`}
      data-sales-section='deliverable-details'
      data-sales-step={repeated ? "5.1" : "3.1"}
      aria-labelledby={`${id}-title`}
    >
      <div className='container'>
        {repeated ? (
          <div className='steps-grid'>
            {[
              [
                "01",
                "Acesse o aplicativo.",
                "Comece pelo conteúdo do protocolo.",
              ],
              [
                "02",
                "Organize sua semana.",
                "Escolha as refeições e prepare sua lista.",
              ],
              [
                "03",
                "Use todos os dias.",
                "Consulte os materiais e aplique na sua rotina.",
              ],
            ].map(([number, title, text]) => (
              <article className='step-card' key={number}>
                <span className='step-number'>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className='pillars-grid'>
              {pillars.map(({ icon: Icon, title, text }, index) => (
                <article className='pillar-card' key={title}>
                  <div className='pillar-top'>
                    <Icon size={26} strokeWidth={1.4} />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className='food-ribbon'>
              <img
                src={siteConfig.foodImage}
                alt='Carne, ovos, abacate e frutas'
                width='1536'
                height='1024'
                loading='lazy'
              />
              <div>
                <p className='eyebrow'>COM OS ALIMENTOS CERTOS</p>
                <h3>
                  O básico começa
                  <br />
                  no seu prato.
                </h3>
                <p>Carnes · Ovos · Gorduras naturais · Frutas</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function TestimonialsSection({
  id = "depoimentos",
  step = "3.2",
  start = 0,
  end = 4,
  featured = false,
}: {
  id?: string;
  step?: string;
  start?: number;
  end?: number;
  featured?: boolean;
}) {
  return (
    <section
      id={id}
      className={`testimonials-section section-space${featured ? " testimonials-featured" : ""}`}
      data-sales-section='testimonials'
      data-sales-step={step}
      aria-labelledby={`${id}-title`}
    >
      <div className='container'>
        <SectionHeading
          id={`${id}-title`}
          eyebrow='CONVERSAS NO WHATSAPP'
          title={
            featured
              ? "E tem mais."
              : id === "depoimentos-final"
                ? "Ainda em dúvida?"
                : "Relatos de quem usou"
          }
          accent={
            featured || id === "depoimentos-final"
              ? "Leia estas mensagens."
              : "e aprovou."
          }
        />
        <ImageCarousel
          id={id}
          images={whatsappImages.slice(start, end)}
          label='Prints de depoimentos no WhatsApp'
          variant='whatsapp'
          autoplay
        />
      </div>
    </section>
  );
}

const bonusIcons = [CalendarDays, ShoppingBasket, UtensilsCrossed];
const bonusSteps = [
  "Planeje suas refeições",
  "Organize suas compras",
  "Adapte à vida real",
];

export function BonusesSection() {
  return (
    <section
      id='bonus'
      className='bonuses-section section-space'
      data-sales-section='bonuses'
      data-sales-step='4'
      aria-labelledby='bonus-title'
    >
      <div className='container'>
        <SectionHeading
          id='bonus-title'
          eyebrow='TUDO NO MESMO PACOTE'
          title='O protocolo é o seu plano.'
          accent='Os bônus facilitam a prática.'
        >
          Você recebe o Testo Max completo no aplicativo e mais 3 materiais para
          planejar, comprar e manter a rotina.
        </SectionHeading>

        <p className='bonus-list-label'>
          MAIS 3 BÔNUS PARA USAR JUNTO COM O PROTOCOLO
        </p>
        <div className='bonus-grid'>
          {salesContent.bonuses.map((bonus, index) => {
            const Icon = bonusIcons[index] ?? Gift;
            return (
              <article className='bonus-card' key={bonus.id}>
                <div className='bonus-card-top'>
                  <span className='bonus-number'>0{index + 1}</span>
                  <Icon size={23} strokeWidth={1.6} aria-hidden='true' />
                </div>
                <span className='bonus-step'>{bonusSteps[index]}</span>
                <h3>{bonus.title}</h3>
                <p>{bonus.description}</p>
              </article>
            );
          })}
        </div>
        <p className='bonus-inclusion'>
          <Check size={17} aria-hidden='true' /> Os 3 bônus já estão incluídos
          no acesso ao protocolo.
        </p>
      </div>
    </section>
  );
}

export function BonusResultsSection() {
  return (
    <ResultsSection
      id='mais-resultados'
      step='4.5'
      title='Seja você o próximo a inspirar.'
      accent='Comece hoje com o protocolo Testo Max.'
      images={bonusResultsImages}
    />
  );
}

export function FinalResultsSection() {
  return (
    <ResultsSection
      id='resultados-finais'
      step='7.7'
      title='Mais resultados com'
      accent='o protocolo Testo Max.'
      images={finalResultsImages}
    />
  );
}

const benefits = [
  {
    icon: Zap,
    kicker: "TESTOSTERONA",
    title: "Pare de funcionar no modo fraco.",
    text: "Use alimentação, treino e sono para favorecer o aumento natural da testosterona — a base para mais energia, impulso e presença.",
  },
  {
    icon: Dumbbell,
    kicker: "FORÇA",
    title: "Volte a ocupar espaço.",
    text: "Construa um corpo mais forte e uma postura que mostra disciplina antes mesmo de você abrir a boca.",
  },
  {
    icon: Heart,
    kicker: "CONFIANÇA",
    title: "Recupere sua presença masculina.",
    text: "Saia da apatia e volte a sentir iniciativa, desejo e orgulho do homem que está construindo.",
  },
  {
    icon: Target,
    kicker: "CONTROLE",
    title: "Cumpra o que promete a si mesmo.",
    text: "Assuma o comando da sua rotina. Homem disciplinado não depende de motivação para fazer o que precisa ser feito.",
  },
];

export function BenefitsSection({ repeated = false }: { repeated?: boolean }) {
  const id = repeated ? "seu-proximo-capitulo" : "alem-do-numero";
  return (
    <section
      id={id}
      className={`benefits-section section-space${repeated ? " benefits-final" : ""}`}
      data-sales-section='benefits'
      data-sales-step={repeated ? "7.4" : "5.2"}
      aria-labelledby={`${id}-title`}
    >
      <div className='container'>
        <SectionHeading
          id={`${id}-title`}
          eyebrow='NÃO SE ACOSTUME COM UMA VERSÃO MENOR DE VOCÊ'
          title={repeated ? "Mais testosterona." : "Eleve sua testosterona."}
          accent={repeated ? "Mais força. Mais presença." : "Volte a comandar."}
          centered
        >
          <p>
            Seu corpo responde ao que você repete. Alimente, treine e descanse
            para favorecer o aumento natural da testosterona e recuperar sua
            energia, sua confiança e sua presença.
          </p>
        </SectionHeading>
        <div className='benefit-grid'>
          {benefits.map(({ icon: Icon, kicker, title, text }, index) => (
            <article className='benefit-card' key={title}>
              <div className='benefit-card-top'>
                <span className='benefit-icon'>
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <span className='benefit-number'>0{index + 1}</span>
              </div>
              <span className='benefit-kicker'>{kicker}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InHandSection() {
  return (
    <section
      id='na-sua-mao'
      className='in-hand-section section-space'
      data-sales-section='deliverable-in-hand'
      data-sales-step='5.3'
      aria-labelledby='in-hand-title'
    >
      <InstallTutorial />
    </section>
  );
}

export function PriceSection() {
  const { reference, current, paymentTerms } = salesContent.price;
  const hasPrice = current !== null;
  const hasDiscount = hasPrice && reference !== null && reference > current;
  return (
    <section
      id='oferta'
      className='price-section section-space'
      data-sales-section='price'
      data-sales-step='6'
      aria-labelledby='price-title'
    >
      <div className='container'>
        <SectionHeading
          id='price-title'
          eyebrow='CONDIÇÃO ESPECIAL'
          title='Tudo o que você precisa.'
          accent='Por muito menos, agora.'
          centered
        />
        <div className='offer-card'>
          <div className='offer-inclusions'>
            <h3>Protocolo Testo Max</h3>

            <ul>
              <li>
                <Check />
                <span>Protocolo completo no aplicativo</span>
                <span className='offer-item-tag'>PRINCIPAL</span>
              </li>
              {salesContent.bonuses.map((bonus, index) => (
                <li key={bonus.id}>
                  <Check />
                  <span>{bonus.title}</span>
                  <span className='offer-item-tag'>BÔNUS 0{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='offer-price'>
            <HeroBundlePreview compact />
            <span className='offer-limited'>
              <Clock3 size={15} aria-hidden='true' /> PREÇO POR TEMPO LIMITADO
            </span>

            {hasDiscount && (
              <p className='reference-price'>
                De <del>{formatPrice(reference)}</del>
              </p>
            )}
            {hasPrice ? (
              <>
                <p className='current-price'>
                  <span>HOJE POR</span>
                  <strong>{formatPrice(current)}</strong>
                </p>
                {paymentTerms && (
                  <p className='payment-terms'>{paymentTerms}</p>
                )}
                {hasDiscount && (
                  <a
                    className='price-savings'
                    href={siteConfig.checkoutUrl || "#comprar"}
                    aria-label={`Economize ${formatPrice(reference - current)} e compre o Protocolo Testo Max`}
                    data-checkout
                  >
                    ECONOMIZE {formatPrice(reference - current)}
                    <ArrowRight size={15} aria-hidden='true' />
                  </a>
                )}
                <p className='offer-limited-copy'>
                  Garanta essa condição antes que o preço volte ao valor normal.
                </p>
              </>
            ) : (
              <>
                <h3>
                  Seu Testo Max.
                  <br />
                  <span>Tudo incluído.</span>
                </h3>
                <p className='payment-terms'>
                  Confira o valor e as condições
                  <br />
                  na página de compra.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
