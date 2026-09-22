import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Flame,
  Leaf,
  Menu,
  Play,
  ShieldCheck,
  Sprout,
  Utensils,
  Volume2,
  X,
} from "lucide-react";
import { getVideoSource, siteConfig } from "./config";
import Reviews from "./Reviews";

const pillars = [
  {
    number: "01",
    icon: Utensils,
    title: "Comida de verdade.",
    text: "Ingredientes que você reconhece. Uma proposta que coloca os alimentos naturais de volta ao centro da mesa.",
    tag: "MENOS RÓTULOS, MAIS NATUREZA",
  },
  {
    number: "02",
    icon: Flame,
    title: "Hábitos com propósito.",
    text: "Um olhar para a rotina como um todo. Alimentação, movimento e descanso com espaço no seu dia a dia.",
    tag: "O ESSENCIAL BEM-FEITO",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Seu ritmo. Sua jornada.",
    text: "Sem atalhos ou promessas milagrosas. Um convite para construir uma relação mais consciente com suas escolhas.",
    tag: "CONSTÂNCIA ACIMA DE PERFEIÇÃO",
  },
];

const questions = [
  {
    question: "O que é a Dieta da Selva?",
    answer:
      "É uma proposta de conteúdo sobre alimentação e hábitos que parte de uma ideia simples: voltar ao essencial. Aqui, comida de verdade e escolhas conscientes ganham espaço em uma rotina possível. A apresentação completa estará disponível em breve.",
  },
  {
    question: "Por que o nome “dieta da testosterona”?",
    answer:
      "O nome faz parte da identidade da proposta e da conversa sobre vitalidade masculina. Não significa que a dieta aumente a testosterona nem substitui avaliação hormonal. Questões hormonais precisam de acompanhamento de um profissional de saúde.",
  },
  {
    question: "Preciso seguir uma dieta restritiva?",
    answer:
      "A proposta apresentada aqui valoriza escolhas conscientes, sem oferecer um cardápio universal. Necessidades e restrições alimentares são individuais; um nutricionista pode ajudar você a encontrar uma abordagem adequada à sua realidade.",
  },
  {
    question: "Como posso conhecer o programa completo?",
    answer:
      "Assista à apresentação nesta página quando ela estiver disponível. Os detalhes do programa, o que está incluído e as condições de acesso serão apresentados antes de qualquer compra.",
  },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href='#inicio'
      aria-label='Dieta da Selva — início'
    >
      <span className='brand-symbol'>
        <Leaf strokeWidth={1.5} />
      </span>
      <span className='brand-name'>
        DIETA DA{" "}
        <strong>
          SELVA<span>.</span>
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
      className={`modal ${video ? "modal-video" : ""}`}
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
        className='modal-close icon-button'
        aria-label='Fechar janela'
        onClick={onClose}
        autoFocus
      >
        <X size={21} />
      </button>
      {children}
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<
    "video" | "offer" | "privacy" | "terms" | null
  >(null);
  const video = getVideoSource(siteConfig.videoUrl);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  function openOffer() {
    if (siteConfig.checkoutUrl) window.location.assign(siteConfig.checkoutUrl);
    else setModal("offer");
  }

  function explore() {
    setModal(null);
    window.setTimeout(
      () =>
        document
          .getElementById("metodo")
          ?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          }),
      0,
    );
  }

  return (
    <>
      <a className='skip-link' href='#conteudo'>
        Pular para o conteúdo
      </a>
      <header className='header' id='inicio'>
        <div className='header-inner'>
          <Brand />
          <nav className='desktop-nav' aria-label='Navegação principal'>
            <a href='#metodo'>A filosofia</a>
            <a href='#pilares'>Os pilares</a>
            <a href='#avaliacoes'>Avaliações</a>
            <a href='#duvidas'>Dúvidas</a>
          </nav>
          <a className='header-cta' href='#apresentacao'>
            Conhecer o método <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButton}
            className='menu-button icon-button'
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls='mobile-nav'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className='mobile-nav'
            id='mobile-nav'
            aria-label='Navegação do celular'
          >
            <a href='#metodo' onClick={() => setMenuOpen(false)}>
              A filosofia <ArrowUpRight size={17} />
            </a>
            <a href='#pilares' onClick={() => setMenuOpen(false)}>
              Os pilares <ArrowUpRight size={17} />
            </a>
            <a href='#duvidas' onClick={() => setMenuOpen(false)}>
              Dúvidas <ArrowUpRight size={17} />
            </a>
            <a href='#avaliacoes' onClick={() => setMenuOpen(false)}>
              Avaliações <ArrowUpRight size={17} />
            </a>
            <a href='#apresentacao' onClick={() => setMenuOpen(false)}>
              Conhecer o método <Play size={15} />
            </a>
          </nav>
        )}
      </header>

      <main id='conteudo'>
        <section className='hero' aria-labelledby='hero-title'>
          <div className='hero-glow' aria-hidden='true' />

          <h1 id='hero-title'>
            Volte à sua natureza.
            <br />
            <span>Desperte a sua força.</span>
          </h1>
          <p className='hero-description'>
            Menos artificial. Mais essencial. Conheça a Dieta da Selva
            <br className='desktop-break' /> e redescubra o valor da comida de
            verdade.
          </p>

          <div className='video-wrap' id='apresentacao'>
            <button
              className='video-poster'
              onClick={() => setModal("video")}
              aria-label='Assistir à apresentação da Dieta da Selva'
            >
              <img
                className='poster-image'
                src={siteConfig.poster}
                alt='Alimentos naturais sobre uma mesa rústica, cercados pelo verde da floresta'
                width='1672'
                height='941'
                fetchPriority='high'
              />
              <span className='poster-shade' />
              <span className='video-top'>
                <span className='video-kicker'>
                  <span className='tiny-leaf'>
                    <Leaf size={14} />
                  </span>{" "}
                  A DIETA DA TESTOSTERONA
                </span>
                <span className='video-quality'>FILME DE APRESENTAÇÃO</span>
              </span>
              <span className='play-group'>
                <span className='play-ring'>
                  <span className='play-button'>
                    <Play size={27} fill='currentColor' strokeWidth={1} />
                  </span>
                </span>
                <span className='play-caption'>
                  O seu próximo passo começa aqui.
                </span>
              </span>
              <span className='video-bottom'>
                <span className='video-title'>
                  A natureza sabe o caminho.
                  <span>Descubra a filosofia da Dieta da Selva.</span>
                </span>
                <span className='video-watch'>
                  ASSISTIR AGORA <ArrowUpRight size={16} />
                </span>
              </span>
            </button>
            <div className='video-helper'>
              <Volume2 size={14} />
              <span>
                Uma nova perspectiva sobre alimentação e estilo de vida.
              </span>
            </div>
          </div>

          <a className='button button-primary hero-cta' href='#metodo'>
            Quero conhecer a Dieta da Selva <ArrowRight size={18} />
          </a>
          <div className='hero-trust'>
            <span>
              <Leaf size={13} /> Comida de verdade
            </span>
            <i />
            <span>
              <ShieldCheck size={14} /> Sem promessas milagrosas
            </span>
          </div>
          <a
            className='scroll-cue'
            href='#metodo'
            aria-label='Explorar a filosofia'
          >
            <span>O ESSENCIAL ESTÁ LOGO ABAIXO</span>
            <ArrowDown size={15} />
          </a>
        </section>

        <section
          className='philosophy section-container'
          id='metodo'
          aria-labelledby='philosophy-title'
        >
          <div className='section-heading'>
            <div>
              <p className='eyebrow section-eyebrow'>
                <span className='small-line' /> SIMPLES POR NATUREZA
              </p>
              <h2 id='philosophy-title'>
                O mundo complicou.
                <br />
                <span>A natureza simplifica.</span>
              </h2>
            </div>
            <p className='section-description'>
              Em meio a tantas regras, tendências e soluções prontas, a nossa
              proposta é um retorno ao essencial. Menos ruído. Mais conexão com
              o que você coloca no prato e na sua vida.
            </p>
          </div>
          <div className='pillars' id='pilares'>
            {pillars.map(({ number, icon: Icon, title, text, tag }) => (
              <article className='pillar' key={number}>
                <div className='pillar-top'>
                  <span className='pillar-icon'>
                    <Icon size={23} strokeWidth={1.5} />
                  </span>
                  <span className='pillar-number'>/{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className='pillar-tag'>{tag}</span>
              </article>
            ))}
          </div>
          <div className='philosophy-note'>
            <Leaf size={15} />
            <p>
              Não é sobre voltar no tempo. É sobre{" "}
              <span>voltar a fazer sentido.</span>
            </p>
          </div>
        </section>

        <Reviews />

        <section
          className='invitation section-container'
          id='comecar'
          aria-labelledby='invitation-title'
        >
          <div className='invitation-art' aria-hidden='true' />
          <div className='invitation-content'>
            <p className='eyebrow section-eyebrow'>
              <span className='status-dot' /> O PRIMEIRO PASSO É SEU
            </p>
            <h2 id='invitation-title'>
              Sua próxima escolha
              <br />
              pode ser <span>mais natural.</span>
            </h2>
            <p>
              Conheça a proposta completa e descubra
              <br className='desktop-break' /> se a Dieta da Selva faz sentido
              para você.
            </p>
            <button className='button button-primary' onClick={openOffer}>
              Quero dar o primeiro passo <ArrowUpRight size={18} />
            </button>
            <span className='invitation-caption'>
              <Check size={13} /> No seu tempo. Do seu jeito.
            </span>
          </div>
          <div className='invitation-seal' aria-hidden='true'>
            <Leaf size={34} strokeWidth={1} />
            <span>MENOS ARTIFICIAL</span>
            <strong>Mais vida.</strong>
            <span>MAIS ESSENCIAL</span>
          </div>
        </section>

        <section
          className='faq section-container'
          id='duvidas'
          aria-labelledby='faq-title'
        >
          <div className='faq-heading'>
            <p className='eyebrow section-eyebrow'>
              <span className='small-line' /> SEM COMPLICAÇÃO
            </p>
            <h2 id='faq-title'>
              Antes de
              <br />
              <span>começar.</span>
            </h2>
            <p>
              Respostas claras para
              <br />
              as suas primeiras dúvidas.
            </p>
          </div>
          <div className='faq-list'>
            {questions.map(({ question, answer }, index) => (
              <details key={question} className='faq-item'>
                <summary>
                  <span className='faq-number'>0{index + 1}</span>
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className='footer section-container'>
        <div className='footer-top'>
          <Brand footer />
          <p>Comida de verdade. Uma vida com mais sentido.</p>
          <a
            href='#inicio'
            className='back-to-top'
            aria-label='Voltar ao início'
          >
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className='footer-bottom'>
          <span>
            © {new Date().getFullYear()} Dieta da Selva. Todos os direitos
            reservados.
          </span>
          <div>
            <button onClick={() => setModal("privacy")}>Privacidade</button>
            <button onClick={() => setModal("terms")}>Termos de uso</button>
          </div>
        </div>
        <p className='health-note'>
          Conteúdo informativo. Não substitui orientação médica ou nutricional
          individualizada. Resultados e necessidades variam de pessoa para
          pessoa.
        </p>
      </footer>

      {modal === "video" && (
        <Modal
          title='Apresentação da Dieta da Selva'
          onClose={() => setModal(null)}
          video={Boolean(video)}
        >
          {video ? (
            video.type === "embed" ? (
              <iframe
                src={video.url}
                title='Apresentação da Dieta da Selva'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
                referrerPolicy='strict-origin-when-cross-origin'
              />
            ) : (
              <video
                src={video.url}
                poster={siteConfig.poster}
                controls
                autoPlay
                playsInline
              >
                <p>Seu navegador não suporta este vídeo.</p>
              </video>
            )
          ) : (
            <div className='coming-soon'>
              <span className='modal-leaf'>
                <Play size={27} strokeWidth={1.5} />
              </span>
              <p className='eyebrow'>EM BREVE</p>
              <h2>
                Uma nova perspectiva.
                <br />
                <span>O mesmo essencial.</span>
              </h2>
              <p>
                A apresentação da Dieta da Selva está sendo preparada. Enquanto
                isso, conheça os pilares da nossa proposta.
              </p>
              <button className='button button-primary' onClick={explore}>
                Explorar a filosofia <ArrowRight size={17} />
              </button>
            </div>
          )}
        </Modal>
      )}
      {modal === "offer" && (
        <Modal title='Programa em breve' onClose={() => setModal(null)}>
          <div className='coming-soon'>
            <span className='modal-leaf'>
              <Sprout size={31} strokeWidth={1.5} />
            </span>
            <p className='eyebrow'>ESTAMOS PREPARANDO O CAMINHO</p>
            <h2>
              O essencial merece
              <br />
              <span>ser bem-feito.</span>
            </h2>
            <p>
              O programa completo estará disponível em breve. Volte a esta
              página para conhecer os detalhes e as condições de acesso.
            </p>
            <button
              className='button button-primary'
              onClick={() => setModal(null)}
            >
              Entendi, volto em breve <Check size={17} />
            </button>
          </div>
        </Modal>
      )}
      {(modal === "privacy" || modal === "terms") && (
        <Modal
          title={modal === "privacy" ? "Privacidade" : "Termos de uso"}
          onClose={() => setModal(null)}
        >
          <div className='legal-content'>
            <p className='eyebrow'>DIETA DA SELVA</p>
            <h2>
              {modal === "privacy" ? "Sua privacidade." : "Termos de uso."}
            </h2>
            {modal === "privacy" ? (
              <>
                <p>
                  Esta versão da página não possui formulários de cadastro,
                  ferramentas de análise ou cookies de publicidade próprios.
                </p>
                <p>
                  As fontes são fornecidas pelo Google Fonts, que pode receber
                  dados técnicos da conexão, como endereço IP. Quando um vídeo
                  externo estiver disponível, o provedor poderá processar dados
                  ao iniciar a reprodução. Links de compra, quando
                  disponibilizados, levarão a uma plataforma com sua própria
                  política de privacidade.
                </p>
                <p>
                  Estas informações serão atualizadas conforme novos recursos
                  forem disponibilizados.
                </p>
              </>
            ) : (
              <>
                <p>
                  Esta página apresenta a proposta da Dieta da Selva e contém
                  material informativo. Não oferece diagnóstico, prescrição
                  alimentar ou tratamento hormonal.
                </p>
                <p>
                  Consulte um profissional de saúde para orientações
                  individuais. O nome “dieta da testosterona” não representa uma
                  promessa de aumento hormonal ou de resultados específicos.
                </p>
                <p>
                  O programa está em preparação. Conteúdo, preço e condições de
                  contratação serão informados quando a oferta estiver
                  disponível. Nenhuma compra é realizada nesta versão da página.
                </p>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
