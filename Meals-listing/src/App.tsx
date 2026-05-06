import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: any;
}

export default function CulinaryManifest() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    setLoading(true);
    setActiveIndex(0); // Reset focus on new data pull
    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/meals?page=${randomPage}&limit=10`,
      );
      const json = await res.json();
      setMeals(json.data.data);
    } catch (error) {
      console.error("DATA_LINK_FAILURE:", error);
    } finally {
      // Small delay to appreciate the "Elite" loading sequence
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const activeMeal = meals[activeIndex];

  const getIngredients = (meal: Meal) => {
    const list = [];
    if (!meal) return [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) list.push({ing, meas});
    }
    return list;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] animate-pulse">
              Syncing_Global_Data
            </span>
            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
              Establishing_Secure_Handshake...
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-zinc-400 font-mono p-4 md:p-8 relative selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_2px,3px_100%]" />

      <main className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4">
        {/* LEFT: SELECTION REEL */}
        <aside className="col-span-12 lg:col-span-3 h-fit lg:h-[85vh] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-4 pb-2 border-b border-white/5 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                Archive_Index
              </span>
              <h2 className="text-white font-black italic uppercase tracking-tighter">
                Meal_Entries
              </h2>
            </div>
            {/* REFRESH ACTION BUTTON */}
            <button
              onClick={fetchMeals}
              className="group flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500 hover:text-black transition-all"
            >
              <svg
                className="w-3 h-3 group-active:rotate-180 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-[9px] font-black uppercase tracking-tighter">
                Re_Sync
              </span>
            </button>
          </div>

          {meals.map((meal, idx) => (
            <button
              key={meal.idMeal}
              onClick={() => setActiveIndex(idx)}
              className={`w-full text-left p-4 transition-all border ${
                activeIndex === idx
                  ? "bg-white/[0.03] border-blue-500/40 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "border-white/5 hover:border-white/10 text-zinc-500"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold opacity-30">
                  0x0{idx + 1}
                </span>
                <span className="text-[8px] uppercase font-black">
                  {meal.strArea}
                </span>
              </div>
              <p className="text-xs font-black uppercase mt-1 truncate">
                {meal.strMeal}
              </p>
            </button>
          ))}
        </aside>

        {/* CENTER: THE SCANNER */}
        <section className="col-span-12 lg:col-span-5 space-y-4">
          <div className="relative aspect-square bg-black border border-white/10 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeMeal?.idMeal}
                initial={{opacity: 0, scale: 1.1, filter: "blur(10px)"}}
                animate={{opacity: 0.7, scale: 1, filter: "blur(0px)"}}
                exit={{opacity: 0}}
                src={activeMeal?.strMealThumb}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
            </AnimatePresence>

            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 border-t-2 border-l-2 border-blue-500/40" />
                <div className="text-right">
                  <span className="block text-[8px] text-blue-500 font-black">
                    SCAN_COORD: 51.5074° N
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    ID: {activeMeal?.idMeal || "NULL"}
                  </span>
                </div>
              </div>

              <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 translate-y-2">
                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                  {activeMeal?.strMeal || "Accessing..."}
                </h1>
                <div className="flex gap-4 mt-2">
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 font-bold uppercase tracking-widest border border-blue-500/30">
                    {activeMeal?.strCategory || "Pending"}
                  </span>
                  <span className="text-[9px] bg-white/5 text-zinc-400 px-2 py-0.5 font-bold uppercase tracking-widest border border-white/10">
                    {activeMeal?.strArea || "Global"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {getIngredients(activeMeal)
              .slice(0, 4)
              .map((item, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/5 p-3 flex justify-between items-center group hover:border-blue-500/30 transition-colors"
                >
                  <span className="text-[9px] text-zinc-500 uppercase font-bold group-hover:text-blue-400 transition-colors">
                    {item.ing}
                  </span>
                  <span className="text-[10px] text-white font-black italic">
                    {item.meas}
                  </span>
                </div>
              ))}
          </div>
        </section>

        {/* RIGHT: INSTRUCTION TERMINAL */}
        <section className="col-span-12 lg:col-span-4 space-y-4">
          <div className="border border-white/5 bg-white/[0.01] p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                Recipe_Manifest
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="flex-1 overflow-y-auto text-[11px] leading-relaxed text-zinc-400 space-y-4 pr-2 custom-scrollbar">
              {activeMeal?.strInstructions?.split("\r\n").map(
                (line, i) =>
                  line.trim() && (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-blue-500/40 font-bold tabular-nums">
                        0{i + 1}
                      </span>
                      <p className="group-hover:text-zinc-200 transition-colors uppercase tracking-tight font-medium">
                        {line}
                      </p>
                    </div>
                  ),
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[8px] text-zinc-700 font-black uppercase mb-1">
                  External_Stream
                </span>
                <a
                  href={activeMeal?.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-red-500 font-black uppercase hover:underline"
                >
                  Watch_Training_Sim
                </a>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-zinc-700 font-black uppercase block">
                  CRC_STATUS
                </span>
                <span className="text-[10px] text-green-500 font-black tracking-widest">
                  VALIDATED
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full h-8 border-t border-white/5 bg-[#0c0d0e]/90 flex items-center justify-between px-6 z-[60]">
        <div className="flex gap-6">
          <span className="text-[8px] text-zinc-600 font-bold uppercase">
            System: Operational
          </span>
          <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-tighter">
            DATA_KEY: {activeMeal?.idMeal || "NULL"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
          <span className="text-[8px] text-blue-500 font-black uppercase tracking-widest">
            Uplink_Established // UK_PRJ_MEAL
          </span>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.4); }
      `}</style>
    </div>
  );
}
