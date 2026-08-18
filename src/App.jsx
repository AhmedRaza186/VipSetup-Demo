import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Intro from './components/layout/Intro';
import Hero from './components/sections/Hero';
import Menu from './components/sections/Menu';
import About from './components/sections/About';
import FeaturedFood from './components/sections/FeaturedFood';
import Location from './components/sections/Location';
import Founder from './components/sections/Founder';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/layout/SmoothScroll';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <SmoothScroll>
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Hero />
          <Menu />
          <About />
          <FeaturedFood />
          <Founder />
          <Location />
          <FinalCTA />
      </main>
      <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
