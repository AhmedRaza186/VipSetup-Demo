import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { imageSet } from '../../lib/images';
import { addToCart, openCart, useSoldOut } from '../../lib/store';
import { hmmmBurst } from '../../lib/burst';

const FeaturedDish = ({ dish, index, reverse }) => {
  const soldOut = useSoldOut().includes(dish.id);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    // Image reveal
    tl.fromTo(imageRef.current,
      { clipPath: 'inset(15% 15% 15% 15% round 16px)', scale: 1.05, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' }
    );

    // Text reveal
    const textElements = textRef.current.querySelectorAll('.dish-anim');
    tl.fromTo(textElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      "-=1.2"
    );

    // Optional subtle parallax on the image
    gsap.to(imageRef.current.querySelector('img'), {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <div 
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 py-16 lg:py-24`}
      ref={containerRef}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative">
        <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-secondary rounded-3xl -z-10 hidden sm:block opacity-60"></div>
        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl" ref={imageRef}>
          <img 
            {...imageSet(dish.image)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={dish.name} 
            className="w-full h-[120%] object-cover -mt-[10%]" // Extra height for parallax
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-2xl border border-black/5 pointer-events-none"></div>
        </div>
      </div>
      
      {/* Text Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center" ref={textRef}>
        <span className="block text-sm font-poppins font-medium tracking-widest text-text-muted mb-4 dish-anim">
          0{index + 1}
        </span>
        <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-text-main leading-[1.1] mb-6 dish-anim">
          {dish.name}
        </h3>
        <p className="text-lg sm:text-xl text-text-muted font-nunito mb-10 dish-anim max-w-lg leading-relaxed">
          {dish.description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 dish-anim">
          <span className="text-3xl font-poppins font-bold text-brand-red">{dish.price}</span>
          <button
            type="button"
            disabled={soldOut}
            onClick={(e) => {
              hmmmBurst(e.currentTarget);
              addToCart(dish.id);
              setTimeout(openCart, 450); // let the burst land before the drawer slides in
            }}
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-text-main text-lg font-poppins font-semibold rounded-full text-text-main hover:bg-text-main hover:text-white hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main"
          >
            {soldOut ? 'Sold out today' : 'Try It'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDish;
