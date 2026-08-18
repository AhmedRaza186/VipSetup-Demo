import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Location = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  
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

    // Text Reveal Sequence
    tl.fromTo('.location-eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo('.location-headline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    tl.fromTo('.location-info',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      "-=0.6"
    );

    tl.fromTo('.location-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    // Map Container Reveal
    tl.fromTo(mapRef.current,
      { clipPath: 'inset(10% 10% 10% 10% round 16px)', scale: 1.02, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' },
      "-=1.2"
    );

  }, { scope: containerRef });

  const googleMapsUrl = "https://www.google.com/maps/place/Vip+Setup/@24.8842244,67.0689471,17z/data=!4m15!1m8!3m7!1s0x3eb33f00740b4a13:0x15b95fa36d187cd0!2sVip+Setup!8m2!3d24.8840231!4d67.0687897!10e1!16s%2Fg%2F11zck2z2m5!3m5!1s0x3eb33f00740b4a13:0x15b95fa36d187cd0!8m2!3d24.8840231!4d67.0687897!16s%2Fg%2F11zck2z2m5";

  return (
    <section id="location" className="py-24 lg:py-32 bg-primary relative overflow-hidden" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col order-2 lg:order-1 lg:pr-8">
            <span className="block text-sm font-poppins font-medium tracking-widest text-brand-red uppercase mb-6 location-eyebrow">
              Visit Us
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-text-main leading-tight mb-8 location-headline">
              Come find us.
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="location-info">
                <h3 className="text-xl font-poppins font-semibold text-text-main mb-2">Connect & Order</h3>
                <p className="text-lg text-text-muted font-nunito leading-relaxed">
                  Reach out to us directly for reservations, event bookings, and orders.
                </p>
              </div>

              <div className="location-info">
                <h3 className="text-xl font-poppins font-semibold text-text-main mb-2">WhatsApp</h3>
                <p className="text-lg text-brand-red font-poppins font-semibold">
                  0306 2626261
                </p>
              </div>
            </div>

            <div className="location-cta flex flex-col sm:flex-row gap-6">
              <a 
                href="https://wa.me/923062626261"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-poppins font-semibold rounded-full text-white bg-brand-red hover:bg-[#A81E24] transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Order on WhatsApp
              </a>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-text-main text-lg font-poppins font-semibold rounded-full text-text-main hover:bg-text-main hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Right: Map Content */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2">
            <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-secondary rounded-3xl -z-10 hidden sm:block opacity-60"></div>
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl bg-secondary" ref={mapRef}>
              <iframe
                title="VIP Setup Location Map"
                src="https://maps.google.com/maps?q=24.8840231,67.0687897&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              ></iframe>
              <div className="absolute inset-0 rounded-2xl border border-black/5 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;
