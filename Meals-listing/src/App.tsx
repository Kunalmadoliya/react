import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  [key: string]: any; // For dynamic ingredient access
}

export default function CulinaryManifest() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      // Using the FreeAPI endpoint format provided in your JSON
      const res = await fetch("https://api.freeapi.app/api/v1/public/meals?page=1&limit=10");
      const json = await res.json();
      setMeals(json.data.data);
    } catch (error) {
      console.error("DATA_LINK_FAILURE:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const activeMeal = meals[activeIndex];

  // Helper to extract ingredients from the messy API structure
  const getIngredients = (meal: Meal) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) list.push({ ing, meas });
    }
    return list;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent animate-spin" />
        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Synchronizing_Global_Palate</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-zinc-400 font-mono p-4 md:p-8 relative selection:bg-blue-500/30">
      {/* BACKGROUND HUD LAYER */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_2px,3px_100%]" />

      <main className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4">
        
        {/* LEFT: SELECTION REEL (SCROLLABLE) */}
        <aside className="col-span-12 lg:col-span-3 h-fit lg:h-[85vh] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-4 pb-2 border-b border-white/5">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Archive_Index</span>
            <h2 className="text-white font-black italic uppercase tracking-tighter">Meal_Entries</h2>
          </div>
          {meals.map((meal, idx) => (
            <button
              key={meal.idMeal}
              onClick={() => setActiveIndex(idx)}
              className={`w-full text-left p-4 transition-all border ${
                activeIndex === idx 
                ? "bg-white/[0.03] border-blue-500/40 text-white" 
                : "border-white/5 hover:border-white/10 text-zinc-500"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold opacity-30">0x0{idx + 1}</span>
                <span className="text-[8px] uppercase font-black">{meal.strArea}</span>
              </div>
              <p className="text-xs font-black uppercase mt-1 truncate">{meal.strMeal}</p>
            </button>
          ))}
        </aside>

        {/* CENTER: THE SCANNER (IMAGE & HUD) */}
        <section className="col-span-12 lg:col-span-5 space-y-4">
          <div className="relative aspect-square bg-black border border-white/10 overflow-hidden group">
             <AnimatePresence mode="wait">
                <motion.img
                  key={activeMeal?.idMeal}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  exit={{ opacity: 0 }}
                  src={activeMeal?.strMealThumb}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
             </AnimatePresence>

             {/* UI OVERLAY */}
             <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 border-t-2 border-l-2 border-blue-500/40" />
                  <div className="text-right">
                    <span className="block text-[8px] text-blue-500 font-black">SCAN_COORD: 51.5074° N</span>
                    <span className="text-[10px] text-white/40 font-mono">ID: {activeMeal?.idMeal}</span>
                  </div>
                </div>
                
                <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 translate-y-2">
                  <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
                    {activeMeal?.strMeal}
                  </h1>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[9px] bg-blue-500/20 text-blue-400 px-2 py-0.5 font-bold uppercase tracking-widest border border-blue-500/30">
                      {activeMeal?.strCategory}
                    </span>
                    <span className="text-[9px] bg-white/5 text-zinc-400 px-2 py-0.5 font-bold uppercase tracking-widest border border-white/10">
                      {activeMeal?.strArea}
                    </span>
                  </div>
                </div>
             </div>
          </div>

          {/* INGREDIENT GRID */}
          <div className="grid grid-cols-2 gap-2">
            {getIngredients(activeMeal).slice(0, 4).map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-3 flex justify-between items-center">
                <span className="text-[9px] text-zinc-500 uppercase font-bold">{item.ing}</span>
                <span className="text-[10px] text-white font-black italic">{item.meas}</span>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: INSTRUCTION TERMINAL */}
        <section className="col-span-12 lg:col-span-4 space-y-4">
          <div className="border border-white/5 bg-white/[0.01] p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Recipe_Manifest</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="flex-1 overflow-y-auto text-[11px] leading-relaxed text-zinc-400 space-y-4 pr-2 custom-scrollbar">
               {activeMeal?.strInstructions.split('\r\n').map((line, i) => (
                 line.trim() && (
                   <div key={i} className="flex gap-4 group">
                     <span className="text-blue-500/40 font-bold tabular-nums">0{i+1}</span>
                     <p className="group-hover:text-zinc-200 transition-colors uppercase tracking-tight font-medium">
                       {line}
                     </p>
                   </div>
                 )
               ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[8px] text-zinc-700 font-black uppercase mb-1">External_Stream</span>
                <a 
                  href={activeMeal?.strYoutube} 
                  target="_blank" 
                  className="text-[10px] text-red-500 font-black uppercase hover:underline"
                >
                  Watch_Training_Sim
                </a>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-zinc-700 font-black uppercase block">CRC_STATUS</span>
                <span className="text-[10px] text-green-500 font-black tracking-widest">VALIDATED</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* GLOBAL FOOTER METADATA */}
      <footer className="fixed bottom-0 left-0 w-full h-8 border-t border-white/5 bg-[#0c0d0e]/90 flex items-center justify-between px-6 z-[60]">
        <div className="flex gap-6">
          <span className="text-[8px] text-zinc-600 font-bold uppercase">System: Operational</span>
          <span className="text-[8px] text-zinc-600 font-bold uppercase">Source: TheMealDB_API</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[8px] text-blue-500 font-black uppercase tracking-widest">
            Uplink_Established // UK_PRJ_MEAL
          </span>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.5); }
      `}</style>
    </div>
  );
}