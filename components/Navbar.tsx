
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScrollPos = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollPos);
    return () => window.removeEventListener('scroll', handleScrollPos);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#f97316] rounded-lg flex items-center justify-center font-montserrat font-black text-black text-xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            JC
          </div>
          <span className="font-montserrat font-bold text-xl tracking-tighter uppercase">JACKSON <span className="text-[#f97316]">CARTEL</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
          {['Services', 'Strategy', 'Portfolio', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="text-zinc-500 hover:text-[#f97316] transition-all hover:tracking-[0.3em] uppercase bg-transparent border-none cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => handleScrollTo('contact')}
            className="px-6 py-3 bg-white text-black rounded-full font-black hover:bg-[#f97316] hover:text-black transition-all shadow-lg hover:shadow-[#f97316]/20 uppercase text-[11px] tracking-[0.2em]"
          >
            Initiate Project
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 py-10 px-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {['Services', 'Strategy', 'Portfolio', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => handleScrollTo(item.toLowerCase())}
              className="text-2xl font-black uppercase tracking-widest border-b border-white/5 pb-4 text-left text-white bg-transparent"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => handleScrollTo('contact')}
            className="w-full text-center py-5 bg-[#f97316] text-black rounded-2xl font-black uppercase tracking-widest"
          >
            Get Custom Quote
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
