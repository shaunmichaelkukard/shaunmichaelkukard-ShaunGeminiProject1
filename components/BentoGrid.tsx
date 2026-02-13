
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Share2, FileText, Zap, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Cinematic Home Stories",
    description: "Bespoke property walkthroughs and emotive lifestyle features that captivate high-net-worth buyers through cinema-grade editing.",
    icon: <Camera className="w-6 h-6" />,
    className: "md:col-span-2 md:row-span-1",
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    color: "#f97316"
  },
  {
    title: "Lifestyle Dominance",
    description: "Viral-ready short-form content designed to scale influence and showcase the luxury experience.",
    icon: <Share2 className="w-6 h-6" />,
    className: "md:col-span-1 md:row-span-1",
    bg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    color: "#7c3aed"
  },
  {
    title: "Prestige Reports",
    description: "Sophisticated market insights and intellectual property that positions you as the undisputed neighborhood authority.",
    icon: <FileText className="w-6 h-6" />,
    className: "md:col-span-1 md:row-span-1",
    bg: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    color: "#f97316"
  },
  {
    title: "Luxury Lead Engine",
    description: "Precision-targeted digital funnels designed to convert global attention into qualified residential acquisitions.",
    icon: <Zap className="w-6 h-6" />,
    className: "md:col-span-2 md:row-span-1",
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    color: "#f97316"
  }
];

const BentoGrid: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-3 block">Bespoke Strategy</span>
          <h2 className="text-5xl md:text-7xl font-montserrat font-black uppercase tracking-tighter">The Narrative Suite</h2>
          <p className="text-zinc-500 mt-6 max-w-xl font-medium leading-relaxed">Engineering market dominance through a multi-dimensional approach to luxury residential storytelling.</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05, x: 5 }}
          className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#f97316] cursor-default bg-[#f97316]/5 px-8 py-4 rounded-full border border-[#f97316]/20 transition-all hover:bg-[#f97316]/10 relative overflow-hidden"
        >
          <span className="relative z-10">The Methodology</span>
          <ArrowUpRight size={14} className="relative z-10" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[320px]">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`relative group overflow-hidden rounded-[3rem] glass border border-white/5 ${service.className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
          >
            {/* Texture Layer: Brushed Metal Reveal */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
            
            {/* Deep Noir Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 transition-all duration-700 group-hover:via-black/60" />
            
            <img 
              src={service.bg} 
              alt={service.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40"
            />

            {/* Glowing Border effect on hover */}
            <div className="absolute inset-0 rounded-[3rem] border border-transparent group-hover:border-[#f97316]/20 transition-colors duration-500 pointer-events-none z-30" />

            <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
              <motion.div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] group-hover:-translate-y-2 group-hover:scale-110 bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316]"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-montserrat font-black mb-4 group-hover:text-[#f97316] transition-colors leading-tight tracking-tight uppercase">{service.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm font-medium transition-colors group-hover:text-zinc-300">{service.description}</p>
              
              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                 <ArrowUpRight className="text-[#f97316]" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
