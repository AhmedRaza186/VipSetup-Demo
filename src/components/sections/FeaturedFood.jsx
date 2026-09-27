import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import FeaturedDish from '../ui/FeaturedDish';
import { menuItems } from '../../data/menu';

const FeaturedFood = () => {
  const containerRef = useRef(null);
  
  // Select 3 signature dishes for the showcase from existing menu data
  const signatureItemIds = ['pp4', 'b3', 'gb2']; // VIP Special Sriracha, VIP Special Zingro, Cheese Garlic Bread
  const signatureDishes = signatureItemIds.map(id => menuItems.find(item => item.id === id)).filter(Boolean);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.featured-eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo('.featured-headline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      "-=0.6"
    );

  }, { scope: containerRef });

  return (
    <section id="featured" className="py-24 lg:py-32 bg-primary overflow-hidden" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Intro */}
        <div className="mb-16 lg:mb-24 text-center max-w-3xl mx-auto">
          <span className="block text-sm font-poppins font-medium tracking-widest text-brand-red uppercase mb-6 featured-eyebrow">
            Signature Picks
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-text-main leading-tight featured-headline">
            The ones worth saying <br className="hidden sm:block" /> <span className="text-brand-red">HMMMM</span> for.
          </h2>
        </div>

        {/* Featured Dishes Sequence */}
        <div className="flex flex-col gap-8 lg:gap-0">
          {signatureDishes.map((dish, index) => (
            <FeaturedDish 
              key={dish.id} 
              dish={dish} 
              index={index} 
              reverse={index % 2 !== 0} // Alternate layout (image left, image right)
            />
          ))}
        </div>
        
        {/* Decorative divider at the end of the showcase */}
        <div className="mt-20 lg:mt-32 flex justify-center opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-red mx-4"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-red"></div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFood;
