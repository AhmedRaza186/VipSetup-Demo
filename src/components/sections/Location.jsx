import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { site, whatsappUrl, formatTime, getOpeningStatus } from '../../data/site';
import Button from '../ui/Button';

const Location = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState(() => getOpeningStatus());
  const today = site.hours[status.today];

  // Keep the open/closed badge current if the page stays open across a boundary.
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpeningStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  const mapRef = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
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
                <h3 className="text-xl font-poppins font-semibold text-text-main mb-2">Address</h3>
                <address className="text-lg text-text-muted font-nunito leading-relaxed not-italic">
                  {site.streetAddress && <>{site.streetAddress}<br /></>}
                  {site.city}
                </address>
              </div>

              <div className="location-info">
                <h3 className="text-xl font-poppins font-semibold text-text-main mb-2">Opening Hours</h3>
                <p className="text-lg text-text-muted font-nunito leading-relaxed">
                  <span className="text-text-main font-poppins font-semibold">{today.day}</span>
                  {' · '}
                  {formatTime(today.open)} – {formatTime(today.close)}
                </p>
              </div>

              <div className="location-info">
                <h3 className="text-xl font-poppins font-semibold text-text-main mb-2">Reservations & Orders</h3>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-brand-red font-poppins font-semibold hover:underline"
                >
                  WhatsApp {site.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="location-cta flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
              <Button href={whatsappUrl()} external className="px-8 py-4 text-lg">
                Order on WhatsApp
              </Button>
              <Button href={site.mapsUrl} external variant="outline" className="px-8 py-4 text-lg">
                Open in Google Maps
              </Button>
            </div>
          </div>

          {/* Right: Map Content */}
          <div className="w-full lg:w-7/12 relative order-1 lg:order-2">
            <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-secondary rounded-3xl -z-10 hidden sm:block opacity-60"></div>
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl bg-secondary" ref={mapRef}>
              <iframe
                title="VIP Setup Location Map"
                src={`https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
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
