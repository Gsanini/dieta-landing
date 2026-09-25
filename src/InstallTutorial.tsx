import { useState } from "react";
import {
  ArrowRight,
  BatteryFull,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Folder,
  HeartPulse,
  Image,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Plus,
  Settings,
  Share,
  Signal,
  Wifi,
} from "lucide-react";
import { appScreens } from "./app-screens";
import "./InstallTutorial.css";

const steps = [
  {
    title: "Abra o link",
    description:
      "Depois de receber o acesso, abra o link do Testo Max no Safari do iPhone.",
  },
  {
    title: "Adicione à tela",
    description:
      "Toque em Compartilhar, escolha “Adicionar à Tela de Início” e confirme em “Adicionar”.",
  },
  {
    title: "Acesse como app",
    description:
      "O ícone Testo Max aparece junto aos seus outros aplicativos. Toque para abrir.",
  },
];

const homeApps = [
  { name: "Fotos", icon: Image, color: "#f3a3bb" },
  { name: "Câmera", icon: Camera, color: "#8e9bad" },
  { name: "Mapas", icon: MapPin, color: "#72b595" },
  { name: "Música", icon: Music2, color: "#df7188" },
  { name: "Agenda", icon: CalendarDays, color: "#e4a160" },
  { name: "Mail", icon: Mail, color: "#759fd5" },
  { name: "Testo Max", icon: null, color: "#111110" },
  { name: "Saúde", icon: HeartPulse, color: "#df8593" },
  { name: "Relógio", icon: Clock3, color: "#929dac" },
  { name: "Arquivos", icon: Folder, color: "#7c9dce" },
  { name: "Ajustes", icon: Settings, color: "#9099a5" },
  { name: "Safari", icon: Compass, color: "#80b8d9" },
];

function SafariPreview() {
  return (
    <div className='install-safari'>
      <div className='install-site-head'>
        <span className='install-site-brand'>
          <img src='/favicon.svg' alt='' />
          TESTO MAX
        </span>
        <span className='install-site-menu' />
      </div>
      <div className='install-site-content'>
        <span className='install-site-kicker'>SEU ACESSO DIGITAL</span>
        <strong>O protocolo na sua mão.</strong>
        <p>Alimentação, hábitos e progresso em um só lugar.</p>
        <div className='install-site-preview'>
          <img src={appScreens[0].src} alt='' loading='lazy' />
        </div>
        <span className='install-site-cta'>
          ABRIR TESTO MAX <ArrowRight size={12} />
        </span>
      </div>
      <div className='install-safari-toolbar'>
        <span>Link de acesso</span>
        <span className='install-share-cue'>
          <Share size={19} strokeWidth={1.8} />
        </span>
        <span className='install-browser-tabs'>▢</span>
      </div>
    </div>
  );
}

function ShareSheet() {
  return (
    <div className='install-share-sheet'>
      <span className='install-sheet-handle' />
      <div className='install-sheet-title'>Compartilhar</div>
      <div className='install-sheet-link'>
        <img src='/favicon.svg' alt='' />
        <span>
          <strong>Testo Max</strong>
          <small>Link de acesso</small>
        </span>
      </div>
      <div className='install-sheet-action'>
        <span>
          <Plus size={18} />
        </span>
        Adicionar à Tela de Início
        <ChevronRight size={15} />
      </div>
      <div className='install-sheet-confirm'>
        <img src='/favicon.svg' alt='' />
        <span>Testo Max</span>
        <strong>Adicionar</strong>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className='install-home'>
      <div className='install-home-glow' />
      <div className='install-home-date'>
        <span>SEXTA-FEIRA</span>
        <strong>25 setembro</strong>
      </div>
      <div className='install-home-apps'>
        {homeApps.map(({ name, icon: Icon, color }) => (
          <div
            className={`install-home-app${name === "Testo Max" ? " install-home-app-testo" : ""}`}
            key={name}
          >
            <span
              className='install-home-app-icon'
              style={{ backgroundColor: color }}
            >
              {Icon ? (
                <Icon size={25} strokeWidth={1.7} />
              ) : (
                <img src='/favicon.svg' alt='' />
              )}
            </span>
            <small>{name}</small>
          </div>
        ))}
      </div>
      <div className='install-home-dock'>
        <span>
          <Phone size={24} />
        </span>
        <span>
          <MessageCircle size={24} />
        </span>
        <span>
          <Compass size={24} />
        </span>
        <span>
          <Music2 size={24} />
        </span>
      </div>
    </div>
  );
}

export function InstallTutorial() {
  const [active, setActive] = useState(0);

  return (
    <div className='container install-layout'>
      <div className='install-copy'>
        <h2 id='in-hand-title'>
          Do link para a <span>sua tela de início.</span>
        </h2>
        <p className='install-intro'>
          Veja como colocar o Testo Max no celular e deixar o protocolo a um
          toque de distância.
        </p>
        <ol
          className='install-steps'
          aria-label='Passos para adicionar o Testo Max à tela de início'
        >
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type='button'
                className={`install-step${active === index ? " is-active" : ""}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span className='install-step-number'>0{index + 1}</span>
                <span className='install-step-copy'>
                  <strong>{step.title}</strong>
                  <span>{step.description}</span>
                </span>
                {active === index ? (
                  <Check size={18} aria-hidden='true' />
                ) : (
                  <ArrowRight size={18} aria-hidden='true' />
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className='install-demo'>
        <div
          className='install-phone'
          aria-label={`Prévia do passo ${active + 1}: ${steps[active].title}`}
          role='img'
        >
          <div className='install-phone-screen'>
            <div className='install-status' aria-hidden='true'>
              <strong>9:41</strong>
              <span className='install-island' />
              <span className='install-status-icons'>
                <Signal size={12} />
                <Wifi size={13} />
                <BatteryFull size={17} />
              </span>
            </div>
            {active === 2 ? <HomeScreen /> : <SafariPreview />}
            {active === 1 && <ShareSheet />}
            <span className='install-home-indicator' />
          </div>
        </div>
        <button
          className='install-next'
          type='button'
          onClick={() => setActive((active + 1) % steps.length)}
        >
          {active === 2 ? "Ver novamente" : "Próximo passo"}{" "}
          <ArrowRight size={17} aria-hidden='true' />
        </button>
      </div>
    </div>
  );
}
