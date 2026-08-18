import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Ensure elements are invisible initially if JS loads fast enough, 
    // or we can handle it via CSS if needed. Here we animate from hidden states.
    
    // Image reveal (scale down and fade in)
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05, clipPath: 'inset(10% 10% 10% 10% round 12px)' },
      { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.5, ease: 'power4.out' }
    );

    // Text entrance (staggered fade up)
    const textElements = textRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(
      textElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      "-=1" // overlap with image reveal
    );

  }, { scope: containerRef });

  return (
    <section className="relative bg-primary pt-2 pb-20 lg:pt-6 lg:pb-32 overflow-hidden" id="home" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col order-2 lg:order-1" ref={textRef}>
            <h1 className="sr-only">VIP Setup: HMMMM.</h1>
            
            <div className="overflow-hidden">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-text-main leading-[1.1] tracking-tight hero-anim">
                The kind of food <br className="hidden sm:block" /> that makes you stop <br className="hidden sm:block" /> <span className="text-brand-red">and say it.</span>
              </h2>
            </div>
            
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-text-muted font-nunito max-w-lg leading-relaxed hero-anim">
              Experience unapologetic flavor in a premium setting. Every detail is crafted to perfection to give you that iconic feeling.
            </p>
            
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hero-anim">
              <a 
                href="https://wa.me/923062626261" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 border border-transparent text-base sm:text-lg font-poppins font-semibold rounded-full text-white bg-brand-red hover:bg-[#A81E24] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
              >
                Order Now
              </a>
              <a 
                href="#menu" 
                className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 border-2 border-gray-200 text-base sm:text-lg font-poppins font-semibold rounded-full text-text-main hover:border-gray-900 hover:text-gray-900 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
              >
                Explore Menu
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-4 hidden md:flex hero-anim">
              <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
              <p className="text-sm font-poppins font-medium tracking-widest text-text-muted uppercase">VIP Setup</p>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2">
            <div className="absolute -inset-4 sm:-inset-6 bg-secondary rounded-2xl -z-10 hidden sm:block"></div>
            
            <div className="relative group" ref={imageRef}>
              <img 
                src="/assets/resturant/interior-03.jpg" 
                alt="VIP Setup interior featuring the iconic HMMMM expression" 
                className="w-full h-auto object-cover rounded-xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                loading="eager"
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
