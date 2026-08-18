import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const containerRef = useRef(null);
  
  // Use a media query to check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useGSAP(() => {
    if (prefersReducedMotion) return; // Skip complex animations if reduced motion is preferred
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 65%',
      }
    });

    // Eyebrow
    tl.fromTo('.about-eyebrow', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Headline (line by line if possible, or just standard stagger)
    tl.fromTo('.about-headline', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      "-=0.6"
    );

    // Copy
    tl.fromTo('.about-copy', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    // Main Image (clip-path reveal)
    tl.fromTo('.about-image-main',
      { clipPath: 'inset(10% 10% 10% 10% round 12px)', scale: 1.05, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0% round 12px)', scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' },
      "-=0.8"
    );

    // Secondary Image
    tl.fromTo('.about-image-secondary',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=1"
    );

    // Optional Parallax for secondary image (very subtle)
    gsap.to('.about-image-secondary-parallax', {
      yPercent: 12,
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
    <section id="about" className="py-24 lg:py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 xl:gap-32">
          
          {/* Left Side: Images */}
          <div className="w-full lg:w-1/2 relative">
            {/* Background accent block for composition */}
            <div className="absolute -inset-4 lg:-inset-8 bg-secondary rounded-3xl -z-10 hidden md:block opacity-50"></div>
            
            <div className="relative z-10 w-[90%] md:w-[85%] lg:w-[90%] about-image-main">
              <img 
                src="/assets/resturant/interior-02.png" 
                alt="VIP Setup comfortable dining atmosphere" 
                className="w-full h-auto object-cover rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl border border-black/5 pointer-events-none"></div>
            </div>
            
            {/* Secondary offset image */}
            <div className="absolute right-0 bottom-[-10%] lg:bottom-[-20%] w-[50%] lg:w-[55%] z-20 about-image-secondary about-image-secondary-parallax hidden sm:block">
              <div className="p-2 sm:p-3 bg-primary rounded-2xl shadow-2xl">
                <img 
                  src="/assets/resturant/exterior-sitting.png" 
                  alt="VIP Setup exterior sitting area" 
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-8 sm:mt-24 lg:mt-0 lg:pl-4 xl:pl-8">
            <span className="block text-sm font-poppins font-medium tracking-widest text-brand-red uppercase mb-6 about-eyebrow">
              The VIP Setup Experience
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-text-main leading-[1.15] tracking-tight mb-8">
              <span className="block about-headline">Come hungry.</span>
              <span className="block about-headline">Leave saying <span className="text-brand-red">HMMMM.</span></span>
            </h2>
            
            <div className="text-lg sm:text-xl text-text-muted font-nunito leading-relaxed space-y-6">
              <p className="about-copy">
                Good food has a way of becoming a moment. A table, a conversation, that first bite — and that little pause before someone says it.
              </p>
              <p className="about-copy">
                We obsess over every detail, from the crispness of our crust to the balance in our signature sauces, so you can just sit back and experience the flavor. It's not just a meal; it's a feeling.
              </p>
            </div>
            
            {/* Brand Accent */}
            <div className="mt-12 flex items-center gap-6 about-copy">
              <div className="w-16 h-1 bg-brand-yellow rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-brand-red"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
