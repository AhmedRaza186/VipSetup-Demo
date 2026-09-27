import { useState, useSyncExternalStore } from 'react';
import Navbar from './components/layout/Navbar';
import Intro from './components/layout/Intro';
import Hero from './components/sections/Hero';
import PizzaSpin from './components/sections/PizzaSpin';
import Menu from './components/sections/Menu';
import About from './components/sections/About';
import FeaturedFood from './components/sections/FeaturedFood';
import Location from './components/sections/Location';
import Founder from './components/sections/Founder';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';
import Cart from './components/cart/Cart';
import Admin from './components/admin/Admin';
import Proposal from './components/proposal/Proposal';
import { prefersReducedMotion } from './lib/gsap';
import { useCartOpen } from './lib/store';

const subscribeHash = (cb) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};
const getHash = () => window.location.hash;

function Site() {
  const [introFinished, setIntroFinished] = useState(() => prefersReducedMotion()); // intro plays on every load, except under reduced motion
  const cartOpen = useCartOpen();

  return (
    <SmoothScroll paused={!introFinished || cartOpen}>
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar ready={introFinished} />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Hero ready={introFinished} />
          <PizzaSpin />
          <Menu />
          <About />
          <FeaturedFood />
          <Founder />
          <Location />
          <FinalCTA />
        </main>
        <Footer />
      </div>
      <Cart />
    </SmoothScroll>
  );
}

// Concept owner dashboard lives at /#admin, the pitch proposal at /#proposal.
function App() {
  const hash = useSyncExternalStore(subscribeHash, getHash);
  if (hash === '#admin') return <Admin />;
  if (hash === '#proposal') return <Proposal />;
  return <Site />;
}

export default App;
