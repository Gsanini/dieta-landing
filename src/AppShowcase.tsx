import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, BatteryFull, ChartNoAxesColumnIncreasing, ClipboardCheck, House, Signal, Utensils, Wifi } from 'lucide-react';
import './AppShowcase.css';

const screens = [
  {
    id: 'inicio', label: 'Início', icon: House,
    title: 'Seu dia, organizado.',
    description: 'Hábitos, refeições e tarefas reunidos em uma só tela.',
    src: '/images/imgs-app/ChatGPT Image 24 de set. de 2026, 22_01_53 (1).png',
    alt: 'Tela inicial do Testo Max com protocolo do dia, refeições e acompanhamento dos hábitos.',
  },
  {
    id: 'alimentacao', label: 'Alimentação', icon: Utensils,
    title: 'Do cardápio à lista de compras.',
    description: 'Veja as refeições do dia e organize o que levar do mercado.',
    src: '/images/imgs-app/ChatGPT Image 24 de set. de 2026, 22_01_54 (2).png',
    alt: 'Tela de alimentação do Testo Max com plano de refeições, macronutrientes e lista de mercado.',
  },
  {
    id: 'protocolo', label: 'Protocolo', icon: ClipboardCheck,
    title: 'Saiba qual é o próximo passo.',
    description: 'Consulte a rotina e acompanhe os hábitos que já colocou em prática.',
    src: '/images/imgs-app/ChatGPT Image 24 de set. de 2026, 22_01_54 (3).png',
    alt: 'Tela de protocolos do Testo Max com tarefas diárias, hábitos essenciais e missão do dia.',
  },
  {
    id: 'progresso', label: 'Progresso', icon: ChartNoAxesColumnIncreasing,
    title: 'Veja sua constância ganhar forma.',
    description: 'Acompanhe sua semana, os hábitos concluídos e sua sequência de dias.',
    src: '/images/imgs-app/ChatGPT Image 24 de set. de 2026, 22_01_55 (4).png',
    alt: 'Tela de progresso do Testo Max com sequência de dias, evolução semanal e estatísticas de hábitos.',
  },
];

export function AppShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const navigate = (index: number, focus = false) => {
    const next = (index + screens.length) % screens.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key in offsets) {
      event.preventDefault();
      navigate(index + offsets[event.key], true);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      navigate(event.key === 'Home' ? 0 : screens.length - 1, true);
    }
  };

  return (
    <div className='app-showcase'>
      <div className='app-explorer'>
        <p className='app-explorer-kicker'><span /> EXPLORE POR DENTRO</p>
        <p className='app-explorer-intro'>Escolha uma área.<br /><strong>Veja o que espera por você.</strong></p>
        <div className='app-tabs' role='tablist' aria-label='Áreas do aplicativo Testo Max'>
          {screens.map(({ id, label, icon: Icon, description }, index) => (
            <button
              key={id}
              ref={element => { tabs.current[index] = element; }}
              type='button'
              role='tab'
              id={`app-tab-${id}`}
              aria-controls={`app-panel-${id}`}
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              className='app-tab'
              onClick={() => navigate(index)}
              onKeyDown={event => onTabKeyDown(event, index)}
            >
              <Icon size={21} strokeWidth={1.6} aria-hidden='true' />
              <span><strong>{label}</strong><span>{description}</span></span>
              <ArrowRight className='app-tab-arrow' size={18} aria-hidden='true' />
            </button>
          ))}
        </div>
        <p className='app-explorer-note'>Seu protocolo, sua alimentação e seus hábitos.<br />Tudo no mesmo lugar.</p>
      </div>

      <div className='app-stage'>
        <div
          className='app-screens'
          onTouchStart={event => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={event => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) navigate(active + (dx < 0 ? 1 : -1));
          }}
        >
          {screens.map(({ id, title, description, src, alt }, index) => (
            <div key={id} id={`app-panel-${id}`} className='app-screen-panel' role='tabpanel'
              aria-labelledby={`app-tab-${id}`} tabIndex={0} hidden={index !== active}>
              <figure>
                <div className='app-phone'>
                  <span className='app-phone-button app-phone-action' aria-hidden='true' />
                  <span className='app-phone-button app-phone-volume-up' aria-hidden='true' />
                  <span className='app-phone-button app-phone-volume-down' aria-hidden='true' />
                  <span className='app-phone-button app-phone-power' aria-hidden='true' />
                  <div className='app-phone-bezel'>
                    <div className='app-phone-display'>
                      <div className='app-phone-status' aria-hidden='true'>
                        <span className='app-phone-time'>9:41</span>
                        <span className='app-phone-island' />
                        <span className='app-phone-indicators'>
                          <Signal /><Wifi /><BatteryFull />
                        </span>
                      </div>
                      <div className='app-phone-content'>
                        <img src={src} alt={alt} width={941} height={1672} loading='lazy' decoding='async' draggable={false} />
                      </div>
                      <div className='app-phone-home' aria-hidden='true'><span /></div>
                    </div>
                  </div>
                </div>
                <figcaption className='app-screen-caption'>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
        <div className='app-navigation'>
          <button type='button' onClick={() => navigate(active - 1)} aria-label='Ver tela anterior do aplicativo'><ArrowLeft size={18} /></button>
          <span aria-live='polite' aria-atomic='true'><strong>{String(active + 1).padStart(2, '0')}</strong> / 04</span>
          <button type='button' onClick={() => navigate(active + 1)} aria-label='Ver próxima tela do aplicativo'><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
