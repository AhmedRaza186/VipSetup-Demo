import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { whatsappUrl } from '../../data/site';
import Button from '../ui/Button';

const FinalCTA = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
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
          <Button href={whatsappUrl()} external className="w-full sm:w-auto px-12 py-5 text-xl">
            Order Now
          </Button>
          
          <Button href="#location" variant="outline" className="w-full sm:w-auto px-12 py-5 text-xl">
            Visit Us
          </Button>
        </div>
        
      </div>
    </section>
  );
};

export default FinalCTA;
