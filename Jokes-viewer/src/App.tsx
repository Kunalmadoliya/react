import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";

interface Joke {
  id: number;
  content: string;
  categories: string[];
}

const App = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJokes = async () => {
    setIsLoading(true);
    try {
      const randomPage = Math.floor(Math.random() * 50) + 1;
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomjokes?page=${randomPage}&limit=20`,
      );
      const result = await response.json();
      setJokes(result.data.data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 p-6 md:p-12 font-mono selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-16 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
              <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.4em]">
                Archive_Link_Active // Randomized_Pull
              </span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
              Joke_Repository<span className="text-blue-500">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-sm">
            <div className="text-right">
              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest">
                Entry_Buffer
              </span>
              <span className="text-xl font-black text-white tracking-tighter">
                {jokes.length} Units
              </span>
            </div>
            <button
              onClick={fetchJokes}
              disabled={isLoading}
              className="h-12 px-6 bg-white text-black hover:bg-blue-600 hover:text-white disabled:opacity-50 transition-all text-[11px] font-black uppercase tracking-widest"
            >
              {isLoading ? "Synchronizing..." : "Sync_New_Batch"}
            </button>
          </div>
        </header>

        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {!isLoading
              ? jokes.map((j) => (
                  <motion.div
                    layout
                    key={j.id}
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.95}}
                    whileHover={{y: -5}}
                    className="group relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-8 transition-all duration-500 shadow-2xl flex flex-col h-full overflow-hidden"
                  >
                    {/* TOP TELEMETRY */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-blue-500/50 transition-colors" />

                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1">
                        <span className="block text-[8px] text-zinc-700 font-black uppercase tracking-widest">
                          Address_ID
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          0x{j.id.toString(16).toUpperCase().padStart(4, "0")}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {j.categories.length > 0 ? (
                          j.categories.map((cat) => (
                            <span
                              key={cat}
                              className={`text-[8px] px-2 py-0.5 font-black uppercase tracking-tighter border ${
                                cat === "explicit"
                                  ? "border-red-500/30 text-red-500 bg-red-500/5"
                                  : "border-blue-500/30 text-blue-500 bg-blue-500/5"
                              }`}
                            >
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="text-[8px] text-zinc-700 border border-white/5 px-2 py-0.5 uppercase font-bold italic">
                            Standard_Output
                          </span>
                        )}
                      </div>
                    </div>

                    {/* JOKE CONTENT */}
                    <div className="flex-1 space-y-6">
                      <div className="relative">
                        {/* Decorative quote mark */}
                        <span className="absolute -top-4 -left-2 text-4xl font-black text-white/[0.03] select-none">
                          "
                        </span>
                        <p className="text-[14px] md:text-sm text-zinc-200 leading-relaxed font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                          {j.content}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-zinc-800 uppercase font-black tracking-widest">
                            Integrity_Check
                          </span>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 ${i < 4 ? "bg-blue-500/40" : "bg-white/5"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-[9px] text-zinc-800 font-black">
                          CRC_{j.content.length}
                        </div>
                      </div>
                    </div>

                    {/* CORNER BRACKET */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/5 group-hover:border-blue-500/40 transition-colors" />
                  </motion.div>
                ))
              : // SKELETON LOADER
                [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-white/[0.01] border border-dashed border-white/10 animate-pulse rounded-sm"
                  />
                ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
