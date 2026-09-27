# VIP Setup Restaurant Website

A premium restaurant website concept and demo built for VIP Setup. This project focuses heavily on modern editorial design, immersive full-screen food photography, smooth motion transitions, and conversion-focused CTAs designed to drive reservations and orders.

## Features

- **Premium Cinematic Intro Animation**: A butter-smooth loading sequence utilizing GSAP to reveal the brand identity.
- **GSAP-Powered Animations**: Sophisticated scroll-triggered animations spanning the entire application.
- **Lenis Smooth Scrolling**: A native-feeling smooth scroll implementation ensuring high-end motion.
- **Responsive Navigation**: An accessible, sticky header adapting flawlessly to all device sizes.
- **Restaurant Menu with Categories**: A cleanly organized, visual-first menu presentation.
- **Food Photography Integration**: Curated full-bleed, high-resolution imagery showcasing the "HMMM." experience.
- **Brand Story Section**: Authentic, copy-driven storytelling establishing the restaurant's identity.
- **Signature Food Showcase**: Cinematic, parallax-enabled showcases for standout dishes.
- **Founder Section**: An editorial profile dedicated to the man behind the brand.
- **Google Maps Location**: A fully interactive, seamlessly embedded map targeting the exact restaurant coordinates.
- **WhatsApp Ordering CTA**: Direct conversion links routing natively to WhatsApp (`https://wa.me/923062626261`).
- **Final CTA**: High-contrast final conversion hooks.
- **Responsive Design**: Polished layout scaling effortlessly from mobile (320px) to ultra-wide desktop.
- **Reduced-Motion Accessibility Support**: First-class support for `prefers-reduced-motion: reduce`, ensuring accessibility for all users by safely disabling GSAP sequences.

## Tech Stack

This project leverages a cutting-edge front-end stack:

- **React** 
- **Vite**
- **JavaScript**
- **Tailwind CSS v4**
- **GSAP** (GreenSock Animation Platform)
- **@gsap/react**
- **Lenis** (Smooth Scrolling)
- **Google Fonts** (Poppins, Nunito)

## Project Structure

```text
assets-src/               # Full-resolution original photos (not served)
scripts/
└── optimize-images.mjs   # Builds WebP variants into public/images/
public/images/            # Generated, web-sized images (640/1280/1920w WebP) + brand files
src/
├── components/
│   ├── layout/           # Navbar, Footer, Intro, SmoothScroll
│   ├── sections/         # Page sections (Hero, Menu, About, Location, ...)
│   └── ui/               # Button, MenuItem, MenuCategoryNav, FeaturedDish
├── data/
│   ├── menu.js           # Menu categories and items
│   └── site.js           # Contact details, address, hours, WhatsApp link helpers
├── lib/
│   ├── gsap.js           # GSAP plugin registration + prefersReducedMotion()
│   └── images.js         # imageSet() -> { src, srcSet } for generated images
├── App.jsx
├── index.css             # Tailwind v4 theme tokens and base styles
└── main.jsx
```

## Images

Put originals in `assets-src/` (lowercase, hyphenated names), then run:

```bash
npm run images
```

Reference them in code by path without extension, e.g. `imageSet('food/pizza/chicken-tikka')`.

## Demo features

- **Cart → WhatsApp**: add items, adjust quantities, and send one formatted order message.
- **Owner dashboard preview** at `/#admin` (demo PIN `1234`, also linked as "Owner login" in the footer). Sample stats; the sold-out toggles are real and update the menu live in other tabs on the same device (localStorage).
- **Link preview image**: `npm run og` regenerates `public/images/og.jpg`.
- **HMMM burst + pizza spin scene**: add-to-order pops a branded burst; a pinned scroll scene spins the Loaded Supreme (`node scripts/make-spin-image.mjs` rebuilds the cutout).
- **One-page proposal** at `/#proposal`. Edit `src/data/proposal.js` (prices, contact), then `npm run proposal` rebuilds `public/VIP-Setup-Proposal.pdf`.

## Getting Started

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
