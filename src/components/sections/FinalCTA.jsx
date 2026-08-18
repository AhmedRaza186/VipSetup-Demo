import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FinalCTA = () => {
  const containerRef = useRef(null);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.cta-headline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo('.cta-button',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden border-t border-black/5" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold text-text-main leading-tight mb-12 cta-headline">
          Ready for your <span className="text-brand-red">HMMM?</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto cta-button">
          <a 
            href="https://wa.me/923062626261"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 border border-transparent text-xl font-poppins font-semibold rounded-full text-white bg-brand-red hover:bg-[#A81E24] transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
          >
            Order Now
          </a>
          
          <a 
            href="#location"
            className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 border-2 border-text-main text-xl font-poppins font-semibold rounded-full text-text-main hover:bg-text-main hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main"
          >
            Visit Us
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default FinalCTA;
