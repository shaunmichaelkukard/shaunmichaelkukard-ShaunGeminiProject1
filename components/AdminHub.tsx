
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ImageIcon, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle,
  Video,
  Link2,
  AlertCircle,
  TrendingUp,
  Activity,
  Globe,
  PieChart,
  RefreshCw,
  Search,
  Eye,
  Edit3,
  Filter,
  Terminal,
  ChevronRight,
  Shield,
  Zap,
  Clock,
  ExternalLink,
  Copy,
  UploadCloud,
  FileVideo,
  FileImage,
  Database,
  ShieldAlert,
  // Added Loader2 to imports
  Loader2
} from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  url: string;
  isVideo: boolean;
  videoUrl: string;
  type?: string;
  status?: 'active' | 'draft';
  fileSize?: string;
}

interface Lead {
  fullName: string;
  handle: string;
  goal: string;
  date: string;
  status?: 'new' | 'contacted' | 'partnered' | 'archived';
  notes?: string;
}

interface AdminHubProps {
  onExit: () => void;
  portfolioItems: PortfolioItem[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
}

const AdminHub: React.FC<AdminHubProps> = ({ onExit, portfolioItems, setPortfolioItems }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'portfolio' | 'settings' | 'analytics'>('portfolio');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilter, setLeadFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [auditLogs, setAuditLogs] = useState<{ time: string, action: string, type: 'info' | 'warning' | 'critical' }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newItem, setNewItem] = useState<Omit<PortfolioItem, 'id'>>({ 
    title: '', 
    url: '', 
    isVideo: false,
    videoUrl: '',
    status: 'active'
  });

