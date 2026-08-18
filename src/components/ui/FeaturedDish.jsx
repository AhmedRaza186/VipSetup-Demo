import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FeaturedDish = ({ dish, index, reverse }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
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
            src={dish.image} 
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
          <a 
            href="https://wa.me/923062626261"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-text-main text-lg font-poppins font-semibold rounded-full text-text-main hover:bg-text-main hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main"
          >
            Try It
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDish;
