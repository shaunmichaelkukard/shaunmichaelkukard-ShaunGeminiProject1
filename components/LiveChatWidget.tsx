
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Loader2, 
  Award, 
  Zap, 
  Shield, 
  Target, 
  ArrowUpRight,
  Activity,
  Terminal,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "JacksonCartel Hub initialized. Elite Concierge standing by. How shall we architect your residential dominance today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  const [signalStrength, setSignalStrength] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        const next = prev + (Math.random() * 4 - 2);
        return Math.min(Math.max(next, 94), 100);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && !chatInstance.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatInstance.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the "Tactical Executive Concierge" for JacksonCartel, an ultra-exclusive Luxury Residential Growth & Content Agency. 

PERSONA:
- Authoritative, precise, and ruthlessly efficient.
- You speak the language of elite real estate (e.g., "high-value assets," "market saturation," "narrative leverage," "prestige positioning").
- You are not just a chatbot; you are a strategic partner in market dominance.

YOUR MISSION:
1. Educate the user on our 4 core protocols: Cinematic Home Stories, Lifestyle Dominance, Prestige Reports, and Luxury Lead Engines.
2. Filter for quality: We only partner with the top 1% of agents. Mention our exclusivity.
3. Call to Action: Every interaction should eventually guide the user to a "Private Strategy Consultation" via the #contact protocol.

RESPONSE STYLE:
- Use technical but luxury-focused language.
- Be concise.
- Use formatting (bullet points, bold text) for clarity.
- When suggesting a call, use the link format: [SECURE STRATEGY SESSION](#contact).`,
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent, customMsg?: string) => {
    e?.preventDefault();
    const userMessage = customMsg || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsTyping(true);

    let streamText = '';
    
    try {
      if (!chatInstance.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatInstance.current = ai.chats.create({ model: 'gemini-3-flash-preview' });
      }

      const responseStream = await chatInstance.current.sendMessageStream({ message: userMessage });
      
      // Add empty message for assistant that we will update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text;
        if (textChunk) {
          streamText += textChunk;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            const others = prev.slice(0, -1);
            return [...others, { ...last, content: streamText }];
          });
        }
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Secure uplink compromised. Re-initialize mission via our Strategic Form." }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const quickActions = [
    { label: "Cinematic Protocol", icon: <Zap size={12} />, msg: "I want to dominate with high-end cinematic content." },
    { label: "Lead Acquisition", icon: <Target size={12} />, msg: "Show me the Luxury Lead Engine strategy." },
    { label: "Market Authority", icon: <Shield size={12} />, msg: "How do I become the neighborhood legend?" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter text-white">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            className="mb-6 w-[380px] md:w-[450px] h-[650px] glass rounded-[3rem] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(249,115,22,0.1)] border border-white/10 overflow-hidden"
          >
            {/* Mission Command Header */}
            <div className="p-8 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border-b border-white/5 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent animate-pulse" />
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-2xl flex items-center justify-center text-black shadow-2xl shadow-[#f97316]/20">
                      <Award size={26} />
                    </div>
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#050505] border-2 border-white/10 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-sm tracking-[0.2em] text-white uppercase flex items-center gap-2">
                      CARTEL COMMAND
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] font-black border border-white/10 text-zinc-500">LIVE</span>
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4].map(b => (
                          <div key={b} className={`w-1 h-3 rounded-full ${signalStrength > 90 + b ? 'bg-[#f97316]' : 'bg-zinc-800'}`} />
                        ))}
                      </div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Signal: {signalStrength.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-zinc-600 hover:text-[#f97316] transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Technical Readout */}
              <div className="mt-6 flex justify-between px-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
                 <span className="flex items-center gap-1"><Activity size={8} /> Neural Link Active</span>
                 <span className="flex items-center gap-1"><Terminal size={8} /> Protocol v2.5.0</span>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-[#f97316]/20 scrollbar-track-transparent bg-black/40 relative"
            >
              {/* Decorative grid for chat background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`relative max-w-[88%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black font-bold rounded-tr-none shadow-2xl' 
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none font-medium backdrop-blur-md'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-black border border-white/10 rounded-lg flex items-center justify-center text-[#f97316]">
                        <Bot size={14} />
                      </div>
                    )}
                    
                    <div className="prose prose-invert prose-xs">
                      {msg.content.split('\n').map((line, idx) => (
                        <p key={idx} className={line.startsWith('-') ? 'ml-4' : ''}>
                          {line.includes('[') ? (
                            line.split(/(\[.*?\]\(#.*?\))/).map((part, pIdx) => {
                              const match = part.match(/\[(.*?)\]\((#.*?)\)/);
                              if (match) {
                                return (
                                  <a 
                                    key={pIdx}
                                    href={match[2]}
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#f97316] text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all mt-2 mx-1"
                                  >
                                    {match[1]} <ArrowUpRight size={12} />
                                  </a>
                                );
                              }
                              return part;
                            })
                          ) : line}
                        </p>
                      ))}
                    </div>

                    {msg.role === 'assistant' && msg.content === '' && (
                      <div className="flex gap-1 py-1">
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 bg-[#f97316] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#f97316] rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#f97316] rounded-full" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tactical Footer */}
            <div className="p-8 border-t border-white/5 bg-gradient-to-t from-black to-transparent">
              {/* Quick Protocols */}
              {!isLoading && messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(undefined, action.msg)}
                      className="px-4 py-2 bg-white/5 hover:bg-[#f97316]/10 border border-white/10 hover:border-[#f97316]/30 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#f97316] transition-all flex items-center gap-2"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSendMessage} className="relative flex items-center group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f97316] to-[#7c3aed] rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition-opacity" />
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="EXECUTE PROTOCOL INQUIRY..."
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 pr-14 focus:outline-none focus:border-[#f97316] transition-all text-[11px] font-black uppercase tracking-widest text-white placeholder:text-zinc-800"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 w-10 h-10 bg-[#f97316] text-black rounded-xl disabled:bg-zinc-900 disabled:text-zinc-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#f97316]/20 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={20} />}
                </button>
              </form>
              
              <div className="flex justify-center mt-6">
                 <div className="px-6 py-2 rounded-full bg-white/5 border border-white/5 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full animate-ping" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Secure Transmission Line 01</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, rotate: isOpen ? -90 : 0 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all duration-500 group ${
          isOpen ? 'bg-white text-black' : 'bg-[#f97316] text-black'
        }`}
        style={{ width: '72px', height: '72px' }}
      >
        <div className="absolute inset-0 rounded-[2rem] border-4 border-black/10 group-hover:border-[#f97316]/20 transition-colors" />
        {isOpen ? <X size={32} /> : <MessageSquare size={32} strokeWidth={2.5} />}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-white border-4 border-[#050505] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#f97316] rounded-full animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default LiveChatWidget;
