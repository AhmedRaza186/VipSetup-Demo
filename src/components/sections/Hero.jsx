import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { imageSet } from '../../lib/images';
import Button from '../ui/Button';

const heroImage = imageSet('restaurant/interior-03');

const Hero = ({ ready = true }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const textElements = textRef.current.querySelectorAll('.hero-anim');

    // Hold the hidden state while the intro plays so the reveal happens once the curtain opens.
    if (!ready) {
      gsap.set(imageRef.current, { opacity: 0, scale: 1.05, clipPath: 'inset(10% 10% 10% 10% round 12px)' });
      gsap.set(textElements, { y: 30, opacity: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Image reveal (scale down and fade in)
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05, clipPath: 'inset(10% 10% 10% 10% round 12px)' },
      { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.5, ease: 'power4.out' }
    );

    // Text entrance (staggered fade up)
    tl.fromTo(
      textElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      "-=1" // overlap with image reveal
    );

  }, { scope: containerRef, dependencies: [ready] });

  return (
    <section className="relative bg-primary pt-2 pb-20 lg:pt-6 lg:pb-32 overflow-hidden" id="home" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col order-2 lg:order-1" ref={textRef}>
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-text-main leading-[1.1] tracking-tight hero-anim">
                The kind of food <br className="hidden sm:block" /> that makes you stop <br className="hidden sm:block" /> <span className="text-brand-red">and say it.</span>
              </h1>
            </div>

            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-text-muted font-nunito max-w-lg leading-relaxed hero-anim">
              Experience unapologetic flavor in a premium setting. Every detail is crafted to perfection to give you that iconic feeling.
            </p>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hero-anim">
              <Button href="#menu" className="w-full sm:w-auto px-10 py-4 text-base sm:text-lg">
                Order Now
              </Button>
              <a
                href="#location"
                className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 border-2 border-gray-200 text-base sm:text-lg font-poppins font-semibold rounded-full text-text-main hover:border-gray-900 hover:text-gray-900 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
              >
                Find Us
              </a>
            </div>

            <div className="mt-12 hidden md:flex items-center gap-4 hero-anim">
              <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
              <p className="text-sm font-poppins font-medium tracking-widest text-text-muted uppercase">VIP Setup</p>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2">
            <div className="absolute -inset-4 sm:-inset-6 bg-secondary rounded-2xl -z-10 hidden sm:block"></div>

            <div className="relative group" ref={imageRef}>
              <img
                {...heroImage}
                sizes="(min-width: 1024px) 58vw, 100vw"
                width="2730"
                height="1536"
                alt="VIP Setup interior featuring the iconic HMMMM expression"
                className="w-full h-auto object-cover rounded-xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
