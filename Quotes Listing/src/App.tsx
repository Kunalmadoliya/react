import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Updated type to match your specific JSON structure
type Quote = {
  id: number;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
  dateAdded: string;
};

const App = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/quotes?page=${randomPage}&limit=9`,
      );
      const result = await response.json();
      
      // MAPPING LOGIC: result.data.data is the array of quote objects
      if (result.data && result.data.data) {
        setQuotes(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 p-6 md:p-12 font-mono selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-16 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.4em]">
                Registry_Stable // Quote_Link_Active
              </span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
              Insight_Log<span className="text-blue-500">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-sm">
            <div className="text-right">
              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest">Buffer_State</span>
              <span className="text-xl font-black text-white tracking-tighter italic">
                {isLoading ? "00" : quotes.length} <span className="text-[10px] text-zinc-500 not-italic uppercase">Entries</span>
              </span>
            </div>
            <button
              onClick={fetchQuotes}
              disabled={isLoading}
              className="h-12 px-6 bg-white text-black hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all text-[11px] font-black uppercase tracking-widest"
            >
              {isLoading ? "Fetching_Payload..." : "Refresh_Feed"}
            </button>
          </div>
        </header>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {!isLoading ? (
              quotes.map((quote) => (
                <motion.div
                  layout
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-8 transition-all duration-500 shadow-2xl flex flex-col h-full overflow-hidden"
                >
                  {/* TOP ACCENT */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-blue-500/50 transition-colors" />

                  {/* DATA METADATA */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                      <span className="block text-[8px] text-zinc-700 font-black uppercase tracking-widest">Block_Address</span>
                      <span className="text-[10px] text-zinc-500 font-mono">0x7F_{quote.id}</span>
                    </div>
                    <div className="flex gap-2">
                      {quote.tags.map(tag => (
                        <span key={tag} className="text-[7px] border border-white/10 px-1.5 py-0.5 text-zinc-600 uppercase font-bold group-hover:border-blue-500/30 group-hover:text-blue-500/50 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* QUOTE CONTENT */}
                  <div className="flex-1 space-y-6">
                    <p className="text-[14px] md:text-sm text-zinc-200 leading-relaxed font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                      "{quote.content}"
                    </p>

                    <div className="pt-6 border-t border-white/5 flex flex-col gap-4 mt-auto">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="block text-[8px] text-zinc-700 uppercase font-black tracking-widest mb-1">Source_Entity</span>
                          <span className="text-[11px] text-blue-500 font-black uppercase tracking-tighter">
                            {quote.author}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[8px] text-zinc-800 uppercase font-black mb-0.5">Length</span>
                          <span className="text-[10px] text-zinc-600 font-mono font-black">{quote.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DECORATIVE TERMINAL CORNER */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 group-hover:border-blue-500/40 transition-colors" />
                </motion.div>
              ))
            ) : (
              // LOADING SKELETONS
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-white/[0.02] border border-dashed border-white/10 animate-pulse rounded-sm" />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* --- EMPTY STATE --- */}
        {!isLoading && quotes.length === 0 && (
          <div className="py-40 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
            <p className="text-xs text-zinc-700 uppercase tracking-[0.5em] animate-pulse">
              System_Halt // No_Data_Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;