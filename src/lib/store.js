import { useSyncExternalStore } from 'react';
import { menuItems } from '../data/menu';
import { whatsappUrl } from '../data/site';

// Tiny external stores (no context needed). Cart and sold-out list persist in localStorage;
// sold-out also syncs across tabs so the admin preview updates an open site tab live.

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable — state still works for this page view.
  }
};

const createStore = (key, initial, { persist = true } = {}) => {
  let state = persist ? read(key, initial) : initial;
  const listeners = new Set();
  const emit = () => listeners.forEach((l) => l());

  if (persist && typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key !== key) return;
      state = read(key, initial);
      emit();
    });
  }

  return {
    get: () => state,
    set: (next) => {
      state = typeof next === 'function' ? next(state) : next;
      if (persist) write(key, state);
      emit();
    },
    subscribe: (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
};

const useStore = (store) => useSyncExternalStore(store.subscribe, store.get, store.get);

/* ---------- Prices ---------- */

export const priceValue = (price) => Number(String(price).replace(/[^\d]/g, ''));
export const formatPrice = (n) => `Rs. ${n.toLocaleString('en-US')}`;

/* ---------- Sold out ---------- */

const soldOutStore = createStore('vipsetup:sold-out', []);

export const useSoldOut = () => useStore(soldOutStore);

export const toggleSoldOut = (id) => {
  soldOutStore.set((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  // Anything that just sold out can't stay in the cart.
  cartStore.set((cart) => {
    if (!(id in cart)) return cart;
    const next = { ...cart };
    delete next[id];
    return next;
  });
};

export const resetSoldOut = () => soldOutStore.set([]);

/* ---------- Cart ---------- */

const cartStore = createStore('vipsetup:cart', {}); // { [itemId]: qty }
const cartOpenStore = createStore('vipsetup:cart-open', false, { persist: false });

export const useCartOpen = () => useStore(cartOpenStore);
export const openCart = () => cartOpenStore.set(true);
export const closeCart = () => cartOpenStore.set(false);

export const setQty = (id, qty) =>
  cartStore.set((cart) => {
    const next = { ...cart };
    if (qty > 0) next[id] = qty;
    else delete next[id];
    return next;
  });

export const addToCart = (id) => setQty(id, (cartStore.get()[id] ?? 0) + 1);
export const clearCart = () => cartStore.set({});

export const useCart = () => {
  const cart = useStore(cartStore);
  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return item && { item, qty, lineTotal: priceValue(item.price) * qty };
    })
    .filter(Boolean);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  return { cart, lines, count, total };
};

export const cartWhatsappUrl = (lines, total) =>
  whatsappUrl(
    [
      "Hi VIP Setup! I'd like to order:",
      '',
      ...lines.map(({ item, qty, lineTotal }) => `${qty} × ${item.name} — ${formatPrice(lineTotal)}`),
      '',
      `Total: ${formatPrice(total)}`,
    ].join('\n')
  );
