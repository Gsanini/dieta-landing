import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  Dumbbell,
  FileText,
  Gift,
  Heart,
  Moon,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  Target,
  Utensils,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { AppShowcase } from "./AppShowcase";
import { beforeAfterImages, whatsappImages } from "./media-content";
import { formatPrice, salesContent } from "./sales-content";
import { siteConfig } from "./config";

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
}: {
  id?: string;
  step?: string;
  title?: string;
  accent?: string;
  offset?: number;
}) {
  const images = [
    ...beforeAfterImages.slice(offset),
    ...beforeAfterImages.slice(0, offset),
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

export function HeroBundlePreview() {
  return (
    <figure className='hero-app-preview'>
      <img
        src='/images/landing/testo-max-app-hero.png'
        alt='Aplicativo Testo Max no notebook e no iPhone, com alimentação, protocolo diário e acompanhamento dos hábitos.'
        width={1672}
        height={941}
        fetchPriority='high'
        loading='eager'
      />
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
          Conheça o Testo Max por dentro. Sua alimentação, seus hábitos e seu
          progresso, direto no aplicativo.
        </SectionHeading>
        <AppShowcase />
        <div className='app-offer-link'>
          <a className='button button-primary' href='#oferta'>
            Quero acessar o Testo Max{" "}
            <ArrowRight size={19} aria-hidden='true' />
          </a>
          <p>Protocolo completo + 3 bônus incluídos.</p>
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
        <SectionHeading
          id={`${id}-title`}
          eyebrow={
            repeated ? "DO CONTEÚDO PARA A ROTINA" : "POR DENTRO DO PROTOCOLO"
          }
          title={repeated ? "Abra. Organize." : "Saiba o que comer."}
          accent={repeated ? "Coloque em prática." : "E por onde começar."}
        />
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
                : "O que dizem"
          }
          accent={
            featured || id === "depoimentos-final"
              ? "Leia estas mensagens."
              : "sobre o Testo Max."
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

export function BonusesSection({ detailed = false }: { detailed?: boolean }) {
  const id = detailed ? "bonus-detalhes" : "bonus";
  return (
    <section
      id={id}
      className={`bonuses-section section-space${detailed ? " light-section" : ""}`}
      data-sales-section={detailed ? "bonus-details" : "bonuses"}
      data-sales-step={detailed ? "5.5" : "4"}
      aria-labelledby={`${id}-title`}
    >
      <div className='container'>
        <SectionHeading
          id={`${id}-title`}
          eyebrow='PARA COMPLETAR O SEU PROTOCOLO'
          title={detailed ? "O protocolo é seu." : "E você ainda leva"}
          accent={detailed ? "Os 3 bônus também." : "estes 3 bônus."}
        />
        <div className='bonus-grid'>
          {salesContent.bonuses.map((bonus, index) => {
            const Icon = bonusIcons[index] ?? Gift;
            return (
              <article className='bonus-card' key={bonus.id}>
                <div
                  className={`bonus-visual bonus-visual-${index + 1}`}
                  aria-hidden='true'
                >
                  <span className='bonus-tag'>BÔNUS 0{index + 1}</span>
                  <Icon size={48} strokeWidth={1.2} />
                  <strong>{bonus.shortTitle}</strong>
                  <span className='bonus-brand'>TESTO MAX</span>
                </div>
                <div className='bonus-body'>
                  <span className='included-tag'>
                    <Check size={12} /> INCLUÍDO NO PACOTE
                  </span>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.description}</p>
                  {detailed && (
                    <ul className='bonus-highlights'>
                      {bonus.highlights.map((highlight) => (
                        <li key={highlight}>
                          <CheckCheck size={16} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className='bonus-format'>
                    <FileText size={14} />
                    {bonus.format}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  {
    icon: Zap,
    title: "Energia no dia a dia.",
    text: "Disposição para trabalhar e aproveitar seu tempo.",
  },
  {
    icon: Dumbbell,
    title: "Vontade de treinar.",
    text: "Movimento voltando a fazer parte da sua semana.",
  },
  {
    icon: Moon,
    title: "Descanso de verdade.",
    text: "Dar ao seu sono a atenção que ele merece.",
  },
  {
    icon: Heart,
    title: "Orgulho de você.",
    text: "Olhar no espelho e reconhecer o seu esforço.",
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
          eyebrow={`SEU OBJETIVO: ${siteConfig.headline.testosterone} DE TESTO`}
          title={repeated ? "Mais disposição." : "É isso que você"}
          accent={repeated ? "Mais orgulho de você." : "quer de volta?"}
          centered
        >
          <p>Seu objetivo começa com as escolhas que você faz todos os dias.</p>
        </SectionHeading>
        <div className='benefit-grid'>
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className='benefit-card' key={title}>
              <span className='benefit-icon'>
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className='section-footnote centered-note'>
          São objetivos de bem-estar, não garantias de resultado ou de um nível
          hormonal específico.
        </p>
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
      <div className='container split-layout'>
        <figure className='in-hand-visual'>
          <img
            src='/images/landing/testo-max-in-hand.webp'
            alt='Mockup ilustrativo de uma mão segurando um celular com a capa do Protocolo Testo Max'
            width='1000'
            height='1250'
            loading='lazy'
            decoding='async'
          />
          <figcaption>Apresentação ilustrativa do material digital.</figcaption>
        </figure>
        <div>
          <SectionHeading
            id='in-hand-title'
            eyebrow='O PROTOCOLO NA SUA MÃO'
            title='Abra no celular.'
            accent='Use na vida real.'
          />
          <p className='body-copy'>
            No mercado, na cozinha ou fora de casa. Consulte o protocolo, o
            cardápio e a lista de compras quando precisar.
          </p>
          <ul className='feature-list'>
            <li>
              <Smartphone />
              <div>
                <strong>Seu protocolo no aplicativo</strong>
                <span>Abra e consulte pelo celular.</span>
              </div>
            </li>
            <li>
              <BookOpen />
              <div>
                <strong>Conteúdo para consultar</strong>
                <span>Volte às orientações no seu ritmo.</span>
              </div>
            </li>
            <li>
              <Gift />
              <div>
                <strong>Os 3 bônus vão junto</strong>
                <span>Cardápio, lista e guia para o dia a dia.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
          eyebrow='TUDO EM UM SÓ PACOTE'
          title='Leve o Testo Max completo.'
          accent='Os 3 bônus vão junto.'
          centered
        />
        <div className='offer-card'>
          <div className='offer-inclusions'>
            <span className='offer-kicker'>
              <Target size={17} /> SEU PACOTE COMPLETO
            </span>
            <h3>Protocolo Testo Max</h3>
            <p>1 protocolo. 3 materiais extras. Tudo no seu pacote.</p>
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
            <span className='offer-badge'>
              <Sparkles size={14} /> PROTOCOLO + 3 BÔNUS
            </span>
            {hasDiscount && (
              <p className='reference-price'>
                De <del>{formatPrice(reference)}</del> por
              </p>
            )}
            {hasPrice ? (
              <>
                <p className='current-price'>{formatPrice(current)}</p>
                {paymentTerms && (
                  <p className='payment-terms'>{paymentTerms}</p>
                )}
                {hasDiscount && (
                  <span className='price-savings'>
                    Economize {formatPrice(reference - current)}
                  </span>
                )}
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
            <div className='offer-digital'>
              <Smartphone size={17} />
              <span>Conteúdo 100% digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
