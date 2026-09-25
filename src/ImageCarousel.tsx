import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { SalesImage } from './media-content';

type Props = {
  id: string;
  images: SalesImage[];
  label: string;
  variant?: 'results' | 'whatsapp';
  autoplay?: boolean;
};

export function ImageCarousel({ id, images, label, variant = 'results', autoplay = false }: Props) {
  const region = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const loopWidth = useRef(0);
  const loopOffset = useRef(0);
  const continuous = autoplay && !reducedMotion && images.length > 1;

  const measure = useCallback(() => {
    const element = track.current;
    if (!element?.firstElementChild) return { step: 1, max: 0 };
    return {
      step: element.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap || '0'),
      max: Math.max(0, element.scrollWidth - element.clientWidth),
    };
  }, []);

  const updateMeasurements = useCallback(() => {
    const { step } = measure();
    loopWidth.current = step * images.length;
  }, [measure, images.length]);

  const go = useCallback((direction: number) => {
    const element = track.current;
    if (!element) return;
    const { step, max } = measure();
    if (continuous) {
      const cycle = step * images.length;
      loopOffset.current = (element.scrollLeft + direction * step + cycle) % cycle;
      element.scrollTo({
        left: loopOffset.current,
        behavior: 'instant',
      });
      return;
    }
    const wraps = direction > 0 ? element.scrollLeft >= max - 2 : element.scrollLeft <= 2;
    const left = direction > 0
      ? (element.scrollLeft >= max - 2 ? 0 : Math.min(max, element.scrollLeft + step))
      : (element.scrollLeft <= 2 ? max : Math.max(0, element.scrollLeft - step));
    element.scrollTo({ left, behavior: reducedMotion || wraps ? 'instant' : 'smooth' });
  }, [measure, reducedMotion, continuous, images.length]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', changePreference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    const resize = new ResizeObserver(updateMeasurements);
    if (track.current) resize.observe(track.current);
    return () => { preference.removeEventListener('change', changePreference); observer.disconnect(); resize.disconnect(); };
  }, [updateMeasurements]);

  useEffect(() => {
    const element = track.current;
    if (!element || !continuous || hovered || focused || touching || !visible) return;

    // Keep fractional pixels between frames so speed is independent of frame rate.
    // The second copy is visually identical at the wrap point: no rewind or gap.
    loopOffset.current = element.scrollLeft;
    let previousTime: number | null = null;
    let frame = 0;
    const animate = (time: number) => {
      const elapsed = previousTime === null ? 0 : Math.min(time - previousTime, 48);
      previousTime = time;
      if (!document.hidden && !document.querySelector('dialog[open]') && loopWidth.current > 0) {
        loopOffset.current = (loopOffset.current + elapsed * 0.038) % loopWidth.current;
        element.scrollLeft = loopOffset.current;
      }
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [continuous, hovered, focused, touching, visible]);

  const renderSlide = (item: SalesImage, index: number, duplicate = false) => {
    return (
      <figure className='carousel-slide' key={`${duplicate ? 'loop-' : ''}${item.id}`}
        role={duplicate ? undefined : 'group'} aria-roledescription={duplicate ? undefined : 'slide'}
        aria-label={duplicate ? undefined : `${index + 1} de ${images.length}`} aria-hidden={duplicate || undefined}
        data-loop-copy={duplicate || undefined}>
        <div className='carousel-image'>
          <img src={item.src} alt={duplicate ? '' : item.alt} width={item.width} height={item.height} loading='lazy' decoding='async' draggable={false} />
        </div>
        {variant === 'results' && <figcaption className='comparison-caption'><span>ANTES</span><ArrowRight size={14} aria-hidden='true' /><span>COM O TESTO MAX</span></figcaption>}
      </figure>
    );
  };

  return (
    <div ref={region} className={`image-carousel carousel-${variant}${continuous ? ' carousel-continuous' : ''}`} role='region' aria-roledescription='carrossel' aria-label={label}
      onPointerEnter={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={() => setFocused(false)}
      onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div ref={track} id={`${id}-track`} className='carousel-track' tabIndex={0}
        onPointerDown={event => { if (event.pointerType === 'touch') setTouching(true); }}
        onPointerUp={() => setTouching(false)} onPointerCancel={() => setTouching(false)}
        aria-label={`${label}. Use as setas do teclado ou deslize para navegar.`}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}>
        {images.map((item, index) => renderSlide(item, index))}
        {continuous && images.map((item, index) => renderSlide(item, index, true))}
      </div>
    </div>
  );
}
