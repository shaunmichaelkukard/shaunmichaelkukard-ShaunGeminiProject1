
import React from 'react';
import { motion } from 'framer-motion';

const BrandStrategy: React.FC = () => {
  return (
    <section id="strategy" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#f97316] font-black text-xs tracking-[0.4em] uppercase mb-6 block">Prestige Blueprint</span>
          <h2 className="text-5xl md:text-7xl font-montserrat font-black mb-10 leading-[0.9] tracking-tighter">
            Architecting <span className="text-[#f97316]">Residential Omnipresence.</span>
          </h2>
          <p className="text-xl text-zinc-500 mb-12 leading-relaxed font-medium">
            We don't just broadcast; we dominate. Our proprietary system turns your personal brand into a prestige force that cannot be ignored.
          </p>
          
          <div className="space-y-8">
            {[
              { title: "Residential Legacy", desc: "Forge an unbreakable bond with your market through continuous high-value visibility." },
              { title: "Prestige Protocol", desc: "Transcend the role of 'Agent' to become the undisputed 'Prestige Advisor'." },
              { title: "Syndicated Influence", desc: "One production masterfully deployed across every relevant digital node." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-[2rem] glass hover:bg-white/5 transition-all group cursor-default border-white/5 hover:border-[#f97316]/20">
                <div className="w-12 h-12 rounded-2xl bg-[#f97316]/10 flex items-center justify-center text-[#f97316] font-black shrink-0 transition-all group-hover:bg-[#f97316] group-hover:text-black shadow-[0_0_20px_rgba(249,115,22,0.1)] group-hover:shadow-[#f97316]/30">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-montserrat font-black text-lg text-white mb-2 uppercase tracking-tight group-hover:text-[#f97316] transition-colors">{item.title}</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-square rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Living" 
              className="w-full h-full object-cover grayscale brightness-[0.3]"
            />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 space-y-6">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="bg-[#f97316] px-8 py-3 rounded-full text-black font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_0_30px_rgba(249,115,22,0.6)]"
               >
                 JacksonCartel Core
               </motion.div>
               <div className="text-7xl md:text-9xl font-montserrat font-black text-white leading-none tracking-tighter opacity-90">FORGE</div>
               <div className="text-7xl md:text-9xl font-montserrat font-black text-[#f97316] leading-none tracking-tighter ember-glow italic">LEGACY</div>
            </div>

            <div className="absolute top-20 right-20 w-48 h-48 bg-[#f97316]/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#7c3aed]/20 blur-[100px] rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandStrategy;
