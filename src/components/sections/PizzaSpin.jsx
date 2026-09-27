import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { menuItems } from '../../data/menu';
import { addToCart, openCart, useSoldOut } from '../../lib/store';
import { hmmmBurst } from '../../lib/burst';

const DISH_ID = 'pp2'; // Loaded Supreme — a centred top-down shot that spins cleanly
const CAPTIONS = ['Hand-stretched dough.', 'Loaded edge to edge.', 'Straight from the oven.'];

// Pinned scroll scene: the pizza spins and grows while captions swap, ending on the dish + add button.
const PizzaSpin = () => {
  const sectionRef = useRef(null);
  const dish = menuItems.find((m) => m.id === DISH_ID);
  const soldOut = useSoldOut().includes(DISH_ID);
  const reduced = prefersReducedMotion();

  useGSAP(() => {
    if (reduced) return;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=220%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo('.spin-pizza', { rotation: -120, scale: 0.45 }, { rotation: 240, scale: 1, duration: 4 }, 0)
      .fromTo('.spin-glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 4 }, 0);

    gsap.utils.toArray('.spin-caption').forEach((el, i) => {
      tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i * 1.1)
        .to(el, { opacity: 0, y: -40, duration: 0.45, ease: 'power2.in' }, i * 1.1 + 0.8);
    });

    tl.fromTo('.spin-final', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 3.4);
  }, { scope: sectionRef });

  if (!dish) return null;

  return (
    <section
      ref={sectionRef}
      aria-label={`${dish.name} showcase`}
      className="relative h-screen min-h-[640px] overflow-hidden bg-text-main text-white"
    >
      {/* Warm glow behind the pizza */}
      <div
        className="spin-glow absolute left-1/2 top-[38%] lg:top-1/2 lg:left-[64%] -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] lg:w-[70vw] lg:h-[70vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,172,28,0.28) 0%, rgba(204,37,44,0.12) 35%, transparent 65%)' }}
        aria-hidden="true"
      ></div>

      <div className="relative h-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 lg:pt-32 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Pizza */}
        <div className="order-1 lg:order-2 w-full lg:w-7/12 flex items-center justify-center">
          <img
            src="/images/spin/loaded-supreme-1200.webp"
            srcSet="/images/spin/loaded-supreme-600.webp 600w, /images/spin/loaded-supreme-1200.webp 1200w"
            sizes="(min-width: 1024px) 40vw, 80vw"
            width="1200"
            height="1200"
            alt={dish.name}
            loading="lazy"
            className="spin-pizza w-[78vw] max-w-[440px] sm:max-w-[520px] lg:max-w-[620px] aspect-square drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)] will-change-transform"
          />
        </div>

        {/* Copy */}
        <div className="order-2 lg:order-1 w-full lg:w-5/12 relative min-h-[220px] lg:min-h-[320px]">
          {reduced ? (
            <ul className="space-y-2 mb-8">
              {CAPTIONS.map((c) => (
                <li key={c} className="text-2xl font-poppins font-semibold text-white/80">{c}</li>
              ))}
            </ul>
          ) : (
            CAPTIONS.map((c) => (
              <p
                key={c}
                className="spin-caption absolute inset-x-0 top-0 lg:top-1/2 lg:-translate-y-1/2 text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold leading-tight opacity-0 text-center lg:text-left"
              >
                {c}
              </p>
            ))
          )}

          <div className={`spin-final text-center lg:text-left ${reduced ? '' : 'absolute inset-x-0 top-0 lg:top-1/2 lg:-translate-y-1/2 opacity-0'}`}>
            <span className="block text-sm font-poppins font-medium tracking-widest text-brand-yellow uppercase mb-4">
              Premium Pizza
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold leading-[1.05]">
              {dish.name}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-white/70 font-nunito">{dish.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-5 sm:gap-8">
              <span className="text-3xl font-poppins font-bold text-brand-yellow">{dish.price}</span>
              <button
                type="button"
                disabled={soldOut}
                onClick={(e) => {
                  hmmmBurst(e.currentTarget, { color: '#F4AC1C' });
                  addToCart(dish.id);
                  setTimeout(openCart, 450);
                }}
                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-brand-red text-white text-lg font-poppins font-semibold shadow-lg hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-text-main focus-visible:ring-white"
              >
                {soldOut ? 'Sold out today' : 'Add to order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaSpin;
