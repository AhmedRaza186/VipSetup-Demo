import { useState, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import MenuCategoryNav from '../ui/MenuCategoryNav';
import MenuItem from '../ui/MenuItem';
import { menuCategories, menuItems } from '../../data/menu';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [displayItems, setDisplayItems] = useState(menuItems.filter(item => item.category === menuCategories[0].id));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const itemsContainerRef = useRef(null);

  // Initial Entrance Animation
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.timeline({ 
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    tl.fromTo(
      '.menu-header-anim',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
    );

    tl.fromTo(
      '.menu-nav-anim',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
  }, { scope: containerRef });

  // Handle Category Switching Animation
  const handleCategorySwitch = (newCategoryId) => {
    if (newCategoryId === activeCategory || isTransitioning) return;

    const nextItems = menuItems.filter(item => item.category === newCategoryId);
    setActiveCategory(newCategoryId);

    if (prefersReducedMotion()) {
      setDisplayItems(nextItems);
      return;
    }

    setIsTransitioning(true);

    const items = itemsContainerRef.current.querySelectorAll('.menu-item-wrapper');
    
    // Animate out
    gsap.to(items, {
      y: -15,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        // Update DOM to new items
        setDisplayItems(nextItems);
        setIsTransitioning(false);
      }
    });
  };

  // Animate items in whenever displayItems updates
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const items = itemsContainerRef.current.querySelectorAll('.menu-item-wrapper');
    if (items.length === 0) return;

    gsap.fromTo(
      items,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
    );
  }, { dependencies: [displayItems], scope: itemsContainerRef });

  return (
    <section id="menu" className="py-24 lg:py-32 bg-primary" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <span className="block text-sm font-poppins font-medium tracking-widest text-brand-red uppercase mb-4 menu-header-anim">
            Our Menu
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-text-main leading-tight mb-6 menu-header-anim">
            Made to make you say HMMMM.
          </h2>
          <p className="text-lg sm:text-xl text-text-muted font-nunito menu-header-anim">
            Discover our carefully curated selection of unapologetic flavors, built from the finest ingredients to give you the ultimate premium experience.
          </p>
        </div>

        {/* Category Nav */}
        <div className="menu-nav-anim">
          <MenuCategoryNav 
            categories={menuCategories} 
            activeCategory={activeCategory} 
            onSelectCategory={handleCategorySwitch} 
          />
        </div>

        {/* Menu Items Grid */}
        <div 
          ref={itemsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 min-h-[500px] mt-8"
        >
          {displayItems.map((item) => (
            <div key={item.id} className="menu-item-wrapper">
              <MenuItem item={item} />
            </div>
          ))}
          {displayItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-text-muted font-nunito text-lg">
              No items available in this category yet.
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Menu;