  // Added copyToClipboard helper function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addLog(`Registry transmission: Copied "${text}"`, "info");
  };

  const addLog = (action: string, type: 'info' | 'warning' | 'critical' = 'info') => {
    const log = {
      time: new Date().toLocaleTimeString(),
      action,
      type
    };
    setAuditLogs(prev => [log, ...prev].slice(0, 10));
  };

  const loadLeads = () => {
    setIsRefreshing(true);
    const savedLeads = localStorage.getItem('legends_leads');
    if (savedLeads) {
      const parsed: Lead[] = JSON.parse(savedLeads);
      setLeads(parsed.map(l => ({ ...l, status: l.status || 'new' })));
    }
    setTimeout(() => {
      setIsRefreshing(false);
      addLog("Intelligence database synchronized", "info");
    }, 800);
  };

  useEffect(() => {
    loadLeads();
    addLog("Control Core initialized", "info");
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Asset exceeds size limit (2MB). Use external URL for high-res files.");
      addLog("Upload rejected: Oversized asset", "critical");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setIsUploading(true);
      setUploadProgress(0);
      addLog(`Processing file: ${file.name}`, "info");
    };
    
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };

    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (editingItem) {
        setEditingItem({ ...editingItem, url: result });
      } else {
        setNewItem({ ...newItem, url: result });
      }
      
      // Simulate post-processing
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        addLog(`Asset cached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, "info");
      }, 500);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteItem = (id: number) => {
    const item = portfolioItems.find(i => i.id === id);
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
    addLog(`Asset removed: ${item?.title}`, "warning");
  };

  const updateLeadStatus = (index: number, status: Lead['status']) => {
    const updatedLeads = [...leads];
    updatedLeads[index].status = status;
    setLeads(updatedLeads);
    localStorage.setItem('legends_leads', JSON.stringify(updatedLeads));
    addLog(`Lead status updated: ${updatedLeads[index].fullName} -> ${status}`, "info");
  };

  const handleDeleteLead = (index: number) => {
    const leadName = leads[index].fullName;
    const updatedLeads = [...leads];
    updatedLeads.splice(index, 1);
    setLeads(updatedLeads);
    localStorage.setItem('legends_leads', JSON.stringify(updatedLeads));
    addLog(`Lead purged from registry: ${leadName}`, "critical");
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const target = editingItem || newItem;

    if (!target.title.trim()) { setError("Asset Title is required."); return; }
    if (!target.url.trim()) { setError("Thumbnail source is required."); return; }
    if (target.isVideo && !target.videoUrl.trim()) { setError("Cinematic Source URL is required for video items."); return; }
    
    // Simulate "Deploying to Global Network"
    setIsUploading(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 5;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        finalizeSave();
      }
    }, 50);

    const finalizeSave = () => {
      if (editingItem) {
        setPortfolioItems(prev => prev.map(item => item.id === editingItem.id ? { ...editingItem } : item));
        addLog(`Asset re-configured: ${editingItem.title}`, "info");
        setEditingItem(null);
      } else {
        const item: PortfolioItem = { 
          id: Date.now(),
          title: newItem.title.trim(),
          url: newItem.url.trim(),
          isVideo: newItem.isVideo,
          videoUrl: newItem.isVideo ? newItem.videoUrl.trim() : '',
          type: newItem.isVideo ? 'video' : 'image',
          status: 'active'
        };
        setPortfolioItems(prev => [item, ...prev]);
        addLog(`New asset deployed: ${item.title}`, "info");
        setNewItem({ title: '', url: '', isVideo: false, videoUrl: '', status: 'active' });
      }
      setIsUploading(false);
      setUploadProgress(0);
    };
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           lead.handle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = leadFilter === 'all' || lead.status === leadFilter;
      return matchesSearch && matchesFilter;
    });
  }, [leads, searchQuery, leadFilter]);

  const storageUsage = useMemo(() => {
    const stringified = JSON.stringify(portfolioItems) + JSON.stringify(leads);
    return (new TextEncoder().encode(stringified).length / (1024 * 1024)).toFixed(2);
  }, [portfolioItems, leads]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-inter overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 bg-[#080808] z-20 shadow-2xl shrink-0">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-gradient-to-br from-[#f97316] to-[#7c3aed] rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#f97316]/20">JC</div>
          <div>
            <span className="font-montserrat font-black text-sm tracking-tighter block leading-none uppercase">JacksonCartel</span>
            <span className="text-[10px] font-bold text-[#f97316] tracking-[0.3em]">CONTROL CORE</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'leads', icon: Users, label: 'Intelligence' },
            { id: 'portfolio', icon: ImageIcon, label: 'Productions' },
            { id: 'analytics', icon: Activity, label: 'Command Center' },
            { id: 'settings', icon: Settings, label: 'System Config' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all group ${
                activeTab === item.id 
                ? 'bg-[#f97316] text-black shadow-2xl shadow-[#f97316]/20' 
                : 'text-zinc-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? '' : 'group-hover:text-[#f97316] transition-colors'} />
              <span className="tracking-widest uppercase text-[10px]">{item.label}</span>
              {item.id === 'leads' && leads.filter(l => l.status === 'new').length > 0 && (
                <span className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${activeTab === 'leads' ? 'bg-black text-white' : 'bg-[#f97316] text-black'}`}>
                  {leads.filter(l => l.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Storage Integrity */}
        <div className="mt-8 pt-8 border-t border-white/5">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600">
               <Database size={12} />
               Storage Pulse
             </div>
             <span className={`text-[9px] font-black ${Number(storageUsage) > 4 ? 'text-red-500' : 'text-zinc-500'}`}>{storageUsage}MB / 5MB</span>
           </div>
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(Number(storageUsage) / 5) * 100}%` }}
               className={`h-full ${Number(storageUsage) > 4 ? 'bg-red-500' : 'bg-[#f97316]'}`}
             />
           </div>
           {Number(storageUsage) > 4 && (
             <p className="text-[8px] text-red-500 font-bold mt-2 uppercase flex items-center gap-1">
               <ShieldAlert size={10} /> Local cache nearing limit
             </p>
           )}
        </div>

        <button 
          onClick={onExit}
          className="mt-auto flex items-center gap-4 px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          Deactivate Core
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto relative bg-[#050505]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f97316]/5 blur-[150px] pointer-events-none -z-10" />
        
        <header className="flex justify-between items-start mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-3 flex items-center gap-2">
              <Shield size={12} className="animate-pulse" />
              Secure Admin Session • Level 7 Clearance
            </p>
            <h1 className="text-5xl font-montserrat font-black uppercase tracking-tighter leading-none">
              {activeTab === 'leads' ? 'Intelligence Deck' : 
               activeTab === 'portfolio' ? 'Production Studio' : 
               activeTab === 'analytics' ? 'Mission Control' : 'Identity Core'}
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
             <button 
               onClick={loadLeads}
               className={`w-14 h-14 glass rounded-2xl flex items-center justify-center text-zinc-500 hover:text-[#f97316] transition-all ${isRefreshing ? 'animate-spin' : ''}`}
             >
               <RefreshCw size={20} />
             </button>
             <div className="px-8 py-4 glass rounded-2xl border border-white/10 flex flex-col items-end min-w-[160px]">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Global Status</span>
                <span className="text-xl font-black text-white flex items-center gap-2">
                   ONLINE
                   <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                </span>
             </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'leads' && (
            <motion.div 
              key="leads"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                <div className="relative flex-1 min-w-[300px]">
                  <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    placeholder="SCAN REGISTRY FOR NAME OR HANDLE..." 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-14 py-4 text-xs font-black uppercase tracking-widest focus:border-[#f97316] outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-zinc-500" />
                  <div className="flex bg-black/40 rounded-2xl border border-white/10 p-1">
                    {['all', 'new', 'contacted', 'partnered'].map((status) => (
                      <button 
                        key={status}
                        onClick={() => setLeadFilter(status)}
                        className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          leadFilter === status ? 'bg-[#f97316] text-black shadow-lg shadow-[#f97316]/20' : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Executive Identity</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Digital Uplink</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Status Protocol</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Capture Date</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.length > 0 ? filteredLeads.map((lead, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-all group">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-xl ${
                               lead.status === 'new' ? 'bg-[#f97316] text-black shadow-[#f97316]/20' : 'bg-white/5 text-zinc-500'
                             }`}>
                               {lead.fullName.charAt(0)}
                             </div>
                             <div>
                               <p className="font-black text-sm tracking-tight text-white uppercase">{lead.fullName}</p>
                               <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{lead.goal} Protocol</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <button 
                            onClick={() => copyToClipboard(lead.handle)}
                            className="flex items-center gap-2 text-zinc-400 hover:text-[#f97316] transition-colors text-xs font-bold font-mono"
                          >
                            {lead.handle}
                            <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </td>
                        <td className="px-10 py-8">
                          <select 
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(i, e.target.value as Lead['status'])}
                            className={`bg-black/40 border border-white/10 rounded-full px-5 py-2 text-[9px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer ${
                              lead.status === 'new' ? 'text-[#f97316] border-[#f97316]/30' : 
                              lead.status === 'partnered' ? 'text-green-500 border-green-500/30' : 'text-zinc-500'
                            }`}
                          >
                            <option value="new">NEW INBOUND</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="partnered">PARTNERED</option>
                            <option value="archived">ARCHIVED</option>
                          </select>
                        </td>
                        <td className="px-10 py-8 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                          {new Date(lead.date).toLocaleDateString()}
                        </td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all"><ExternalLink size={16} /></button>
                            <button 
                              onClick={() => handleDeleteLead(i)}
                              className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            ><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-10 py-40 text-center">
                          <div className="flex flex-col items-center gap-6 opacity-20">
                             <Users size={64} className="text-zinc-600" />
                             <p className="text-sm font-black uppercase tracking-[0.5em] text-zinc-500">Registry Empty • Secure Waiting State</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        {activeTab === 'portfolio' && (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Asset Editor Form */}
            <div className="lg:col-span-4">
              <div className="glass rounded-[2.5rem] p-10 border border-white/5 sticky top-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/5 blur-[60px] pointer-events-none" />
                <h3 className="text-2xl font-montserrat font-black mb-10 uppercase tracking-tighter flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${editingItem ? 'bg-blue-500 text-white' : 'bg-[#f97316] text-black'}`}>
                    {editingItem ? <Edit3 size={20} /> : <Plus size={20} />}
                  </div>
                  {editingItem ? 'Modify Protocol' : 'Deploy Production'}
                </h3>

                <form onSubmit={handleSaveItem} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-start gap-4"
                    >
                      <AlertCircle size={20} className="shrink-0" />
                      {error}
                    </motion.div>
                  )}
                  
                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2 block">Asset Designation</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black tracking-tight focus:border-[#f97316] transition-all outline-none placeholder:text-zinc-800 uppercase"
                      placeholder="ESTATE CORE NARRATIVE"
                      value={editingItem ? editingItem.title : newItem.title}
                      onChange={e => editingItem ? setEditingItem({...editingItem, title: e.target.value}) : setNewItem({...newItem, title: e.target.value})}
                    />
                  </div>

                  {/* Enhanced Upload Area */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2 block">Visual Core (Thumbnail)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative w-full aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden group ${
                        isUploading ? 'border-[#f97316] bg-[#f97316]/5' : 'border-white/10 bg-white/5 hover:border-[#f97316]/50 hover:bg-white/[0.07]'
                      }`}
                    >
                      {(editingItem?.url || newItem.url) && !isUploading ? (
                        <div className="absolute inset-0">
                          <img 
                            src={editingItem ? editingItem.url : newItem.url} 
                            className="w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all" 
                            alt="Preview" 
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <RefreshCw className="text-white mb-2" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white">Replace Asset</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-[#f97316]/10 flex items-center justify-center text-[#f97316] group-hover:scale-110 transition-transform">
                             <UploadCloud size={24} />
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Drop Master File</p>
                            <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 mt-1">PNG/JPG • MAX 2MB</p>
                          </div>
                        </>
                      )}

                      {isUploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 px-8">
                           <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                              <motion.div 
                                className="h-full bg-[#f97316]"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                              />
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-[#f97316] animate-pulse">
                              {uploadProgress < 100 ? `Synchronizing: ${uploadProgress}%` : 'Finalizing Uplink'}
                           </span>
                        </div>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    
                    <div className="flex items-center gap-4 mt-4 px-2">
                       <div className="h-px flex-1 bg-white/5" />
                       <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">OR USE EXTERNAL HASH</span>
                       <div className="h-px flex-1 bg-white/5" />
                    </div>

                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-bold focus:border-[#f97316] transition-all outline-none placeholder:https://images..."
                      placeholder="https://external-resource-link.com/asset.jpg"
                      value={editingItem ? editingItem.url : newItem.url}
                      onChange={e => editingItem ? setEditingItem({...editingItem, url: e.target.value}) : setNewItem({...newItem, url: e.target.value})}
                    />
                  </div>
                  
                  {/* Asset Type Toggle */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#f97316]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${((editingItem ? editingItem.isVideo : newItem.isVideo)) ? 'bg-[#f97316] text-black shadow-lg shadow-[#f97316]/30' : 'bg-white/5 text-zinc-600'}`}>
                        <Video size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest">Cinema Feed</span>
                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Protocol Active</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => editingItem ? setEditingItem({...editingItem, isVideo: !editingItem.isVideo}) : setNewItem({...newItem, isVideo: !newItem.isVideo})}
                      className={`w-12 h-6 rounded-full transition-all relative ${((editingItem ? editingItem.isVideo : newItem.isVideo)) ? 'bg-[#f97316]' : 'bg-zinc-800'}`}
                    >
                      <motion.div 
                        animate={{ x: ((editingItem ? editingItem.isVideo : newItem.isVideo)) ? 24 : 4 }}
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>

                  {/* Video URL Input */}
                  <AnimatePresence>
                    {((editingItem ? editingItem.isVideo : newItem.isVideo)) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 overflow-hidden"
                      >
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f97316] px-2 block flex items-center gap-2">
                          <Link2 size={12} /> Master Uplink ID (YT/VIMEO)
                        </label>
                        <input 
                          className="w-full bg-[#f97316]/5 border border-[#f97316]/20 rounded-2xl px-6 py-4 text-xs font-black focus:border-[#f97316] transition-all outline-none placeholder:VIMEO_SOURCE_ID text-white"
                          placeholder="PASTE FINISHED VIDEO URL"
                          value={editingItem ? editingItem.videoUrl : newItem.videoUrl}
                          onChange={e => editingItem ? setEditingItem({...editingItem, videoUrl: e.target.value}) : setNewItem({...newItem, videoUrl: e.target.value})}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Actions */}
                  <div className="flex gap-3">
                    {editingItem && (
                      <button 
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-[9px]"
                      >
                        Abort
                      </button>
                    )}
                    <button 
                      disabled={isUploading}
                      className={`flex-[2] py-4 font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all shadow-xl text-[9px] flex items-center justify-center gap-3 ${
                      editingItem ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-[#f97316] text-black shadow-[#f97316]/20'
                    } disabled:opacity-50 disabled:grayscale`}>
                      {isUploading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <>
                          <Zap size={14} />
                          {editingItem ? 'Update Registry' : 'Deploy Production'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Production Grid */}
            <div className="lg:col-span-8 space-y-8">
               <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-4">
                    <Clock size={16} className="text-[#f97316]" />
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">Fleet Deployment</h3>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">{portfolioItems.length} Units Active</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
                 {portfolioItems.map((item) => (
                   <motion.div 
                     layout
                     key={item.id} 
                     className="glass rounded-[2rem] overflow-hidden border border-white/5 group relative shadow-xl hover:border-[#f97316]/30 transition-all"
                   >
                     <div className="aspect-[16/9] relative overflow-hidden bg-black">
                       <img src={item.url} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000" alt="" />
                       
                       <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-[2px]">
                         <button 
                           onClick={() => setEditingItem(item)}
                           className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all hover:bg-[#f97316] shadow-2xl"
                         >
                           <Edit3 size={24} />
                         </button>
                         <button 
                           onClick={() => handleDeleteItem(item.id)}
                           className="w-14 h-14 bg-red-600/90 text-white rounded-2xl flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all hover:bg-red-500 shadow-2xl"
                         >
                           <Trash2 size={24} />
                         </button>
                       </div>

                       <div className="absolute top-6 left-6 flex gap-2">
                         {item.isVideo && (
                           <div className="bg-[#f97316] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">
                              Cinema
                           </div>
                         )}
                         <div className="bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                            {item.status || 'Active'}
                         </div>
                       </div>
                     </div>
                     <div className="p-8 bg-gradient-to-b from-transparent to-black/90">
                       <h4 className="text-xl font-black font-montserrat uppercase tracking-tight text-white mb-2 leading-none group-hover:text-[#f97316] transition-colors line-clamp-1">{item.title}</h4>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-4 h-[2px] bg-zinc-800" />
                            <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest truncate max-w-[150px]">
                              ID: {item.id}
                            </p>
                         </div>
                         <div className="text-zinc-700 group-hover:text-[#f97316] transition-colors">
                           {item.isVideo ? <Video size={16} /> : <ImageIcon size={16} />}
                         </div>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* Analytics & Settings remain as they were but wrapped in AnimatePresence */}
        {activeTab === 'analytics' && (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden h-[400px] flex flex-col">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 blur-[80px] -z-10" />
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                       <TrendingUp className="text-[#f97316]" size={20} />
                       <h3 className="font-montserrat font-black uppercase tracking-widest text-sm">Lead Velocity Engine</h3>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#f97316]">Real-time Processing</span>
                  </div>
                  
                  <div className="flex-1 flex items-end gap-3 pb-4">
                     {[40, 60, 30, 80, 50, 90, 100, 70, 85, 45, 95, 110].map((h, i) => (
                       <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1, ease: 'easeOut' }}
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-[#f97316]/10 via-[#f97316]/50 to-[#f97316] rounded-t-lg relative group"
                       >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}
                         </div>
                       </motion.div>
                     ))}
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-zinc-700 uppercase tracking-widest mt-4">
                     <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                  </div>
               </div>

               <div className="glass rounded-[3rem] p-10 border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#f97316]/5 to-transparent pointer-events-none" />
                  <div className="w-48 h-48 rounded-full border-8 border-white/5 flex items-center justify-center relative">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 1000" }}
                          animate={{ strokeDasharray: "450 1000" }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          cx="96" cy="96" r="88" fill="none" stroke="#f97316" strokeWidth="8" strokeDashcap="round" 
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-montserrat font-black text-white">82%</span>
                        <span className="text-[9px] font-black text-[#f97316] uppercase tracking-widest mt-2">Conversion Efficiency</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass rounded-[4rem] p-16 border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7c3aed]/5 blur-[120px] -z-10" />
               <div className="flex items-center gap-8 mb-16">
                  <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] border border-white/10 flex items-center justify-center text-[#f97316] shadow-2xl">
                     <Settings size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-montserrat font-black uppercase tracking-tighter mb-2">Operational Protocol</h3>
                    <p className="text-zinc-500 text-sm font-medium tracking-wide">Manage administrative core and global residential network encryption.</p>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-[#f97316]/30 transition-all cursor-default">
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-3">Principal Director</h4>
                      <p className="text-xl font-black tracking-tight uppercase">Shaun Michael Kukard</p>
                    </div>
                    <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-600 hover:text-white transition-all hover:scale-110"><Edit3 size={20} /></button>
                  </div>
                  
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-[#f97316]/30 transition-all cursor-default">
                    <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.5em] text-[#f97316] mb-3">Primary Secure Comms</h4>
                      <p className="text-xl font-black tracking-tight uppercase">SHAUNMICHAEL@GALAXYHIT.COM</p>
                    </div>
                    <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-600 hover:text-white transition-all hover:scale-110"><Edit3 size={20} /></button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </div>
  );
};

export default AdminHub;
