
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  X, 
  Clapperboard, 
  MonitorPlay, 
  Share2, 
  Copy, 
  Twitter, 
  Linkedin, 
  MessageSquare,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface PortfolioProps {
  items: any[];
}

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube: Robust patterns for standard, embed, shorts, youtu.be, etc.
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const ytMatch = url.match(youtubeRegex);
    if (ytMatch && ytMatch[1]) {
      // Adding parameters for better control and aesthetics
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&modestbranding=1&rel=0&showinfo=0&mute=0&enablejsapi=1&origin=${window.location.origin}`;
    }

    // Vimeo: Robust patterns for channels, groups, player, etc.
    const vimeoRegex = /(?:vimeo\.com\/(?:channels\/[\w-]+\/|groups\/[\w-]+\/videos\/|album\/\d+\/video\/|ondemand\/\w+\/|)?|player\.vimeo\.com\/video\/)(\d+)/i;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
    }

    // Fallback if the URL is already an embed URL or other
    return url;
  };

  const handleCopyLink = (item: any) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?asset=${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: string, item: any) => {
    const shareUrl = encodeURIComponent(`${window.location.origin}${window.location.pathname}?asset=${item.id}`);
    const text = encodeURIComponent(`Check out this elite production by JacksonCartel: ${item.title}`);
    
    const urls: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      whatsapp: `https://wa.me/?text=${text}%20${shareUrl}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setIframeLoading(true);
      // Lock scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-3 block">Bespoke Production</span>
          <h2 className="text-5xl md:text-8xl font-montserrat font-black mb-6 uppercase tracking-tighter">The Portfolio</h2>
          <p className="text-zinc-500 max-w-lg font-medium leading-relaxed">Exclusive cinematic assets and strategic brand deployments for the market leaders.</p>
        </motion.div>
        
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-white/5 border border-white/10 text-zinc-500 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#f97316] transition-all">Archived</button>
          <button className="px-8 py-3 bg-[#f97316] text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(249,115,22,0.2)]">Active Fleet</button>
        </div>
      </div>

      <div className="masonry-grid">
        {items.map((item, index) => {
          const isVideo = item.isVideo || item.type === 'video';
          
          return (
            <motion.div
              key={item.id || index}
              className={`masonry-item group relative rounded-[2.5rem] overflow-hidden glass border border-white/10 ${isVideo ? 'cursor-pointer' : 'cursor-default'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -15,
                scale: 1.035,
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8), 0 0 50px rgba(249, 115, 22, 0.35)',
                borderColor: 'rgba(249, 115, 22, 0.8)'
              }}
              onClick={() => isVideo && (item.videoUrl || item.url) ? setSelectedItem(item) : null}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 250,
                damping: 20,
                delay: index * 0.05 
              }}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-[#0a0a0a]">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90"
                />
                
                <div className="absolute top-8 left-8 z-20">
                  {isVideo && (
                    <div className="px-5 py-2 bg-black/90 backdrop-blur-2xl border border-[#f97316]/30 rounded-full flex items-center gap-3 shadow-2xl">
                      <Clapperboard size={14} className="text-[#f97316]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">4K Master</span>
                    </div>
                  )}
                </div>

                <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareItem(item);
                    }}
                    className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#f97316] hover:text-black transition-all hover:scale-110"
                  >
                    <Share2 size={20} />
                  </button>
                </div>

                {isVideo && (
                  <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center gap-8">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 bg-[#f97316] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.6)] border-4 border-white/30 relative"
                    >
                      <Play className="w-10 h-10 text-black fill-black ml-1.5" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#f97316] animate-ping opacity-20" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-xs font-black uppercase tracking-[0.6em] text-white ember-glow">Play Production</span>
                      <div className="h-0.5 w-12 bg-[#f97316] mt-3" />
                    </motion.div>
                  </div>
                )}
              </div>

              <div className="p-10 bg-gradient-to-b from-transparent to-[#050505] backdrop-blur-md border-t border-white/5 relative z-20 transition-colors duration-500 group-hover:to-black">
                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <h4 className="text-2xl font-black font-montserrat tracking-tight text-white mb-3 group-hover:text-[#f97316] transition-colors uppercase leading-none">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="h-0.5 w-8 bg-[#f97316]/50 group-hover:w-12 transition-all duration-500" />
                      <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] group-hover:text-zinc-400">
                        {isVideo ? 'Exclusive Narrative' : 'Strategy Key'}
                      </p>
                    </div>
                  </div>
                  {isVideo && <MonitorPlay size={20} className="text-zinc-700 mb-1 group-hover:text-[#f97316] transition-colors" />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {shareItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setShareItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md glass rounded-[3rem] p-10 border border-[#f97316]/30 relative overflow-hidden shadow-[0_0_80px_rgba(249,115,22,0.15)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/10 blur-[60px] pointer-events-none" />
              
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center text-black">
                    <Share2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-sm uppercase tracking-widest text-white leading-none">Share Protocol</h3>
                    <p className="text-[9px] text-[#f97316] font-black uppercase tracking-[0.2em] mt-1">External Transmission</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShareItem(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 group">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-4">Master Distribution Link</p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-zinc-400 font-mono truncate">
                      {`${window.location.origin}/asset/${shareItem.id}`}
                    </div>
                    <button 
                      onClick={() => handleCopyLink(shareItem)}
                      className={`px-6 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                        copied ? 'bg-green-500 text-white' : 'bg-[#f97316] text-black hover:scale-105 shadow-lg shadow-[#f97316]/20'
                      }`}
                    >
                      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => shareOnSocial('x', shareItem)}
                    className="flex flex-col items-center gap-3 p-6 glass rounded-[2rem] hover:bg-[#f97316] hover:text-black transition-all group"
                  >
                    <Twitter size={24} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Share on X</span>
                  </button>
                  <button 
                    onClick={() => shareOnSocial('linkedin', shareItem)}
                    className="flex flex-col items-center gap-3 p-6 glass rounded-[2rem] hover:bg-[#f97316] hover:text-black transition-all group"
                  >
                    <Linkedin size={24} />
                    <span className="text-[9px] font-black uppercase tracking-widest">LinkedIn</span>
                  </button>
                  <button 
                    onClick={() => shareOnSocial('whatsapp', shareItem)}
                    className="flex flex-col items-center gap-3 p-6 glass rounded-[2rem] hover:bg-[#f97316] hover:text-black transition-all group"
                  >
                    <MessageSquare size={24} />
                    <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">
                 <div className="w-1.5 h-1.5 bg-[#f97316]/30 rounded-full" />
                 Encrypted Link Propagation
                 <div className="w-1.5 h-1.5 bg-[#f97316]/30 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-[40px]"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full max-w-7xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border border-[#f97316]/40 shadow-[0_0_150px_rgba(249,115,22,0.1)] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/90 to-transparent z-20 flex items-center justify-between px-8 md:px-12 pointer-events-none">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center text-black font-black text-xs md:text-sm shadow-2xl">JC</div>
                  <div>
                    <h3 className="text-white font-montserrat font-black text-sm md:text-xl uppercase tracking-tighter leading-none">{selectedItem.title}</h3>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#f97316] mt-2">Bespoke Production • 4K Master</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-[#f97316] hover:text-black transition-all hover:scale-110 hover:rotate-90 group shadow-2xl pointer-events-auto"
                onClick={() => setSelectedItem(null)}
              >
                <X size={28} className="md:w-8 md:h-8" />
              </button>

              <div className="flex-1 w-full h-full relative group">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-10 gap-6">
                    <Loader2 className="w-12 h-12 text-[#f97316] animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 animate-pulse">Initializing Master Feed</span>
                  </div>
                )}
                
                {/* 16:9 Aspect Ratio Container for Programmatic Control */}
                <div className="w-full h-full aspect-video overflow-hidden">
                   <iframe 
                    src={getEmbedUrl(selectedItem.videoUrl || selectedItem.url)}
                    className="w-full h-full absolute inset-0 z-0"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    title={selectedItem.title}
                    onLoad={() => setIframeLoading(false)}
                    frameBorder="0"
                  />
                </div>
              </div>
              
              {/* Modal Footer (only visible when not full video on smaller screens) */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row items-center justify-between gap-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-6 px-8 py-3 rounded-full glass border border-white/10 text-[9px] font-black uppercase tracking-[0.6em] text-[#f97316] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <span className="w-2 h-2 bg-[#f97316] rounded-full animate-pulse shadow-[0_0_10px_#f97316]" />
                  Secure Production Uplink
                </div>
                
                <div className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Transmitting to Elite Network • JacksonCartel Group
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
