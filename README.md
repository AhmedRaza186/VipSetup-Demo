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
- **HTML/CSS**
- **Google Fonts** (Poppins, Nunito)

## Project Structure

The project maintains a strict, scalable React architecture:

```text
src/
├── components/       # UI building blocks
│   ├── layout/       # Global components (Navbar, Footer, Intro, SmoothScroll)
│   ├── motion/       # Reusable GSAP/animation wrappers
│   ├── sections/     # Major page sections (Hero, Menu, About, Location, etc.)
│   └── ui/           # Atomic UI elements (Buttons, Cards, Modals)
├── data/             # Static JSON/JS data files (Menu items, categories)
├── hooks/            # Custom React hooks
├── lib/              # Third-party library configurations
├── pages/            # Top-level route components
├── styles/           # Global styles and Tailwind configuration
├── utils/            # Helper functions
├── App.jsx           # Main application composition
├── App.css           # Base component CSS
├── index.css         # Tailwind directives and base layers
└── main.jsx          # React DOM entry point
```

## Assets

The definitive source of truth for all project assets resides in the `public/assets/` directory.

The major asset categories include:
- `brand`
- `food`
- `resturant`

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
