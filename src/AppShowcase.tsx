import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowRight, BatteryFull, Signal, Wifi } from "lucide-react";
import { appScreens as screens } from "./app-screens";
import "./AppShowcase.css";

export function AppShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const navigate = (index: number, focus = false) => {
    const next = (index + screens.length) % screens.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const offsets: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    if (event.key in offsets) {
      event.preventDefault();
      navigate(index + offsets[event.key], true);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      navigate(event.key === "Home" ? 0 : screens.length - 1, true);
    }
  };

  return (
    <div className='app-showcase'>
      <div className='app-explorer'>
        <p className='app-explorer-kicker uppercase'>
          Clique em uma das áreas do app para ver mais.
        </p>
        <p className='app-explorer-intro'>
          Escolha uma área.
          <br />
          <strong>Veja o que espera por você.</strong>
        </p>
        <div
          className='app-tabs'
          role='tablist'
          aria-label='Áreas do aplicativo Testo Max'
        >
          {screens.map(({ id, label, icon: Icon, description }, index) => (
            <button
              key={id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type='button'
              role='tab'
              id={`app-tab-${id}`}
              aria-controls={`app-panel-${id}`}
              aria-selected={index === active}
              tabIndex={index === active ? 0 : -1}
              className='app-tab'
              onClick={() => navigate(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <Icon size={21} strokeWidth={1.6} aria-hidden='true' />
              <span>
                <strong>{label}</strong>
                <span>{description}</span>
              </span>
              <ArrowRight
                className='app-tab-arrow'
                size={18}
                aria-hidden='true'
              />
            </button>
          ))}
        </div>
        <p className='app-explorer-note'>
          Seu protocolo, sua alimentação e seus hábitos.
          <br />
          Tudo no mesmo lugar.
        </p>
      </div>

      <div className='app-stage'>
        <div
          className='app-screens'
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3)
              navigate(active + (dx < 0 ? 1 : -1));
          }}
        >
          {screens.map(({ id, title, description, src, alt }, index) => (
            <div
              key={id}
              id={`app-panel-${id}`}
              className='app-screen-panel'
              role='tabpanel'
              aria-labelledby={`app-tab-${id}`}
              tabIndex={0}
              hidden={index !== active}
            >
              <figure>
                <div className='app-phone'>
                  <span
                    className='app-phone-button app-phone-action'
                    aria-hidden='true'
                  />
                  <span
                    className='app-phone-button app-phone-volume-up'
                    aria-hidden='true'
                  />
                  <span
                    className='app-phone-button app-phone-volume-down'
                    aria-hidden='true'
                  />
                  <span
                    className='app-phone-button app-phone-power'
                    aria-hidden='true'
                  />
                  <div className='app-phone-bezel'>
                    <div className='app-phone-display'>
                      <div className='app-phone-status' aria-hidden='true'>
                        <span className='app-phone-time'>9:41</span>
                        <span className='app-phone-island' />
                        <span className='app-phone-indicators'>
                          <Signal />
                          <Wifi />
                          <BatteryFull />
                        </span>
                      </div>
                      <div className='app-phone-content'>
                        <img
                          src={src}
                          alt={alt}
                          width={941}
                          height={1672}
                          loading='lazy'
                          decoding='async'
                          draggable={false}
                        />
                      </div>
                      <div className='app-phone-home' aria-hidden='true'>
                        <span />
                      </div>
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
      </div>
    </div>
  );
}
