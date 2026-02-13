
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.25, 1, 0.5, 1] 
      },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(15px)', scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };

  const subHeadlineVariants = {
    hidden: { opacity: 0, y: 20, letterSpacing: '0.1em' },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: '0em',
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Texture Layer: Tech Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4"><Target size={12} className="text-zinc-800" /></div>
        <div className="absolute top-1/4 right-1/4"><Target size={12} className="text-zinc-800" /></div>
        <div className="absolute bottom-1/4 left-1/4"><Target size={12} className="text-zinc-800" /></div>
        <div className="absolute bottom-1/4 right-1/4"><Target size={12} className="text-zinc-800" /></div>
      </div>

      <motion.div 
        className="relative max-w-6xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block px-5 py-2 rounded-full border border-[#f97316]/30 bg-[#f97316]/5 text-[#f97316] text-[10px] font-black tracking-[0.4em] uppercase mb-8 relative overflow-hidden group">
            <span className="relative z-10">Elite Residential Real Estate Authority</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-[9rem] font-montserrat font-black leading-[0.9] tracking-tighter mb-10 flex flex-wrap justify-center gap-x-6"
        >
          <motion.span variants={titleWordVariants}>We</motion.span>
          <motion.span variants={titleWordVariants}>Forge</motion.span>
          <motion.span 
            variants={titleWordVariants}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#fbbf24] to-[#f97316] ember-glow relative"
          >
            Legends.
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
            />
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          variants={subHeadlineVariants}
        >
          Bespoke cinematic storytelling and aggressive market positioning 
          engineered for the top 1% of luxury residential agents.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          variants={itemVariants}
        >
          <button 
            onClick={() => handleScroll('portfolio')}
            className="group relative flex items-center gap-3 px-10 py-5 bg-[#f97316] text-black font-black uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 hover:bg-[#ea580c] w-full sm:w-auto justify-center shadow-[0_10px_40px_rgba(249,115,22,0.3)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">The Portfolio <Play className="w-4 h-4 fill-black" /></span>
            <motion.div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          </button>
          <button 
            onClick={() => handleScroll('contact')}
            className="group flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-full backdrop-blur-md transition-all hover:bg-white/10 w-full sm:w-auto justify-center relative z-10"
          >
            Prestige Protocol
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Visual Mockup with Enhanced Noir Glow */}
        <motion.div
          className="mt-24 relative rounded-[3rem] overflow-hidden border border-white/10 glass max-w-5xl mx-auto aspect-video shadow-[0_60px_120px_rgba(0,0,0,0.9)] group cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          onClick={() => setShowVideo(true)}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
            alt="Luxury Property" 
            className="w-full h-full object-cover grayscale opacity-50 contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-20">
            <motion.div 
              className="w-24 h-24 bg-[#f97316] rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-[0_0_80px_rgba(249,115,22,0.6)] border-4 border-white/20 relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-10 h-10 text-black fill-black ml-1.5 z-10" />
              <motion.div 
                className="absolute inset-0 bg-white/20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />
            </motion.div>
            
            {/* Flickering Ember Effect */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#f97316]/30 blur-2xl animate-pulse" />
          </div>
          
          {/* Subtle Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-30" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }}></div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/98 backdrop-blur-3xl"
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden border border-[#f97316]/30 shadow-[0_0_80px_rgba(249,115,22,0.1)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-8 right-8 z-10 w-14 h-14 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#f97316] hover:text-black transition-all hover:scale-110"
                onClick={() => setShowVideo(false)}
              >
                <X size={28} />
              </button>
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
