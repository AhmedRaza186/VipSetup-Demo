import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

export default function SmoothScroll({ paused = false, children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      anchors: true,
    });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger stays in sync with the smoothed scroll.
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (paused) {
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [paused]);

  return <>{children}</>;
}
