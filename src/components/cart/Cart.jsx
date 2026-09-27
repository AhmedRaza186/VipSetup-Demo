import { useEffect, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap';
import { imageUrl } from '../../lib/images';
import {
  useCart, useCartOpen, openCart, closeCart, setQty, clearCart, formatPrice, cartWhatsappUrl,
} from '../../lib/store';
import QtyStepper from '../ui/QtyStepper';

const CartButton = ({ count, total }) => {
  const ref = useRef(null);
  const firstRun = useRef(true);

  // Slide in on first appearance, then give a little bounce every time the count changes.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (firstRun.current) {
      firstRun.current = false;
      gsap.fromTo(ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
    } else {
      gsap.fromTo(ref.current, { scale: 1 }, { scale: 1.12, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' });
    }
  }, { dependencies: [count] });

  return (
  <button
    ref={ref}
    type="button"
    onClick={openCart}
    className="fixed z-40 bottom-5 right-5 sm:bottom-8 sm:right-8 inline-flex items-center gap-3 pl-5 pr-6 py-4 rounded-full bg-brand-red text-white font-poppins font-semibold shadow-2xl hover:bg-brand-red-dark hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
    aria-label={`View order: ${count} items, ${formatPrice(total)}`}
  >
    <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-white text-brand-red text-sm">
      {count}
    </span>
    <span>View order</span>
    <span className="hidden sm:inline text-white/80">· {formatPrice(total)}</span>
  </button>
  );
};

const CartDrawer = ({ lines, count, total }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeCart} aria-hidden="true"></div>

      <aside className="absolute inset-y-0 right-0 w-full sm:max-w-md bg-primary shadow-2xl flex flex-col animate-[cart-in_300ms_ease-out]">
        <header className="flex items-center justify-between px-6 py-5 border-b border-secondary">
          <h2 id="cart-title" className="text-2xl font-poppins font-bold text-text-main">
            Your order <span className="text-text-muted font-medium text-lg">({count})</span>
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="p-2 rounded-full text-text-main hover:text-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            aria-label="Close order"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-2xl font-poppins font-bold text-text-main">Nothing here yet.</p>
            <p className="text-text-muted font-nunito">Add something that makes you say HMMM.</p>
            <a
              href="#menu"
              onClick={closeCart}
              className="mt-2 font-poppins font-semibold text-brand-red hover:underline"
            >
              Browse the menu
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-secondary" data-lenis-prevent>
              {lines.map(({ item, qty, lineTotal }) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <img
                    src={imageUrl(item.image)}
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between gap-3">
                      <p className="font-poppins font-semibold text-text-main leading-tight">{item.name}</p>
                      <p className="font-poppins font-semibold text-text-main whitespace-nowrap">{formatPrice(lineTotal)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-text-muted font-nunito">{item.price} each</span>
                      <QtyStepper qty={qty} onChange={(n) => setQty(item.id, n)} name={item.name} size="sm" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="px-6 pt-5 pb-6 border-t border-secondary bg-secondary/60">
              <div className="flex justify-between items-baseline">
                <span className="font-poppins font-medium text-text-main">Total</span>
                <span className="text-2xl font-poppins font-bold text-brand-red">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-sm text-text-muted font-nunito">Delivery charges confirmed on WhatsApp.</p>

              <a
                href={cartWhatsappUrl(lines, total)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-brand-red text-white text-lg font-poppins font-semibold hover:bg-brand-red-dark shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.28 11.28 0 0 0 12.05.71C5.8.71.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.72-1.5a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
                </svg>
                Send order on WhatsApp
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full py-2 text-sm font-poppins font-medium text-text-muted hover:text-brand-red transition-colors"
              >
                Clear order
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

const Cart = () => {
  const { lines, count, total } = useCart();
  const isOpen = useCartOpen();

  return (
    <>
      {count > 0 && !isOpen && <CartButton count={count} total={total} />}
      {isOpen && <CartDrawer lines={lines} count={count} total={total} />}
    </>
  );
};

export default Cart;
