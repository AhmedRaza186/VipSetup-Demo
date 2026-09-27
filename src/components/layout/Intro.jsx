import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

// Only mounted when the intro should play (see App.jsx), so no reduced-motion branch is needed here.
const Intro = ({ onComplete }) => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const logoRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete,
      defaults: { ease: 'power3.out' }
    });

    // 0.0s - 1.0s: Large Logo reveals cleanly and slowly
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
      0
    );

    // 0.8s - 1.5s: Brand signature 'HMMM.' appears
    tl.fromTo([leftTextRef.current, rightTextRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.8
    );

    // 1.8s - 2.2s: Logo fades out elegantly before the curtain splits
    tl.to(logoRef.current,
      { opacity: 0, duration: 0.4, ease: 'power2.inOut' },
      1.8
    );

    // 2.2s - 3.0s: The Cinematic Center Split
    const splitDuration = 0.8;
    const splitEase = 'power4.inOut';

    // Text splits apart
    tl.to(leftTextRef.current,
      { x: -window.innerWidth / 2 - 100, opacity: 0, duration: splitDuration, ease: splitEase },
      2.2
    );
    tl.to(rightTextRef.current,
      { x: window.innerWidth / 2 + 100, opacity: 0, duration: splitDuration, ease: splitEase },
      2.2
    );

    // Curtains open from the center
    tl.to(leftPanelRef.current,
      { xPercent: -100, duration: splitDuration, ease: splitEase },
      2.2
    );
    tl.to(rightPanelRef.current,
      { xPercent: 100, duration: splitDuration, ease: splitEase },
      2.2
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto overflow-hidden"
      aria-hidden="true"
    >
      {/* Cinematic Curtains */}
      <div ref={leftPanelRef} className="absolute inset-y-0 left-0 w-1/2 bg-primary"></div>
      <div ref={rightPanelRef} className="absolute inset-y-0 right-0 w-1/2 bg-primary"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">

        {/* Authentic Large Logo */}
        <div ref={logoRef} className="opacity-0">
          <img
            src="/images/brand/logo.png"
            alt="VIP Setup Logo"
            className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Splittable Brand Signature */}
        <div className="mt-12 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-poppins font-bold tracking-[0.2em] text-brand-red uppercase">
          <span ref={leftTextRef} className="opacity-0 inline-block">HM</span>
          <span ref={rightTextRef} className="opacity-0 inline-block">MM.</span>
        </div>

      </div>
    </div>
  );
};

export default Intro;
