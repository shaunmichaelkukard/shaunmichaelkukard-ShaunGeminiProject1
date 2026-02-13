
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import BrandStrategy from './components/BrandStrategy';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LiveChatWidget from './components/LiveChatWidget';
import AdminHub from './components/AdminHub';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'admin'>('landing');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [portfolioItems, setPortfolioItems] = useState(() => {
    const saved = localStorage.getItem('legends_portfolio');
    const defaultItems = [
      { 
        id: 1, 
        isVideo: true, 
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', 
        title: 'The Industrial Glass House' 
      },
      { 
        id: 2, 
        isVideo: false, 
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200', 
        title: 'Campaign: Midnight Skyline' 
      },
      { 
        id: 3, 
        isVideo: true, 
        videoUrl: 'https://vimeo.com/148750015', 
        // Updated URL with a verified high-quality luxury lifestyle image
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200', 
        title: 'Ember Lifestyle Feature' 
      },
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up any stale or broken default URLs in the saved state
        return parsed.map((item: any) => {
          if (item.title === 'Campaign: Midnight Skyline' && (item.url.includes('1600566753190') || !item.url.includes('unsplash'))) {
            return { ...item, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200' };
          }
          if (item.title === 'The Industrial Glass House' && !item.url.includes('unsplash')) {
            return { ...item, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200' };
          }
          if (item.title === 'Ember Lifestyle Feature' && (item.url.includes('1600607687940') || !item.url.includes('unsplash'))) {
            return { ...item, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200' };
          }
          return item;
        });
      } catch (e) {
        return defaultItems;
      }
    }
    return defaultItems;
  });

  useEffect(() => {
    localStorage.setItem('legends_portfolio', JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  if (view === 'admin') {
    return <AdminHub onExit={() => setView('landing')} portfolioItems={portfolioItems} setPortfolioItems={setPortfolioItems} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#f97316] selection:text-black scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f97316] to-[#7c3aed] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#f97316]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-[#7c3aed]/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#050505] opacity-60 pointer-events-none mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <BrandStrategy />
          <Portfolio items={portfolioItems} />
          <ContactForm />
        </main>
        <Footer onAdminAccess={() => setView('admin')} />
        <LiveChatWidget />
      </div>
    </div>
  );
};

export default App;
