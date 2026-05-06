import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FelineIntelligenceArchive() {
  const [cat, setCat] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const fetchCat = async () => {
    setIsSyncing(true);
    try {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/cats/cat/random?page=${randomNumber}&limit=10`
      );
      const json = await res.json();
      setCat(json.data);
      if (json.data?.name) {
        setScanHistory((prev) => [json.data.name, ...prev].slice(0, 5));
      }
    } catch (error) {
      console.error("SYS_CRITICAL_FAULT:", error);
    } finally {
      setTimeout(() => setIsSyncing(false), 1000);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-zinc-400 font-mono selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* GLOBAL SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_4px,4px_100%]" />

      {/* TOP NAVIGATION BAR */}
      <nav className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0c0d0e]/80 backdrop-blur-xl sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
          <span className="text-[11px] font-black tracking-[0.3em] text-white uppercase">
            Bio_Archive // Neural_Link_Active
          </span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest hidden md:block">
            Node: 0xUK_SOUTH_1
          </span>
          <button 
            onClick={fetchCat}
            disabled={isSyncing}
            className="px-4 py-1.5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20"
          >
            {isSyncing ? "SYNCING..." : "RE_SCAN_SUBJECT"}
          </button>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-4 md:p-8 grid grid-cols-12 gap-6">
        
        {/* LEFT SIDEBAR: BIOMETRIC TELEMETRY */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <section className="border border-white/5 bg-white/[0.02] p-5">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 flex justify-between">
              <span>Biometric_Specs</span>
              <span className="text-zinc-700">01</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Origin", value: cat?.origin || "Loading..." },
                { label: "Life_Span", value: `${cat?.life_span || "0"} Years` },
                { label: "Weight", value: `${cat?.weight?.metric || "0"} KG` },
                { label: "Adaptability", value: `${cat?.adaptability}/5` },
                { label: "Intelligence", value: `${cat?.intelligence}/5` },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/[0.03] pb-2">
                  <span className="text-[9px] text-zinc-600 uppercase font-bold">{item.label}</span>
                  <span className="text-[11px] text-zinc-300 font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-white/5 bg-white/[0.02] p-5">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">
              Recent_Detections
            </h3>
            <div className="space-y-2">
              {scanHistory.map((name, i) => (
                <div key={i} className="text-[10px] text-zinc-500 py-1 border-l-2 border-blue-500/20 pl-3">
                   {name.toUpperCase()} <span className="opacity-30 text-[8px]">...REC_0{i}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* CENTER: PRIMARY SUBJECT SCANNER */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <div className="relative aspect-[16/10] bg-black border border-white/10 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={cat?.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: isSyncing ? 0.2 : 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                src={cat?.image}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
            </AnimatePresence>

            {/* HUD SCANNER ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/20 shadow-[0_0_15px_#3b82f6]" />
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-blue-500/20 shadow-[0_0_15px_#3b82f6]" />
              
              {/* CORNER BRACKETS */}
              <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/10 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/10 group-hover:border-blue-500/40 transition-colors" />
              
              {/* ANIMATED DATA OVERLAY */}
              <div className="absolute bottom-6 right-6 text-right">
                <span className="block text-[8px] text-blue-500/40 uppercase font-black tracking-widest">Tracking_Mode: Auto</span>
                <span className="text-[12px] text-blue-500 font-mono">X: 124.55 Y: 882.10</span>
              </div>
            </div>

            {/* SUBJECT NAME TAG */}
            <div className="absolute bottom-0 left-0 p-8">
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-6xl font-black text-white italic tracking-tighter uppercase"
              >
                {cat?.name || "Searching..."}
              </motion.h1>
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-blue-500 font-black tracking-[0.2em] uppercase bg-blue-500/10 px-3 py-1">
                  Subject_Status: {isSyncing ? "SYNCING" : "VERIFIED"}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-white/5 bg-white/[0.01] p-8 relative">
            <div className="absolute top-0 left-10 w-20 h-1 bg-blue-500" />
            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-4">Biological_Summary</h4>
            <p className="text-lg md:text-xl text-zinc-300 font-bold uppercase leading-tight tracking-tight italic">
              {cat?.description || "Initial data handshake required for subject classification..."}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR: BEHAVIORAL ANALYSIS */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <section className="border border-white/5 bg-white/[0.02] p-5 h-full">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">
              Neural_Profile
            </h3>
            
            <div className="space-y-6">
              <div>
                <span className="text-[8px] text-zinc-600 font-black uppercase block mb-3">Temperament_Analysis</span>
                <div className="flex flex-wrap gap-2">
                  {cat?.temperament?.split(",").map((t: string, i: number) => (
                    <span key={i} className="text-[9px] px-2 py-1 bg-zinc-800 text-zinc-400 border border-white/5 uppercase font-bold">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <span className="text-[8px] text-zinc-600 font-black uppercase block mb-3">Health_Risk_Index</span>
                <div className="w-full h-8 bg-zinc-900 border border-white/5 p-1 relative">
                  <div 
                    className="h-full bg-red-500/40 transition-all duration-1000" 
                    style={{ width: `${(cat?.health_issues || 0) * 20}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-white">
                    LVL_0{cat?.health_issues || 0}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 opacity-40">
                <span className="text-[8px] text-zinc-600 font-black uppercase block mb-3">Vocalization_Link</span>
                <div className="flex items-end gap-1 h-8">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isSyncing ? [2, 10, 2] : [4, 12, 4] }}
                      transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                      className="flex-1 bg-blue-500/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </aside>
      </main>

      {/* FOOTER METADATA */}
      <footer className="fixed bottom-0 left-0 w-full h-8 border-t border-white/5 bg-[#0c0d0e]/90 flex items-center justify-between px-6 z-[60]">
        <div className="flex gap-6">
          <span className="text-[8px] text-zinc-600 font-bold uppercase">System: Operational</span>
          <span className="text-[8px] text-zinc-600 font-bold uppercase">CRC: 0x882_VALID</span>
        </div>
        <span className="text-[8px] text-blue-500 font-black uppercase animate-pulse">
          Connection_Stable // Secure_Uplink
        </span>
      </footer>
    </div>
  );
}