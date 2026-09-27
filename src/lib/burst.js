import { gsap, prefersReducedMotion } from './gsap';

const DOT_COLORS = ['#CC252C', '#F4AC1C', '#CC252C', '#F4AC1C', '#171717', '#F4AC1C'];

// Pops a brand "HMMM." with a little confetti from an element — used when adding to the order.
export const hmmmBurst = (el, { color = '#CC252C' } = {}) => {
  if (!el || prefersReducedMotion()) return;

  const r = el.getBoundingClientRect();
  // Keep the burst clear of the screen edges so it never causes sideways scroll.
  const x = Math.min(Math.max(r.left + r.width / 2, 90), window.innerWidth - 90);
  const y = r.top + r.height / 2;

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, { position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 95, pointerEvents: 'none' });
  const origin = document.createElement('div');
  Object.assign(origin.style, { position: 'absolute', left: `${x}px`, top: `${y}px` });
  layer.appendChild(origin);

  const word = document.createElement('span');
  word.textContent = 'HMMM.';
  Object.assign(word.style, {
    position: 'absolute',
    left: 0,
    top: 0,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '2.25rem',
    color,
    whiteSpace: 'nowrap',
    textShadow: '0 4px 18px rgba(204,37,44,0.25)',
  });
  origin.appendChild(word);

  const dots = DOT_COLORS.map((dotColor) => {
    const d = document.createElement('span');
    Object.assign(d.style, { position: 'absolute', left: 0, top: 0, width: '10px', height: '10px', borderRadius: '9999px', background: dotColor });
    origin.appendChild(d);
    return d;
  });

  document.body.appendChild(layer);

  const tl = gsap.timeline({ onComplete: () => layer.remove() });
  tl.fromTo(
    word,
    { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0, rotation: -10 },
    { scale: 1.15, opacity: 1, rotation: -4, y: -50, duration: 0.35, ease: 'back.out(3)' }
  )
    .to(word, { y: -95, opacity: 0, scale: 0.95, duration: 0.55, ease: 'power2.in' }, 0.55);

  dots.forEach((d, i) => {
    const angle = (Math.PI * 2 * i) / dots.length - Math.PI / 2 + gsap.utils.random(-0.4, 0.4);
    const dist = gsap.utils.random(50, 85);
    tl.fromTo(
      d,
      { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0.4, opacity: 1 },
      { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, scale: 1, opacity: 0, duration: 0.7, ease: 'power3.out' },
      0.02
    );
  });
};
