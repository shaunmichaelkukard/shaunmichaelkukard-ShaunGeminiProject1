
import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onAdminAccess?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminAccess }) => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black relative overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-[#f97316]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#f97316] to-[#7c3aed] rounded-2xl flex items-center justify-center font-montserrat font-black text-black text-2xl shadow-2xl shadow-[#f97316]/20 transition-transform hover:scale-105">
                JC
              </div>
              <span className="font-montserrat font-bold text-2xl tracking-tighter uppercase">JACKSON <span className="text-[#f97316]">CARTEL</span></span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              World-class residential real estate narrative engineering for the market's ultimate elite. We don't just create content; we build digital dynasties.
            </p>
            <div className="flex gap-4">
              {[Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-[#f97316] hover:text-black transition-all group"
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Executive Office Column */}
          <div className="lg:col-span-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-10">Operational Core</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="group">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] mb-2">Director</p>
                  <p className="text-white font-montserrat font-black text-sm tracking-tight uppercase group-hover:text-[#f97316] transition-colors">Shaun Michael Kukard</p>
                </div>
                <div className="group">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] mb-2">Electronic Comms</p>
                  <a href="mailto:shaunmichael@galaxyhit.com" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2 font-bold uppercase tracking-tight">
                    <Mail size={16} className="text-[#f97316]" />
                    shaunmichael@galaxyhit.com
                  </a>
                </div>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] mb-2">Primary Uplink</p>
                  <a href="tel:0696400789" className="text-zinc-500 hover:text-white text-sm transition-colors flex items-center gap-2 font-bold uppercase tracking-tight">
                    <Phone size={16} className="text-[#f97316]" />
                    069 640 0789
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] mb-2">Secure Line</p>
                  <a href="https://wa.me/27812593850" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#25D366] text-sm transition-colors flex items-center gap-2 font-bold uppercase tracking-tight">
                    <MessageSquare size={16} />
                    081 259 3850
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-10">Protocols</h4>
            <div className="grid grid-cols-1 gap-5">
              {['Services', 'Strategy', 'Portfolio', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => handleScrollTo(item.toLowerCase())}
                  className="text-zinc-500 hover:text-[#f97316] text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:translate-x-2 text-left bg-transparent"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <button 
                onClick={onAdminAccess}
                className="group flex items-center gap-3 text-[#f97316] text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:tracking-[0.6em] bg-transparent"
              >
                <ShieldCheck size={14} className="group-hover:animate-pulse" />
                Control Core Access
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] text-zinc-800 font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} JacksonCartel Group • Luxury Residential Narrative
          </p>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">Global Link: SECURE</span>
            </div>
            <p className="text-[10px] text-zinc-800 font-black uppercase tracking-widest">Version: 2.1.0-Core</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
