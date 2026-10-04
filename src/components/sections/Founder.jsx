import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { imageSet } from '../../lib/images';

const Founder = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    // Text Reveal Sequence
    tl.fromTo('.founder-eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo('.founder-headline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    tl.fromTo('.founder-identity',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    tl.fromTo('.founder-copy',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      "-=0.6"
    );

    // Image Reveal
    tl.fromTo(imageRef.current,
      { clipPath: 'inset(10% 10% 10% 10% round 12px)', scale: 1.03, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0% round 12px)', scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' },
      "-=1.2"
    );

  }, { scope: containerRef });

  return (
    <section id="founder" className="py-24 lg:py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          
          {/* Left: Text Content (Reversed to Right on Desktop) */}
          <div className="w-full lg:w-1/2 flex flex-col lg:pl-8">
            <span className="block text-sm font-poppins font-medium tracking-widest text-brand-red uppercase mb-6 founder-eyebrow">
              Founder
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-text-main leading-[1.15] tracking-tight mb-8 founder-headline">
              The Man Behind the <span className="text-brand-red">HMMM.</span>
            </h2>
            
            <div className="mb-10 founder-identity">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-text-main">Mustafa Hanif</h3>
              <p className="text-sm font-poppins font-medium tracking-wider text-text-muted uppercase mt-1">
                Founder, VIP Setup
              </p>
            </div>
            
            <div className="text-lg sm:text-xl text-text-muted font-nunito leading-relaxed space-y-6">
              <p className="founder-copy">
                For Mustafa, VIP Setup was never just about serving food. It was about creating that exact moment when the noise stops, eyes widen, and the only appropriate reaction is that genuine, undeniable HMMMM.
              </p>
              <p className="founder-copy">
                Driven by an unyielding passion for bold flavor profiles and memorable dining experiences, he built VIP Setup to be a place where every detail—from the crunch of a signature Zingro to the vibrant atmosphere—reflects his love for the brand and the community it serves.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-6 founder-copy">
              <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-brand-red"></div>
            </div>
          </div>

          {/* Right: Image Content (Reversed to Left on Desktop) */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 lg:-inset-8 bg-secondary rounded-3xl -z-10 hidden md:block opacity-50"></div>
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-[90%] mx-auto lg:w-full overflow-hidden rounded-2xl shadow-xl" ref={imageRef}>
              <img 
                {...imageSet('restaurant/mustafa-at-vip-setup02')}
                sizes="(min-width: 1024px) 50vw, 90vw"
                alt="Mustafa Hanif, Founder of VIP Setup" 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl border border-black/5 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Founder;
