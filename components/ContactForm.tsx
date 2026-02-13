
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  User, 
  Hash, 
  Cpu, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  Award,
  Globe,
  Smartphone
} from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    handle: '',
    goal: 'Content'
  });

  const [errors, setErrors] = useState({
    fullName: '',
    handle: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const validate = () => {
    const newErrors = { fullName: '', handle: '' };
    let isValid = true;

    if (formData.fullName.length < 3) {
      newErrors.fullName = 'Identity invalid: Name too short.';
      isValid = false;
    }

    if (formData.handle.length < 3) {
      newErrors.handle = 'Target invalid: Provide handle or site.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const existingLeads = JSON.parse(localStorage.getItem('legends_leads') || '[]');
      const newLead = { ...formData, date: new Date().toISOString() };
      localStorage.setItem('legends_leads', JSON.stringify([newLead, ...existingLeads]));

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: '', handle: '', goal: 'Content' });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#f97316]/5 blur-[200px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: The Digital Business Card (Interactive 3D) */}
        <motion.div 
          className="w-full lg:w-1/2 perspective-1000"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{ 
              rotateY: isHovered ? 10 : 0, 
              rotateX: isHovered ? -5 : 0,
              z: isHovered ? 20 : 0
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="relative w-full aspect-[1.6/1] glass rounded-[2.5rem] p-10 overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col justify-between"
          >
            {/* Holographic Shimmer Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
              animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            
            {/* Card Content Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#f97316] to-[#7c3aed] rounded-2xl flex items-center justify-center font-montserrat font-black text-black text-xl shadow-2xl">
                  JC
                </div>
                <div>
                  <h3 className="font-montserrat font-black text-lg tracking-tight uppercase leading-none">JacksonCartel</h3>
                  <p className="text-[9px] font-black text-[#f97316] uppercase tracking-[0.3em] mt-2">Executive Digital Handshake</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 opacity-40">
                <ShieldCheck size={20} className="text-[#f97316]" />
                <span className="text-[7px] font-black uppercase tracking-widest">Verified Hub</span>
              </div>
            </div>

            {/* Dynamic Card User Info */}
            <div className="mt-8 space-y-4">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Prospective Elite Partner</p>
                <motion.p 
                  className="text-3xl font-montserrat font-black uppercase tracking-tighter text-white truncate"
                  animate={{ scale: formData.fullName ? 1.05 : 1 }}
                >
                  {formData.fullName || "IDENT_PENDING"}
                </motion.p>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Digital Hub</p>
                  <p className="text-sm font-bold text-zinc-300 font-mono tracking-tighter">{formData.handle || "@access_denied"}</p>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div>
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Mission Protocol</p>
                  <p className="text-sm font-black text-[#f97316] uppercase tracking-tighter italic">{formData.goal}</p>
                </div>
              </div>
            </div>

            {/* Card Footer Elements */}
            <div className="flex justify-between items-end pt-8 border-t border-white/5">
              <div className="flex gap-4">
                <Smartphone size={16} className="text-zinc-700" />
                <Globe size={16} className="text-zinc-700" />
                <Share2 size={16} className="text-zinc-700" />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Access Key</p>
                  <p className="text-[10px] font-mono text-zinc-500">JC-PRO-2025</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <QrCode size={32} className="text-[#f97316]/80" />
                </div>
              </div>
            </div>

            {/* Subtle Chip Effect */}
            <div className="absolute top-1/2 right-12 w-12 h-12 border border-white/5 rounded-full pointer-events-none flex items-center justify-center opacity-20">
               <Cpu size={24} className="text-[#f97316]" />
            </div>
          </motion.div>
          
          <p className="mt-8 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
             Tap Card for Interactive Strategy Protocol
          </p>
        </motion.div>

        {/* Right Side: The Form (Action Protocol) */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-[10px] font-black uppercase tracking-[0.3em]">
                    <Award size={12} /> Partner Intake v2.1
                  </span>
                  <h2 className="text-5xl font-montserrat font-black uppercase tracking-tighter leading-none">
                    Initialize <span className="text-[#f97316]">Handshake.</span>
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed max-w-lg">
                    Populate your digital identity below to initiate a private strategy consult. We only activate partnerships with agents poised for absolute market dominance.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Identity Input */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2 flex items-center gap-2">
                         <User size={10} /> Identity Name
                      </label>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className={`w-full bg-white/5 border ${errors.fullName ? 'border-red-500/40' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#f97316] transition-all text-white placeholder:text-zinc-800 font-bold uppercase text-xs tracking-wider`}
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({...formData, fullName: e.target.value});
                          if (errors.fullName) setErrors({...errors, fullName: ''});
                        }}
                      />
                    </div>

                    {/* Handle Input */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2 flex items-center gap-2">
                         <Hash size={10} /> Digital Footprint
                      </label>
                      <input 
                        type="text" 
                        placeholder="@handle / site"
                        className={`w-full bg-white/5 border ${errors.handle ? 'border-red-500/40' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-[#f97316] transition-all text-white placeholder:text-zinc-800 font-bold text-xs tracking-wider`}
                        value={formData.handle}
                        onChange={(e) => {
                          setFormData({...formData, handle: e.target.value});
                          if (errors.handle) setErrors({...errors, handle: ''});
                        }}
                      />
                    </div>
                  </div>

                  {/* Objective Dropdown */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2 flex items-center gap-2">
                       <Cpu size={10} /> Market Protocol
                    </label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#f97316] transition-all text-white appearance-none cursor-pointer font-black uppercase text-[11px] tracking-widest"
                      value={formData.goal}
                      onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    >
                      <option value="Content">Cinematic Narrative</option>
                      <option value="Leads">Acquisition Engine</option>
                      <option value="Omnipresence">Global Dominance</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="group w-full py-6 bg-[#f97316] hover:bg-[#ea580c] text-black font-black uppercase tracking-[0.4em] rounded-3xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_60px_rgba(249,115,22,0.2)] text-[11px] mt-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Authorize Connection
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 glass rounded-[4rem] border border-[#f97316]/20 flex flex-col items-center gap-10 shadow-2xl"
              >
                <div className="w-24 h-24 bg-[#f97316] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.5)] border-4 border-white/20">
                  <CheckCircle2 size={48} className="text-black" />
                </div>
                <div className="space-y-4 px-10">
                  <h3 className="text-4xl font-montserrat font-black uppercase tracking-tighter text-white">Handshake Complete</h3>
                  <p className="text-zinc-500 font-medium max-w-sm mx-auto">
                    Protocol initiated. Our executive concierge will decrypt your profile and reach out within the next high-value window.
                  </p>
                </div>
                <div className="w-2/3 h-px bg-white/5" />
                <p className="text-[10px] text-[#f97316] font-black uppercase tracking-[0.5em] animate-pulse">
                   Transmission Secure • JacksonCartel Group
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
