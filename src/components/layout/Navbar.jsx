import { useState, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import Button from '../ui/Button';

const Navbar = ({ ready = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Location', href: '#location' },
  ];

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const elements = containerRef.current.querySelectorAll('.nav-anim');

    // Hold the hidden state while the intro plays so the entrance is actually seen.
    if (!ready) {
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(elements, { y: -15, opacity: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Navbar container subtle fade in
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Staggered entrance for logo, links, and CTA
    tl.fromTo(
      elements,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.3" // overlap
    );
  }, { scope: containerRef, dependencies: [ready] });

  return (
    <header className="sticky top-0 z-50 w-full bg-primary border-b border-secondary" ref={containerRef}>
      <nav 
        className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-24 lg:h-32 flex items-center justify-between" 
        aria-label="Main navigation"
      >
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center nav-anim">
          <a 
            href="#home" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
            aria-label="VIP Setup Home"
          >
            <img 
              src="/images/brand/logo.png" 
              alt="VIP Setup Logo" 
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="nav-anim font-poppins text-text-main font-medium hover:text-brand-red transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:flex flex-shrink-0 items-center nav-anim">
          <Button href="#menu" className="px-8 py-3 text-sm lg:text-base">
            Order Now
          </Button>
        </div>

        {/* Mobile navigation controls (Menu Trigger & CTA) */}
        <div className="flex md:hidden items-center gap-4 nav-anim">
          <Button href="#menu" className="px-5 py-2 text-sm">
            Order
          </Button>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-text-main hover:text-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
            {isMobileMenuOpen ? (
              <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary border-t border-secondary shadow-sm" id="mobile-menu">
          <div className="px-6 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-lg font-poppins font-medium text-text-main hover:text-brand-red rounded-md transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
