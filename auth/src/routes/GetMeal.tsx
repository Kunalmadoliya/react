import { motion } from "framer-motion";

export default function MealOneTerminal() {
  const uri = "https://meals-list-one.vercel.app";

  return (
    <div className="flex items-center justify-center p-4">
      <a
        href={uri}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-md outline-none group"
      >
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-1 overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* THE BENTO CONTAINER */}
          <div className="bg-[#0c0d0e] p-6 relative">
            {/* SCANLINE HUD EFFECT */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* HEADER DATA: SYSTEM METRICS */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">
                    Registry_Sync_Active
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
                  Meal_Archive_01
                </h2>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  Class_Type
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  CUL-990-ALPHA
                </span>
              </div>
            </div>

            {/* VISUAL PREVIEW: CULINARY VIEWPORT */}
            <div className="relative w-full aspect-[16/10] mb-6 bg-black border border-white/5 overflow-hidden group/image">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                alt="Culinary Discovery"
                className="w-full h-full object-cover opacity-50 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              />
              
              {/* HUD OVERLAY: TARGETING BRACKETS */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-blue-500 transition-colors" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 group-hover:border-blue-500 transition-colors" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 group-hover:border-blue-500 transition-colors" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-blue-500 transition-colors" />
              </div>

              {/* DATA TAG */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[8px] text-blue-400 font-mono tracking-tighter uppercase">
                  Uplink: {uri.replace("https://", "")}
                </span>
              </div>
            </div>

            {/* MANIFEST DESCRIPTION */}
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                   System_Manifest
                </span>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight border-l-2 border-white/5 pl-3">
                  Accessing centralized culinary database. Decrypting regional recipes and nutritional metadata for high-density production environments.
                </p>
              </div>

              {/* FOOTER ACTION: HANDSHAKE */}
              <div className="flex items-center justify-between border-t border-white/5 pt-5">
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">
                    Security_Clearance
                  </span>
                  <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    Authorized
                  </span>
                </div>

                <div className="flex items-center gap-4">
                   <div className="hidden group-hover:block animate-in fade-in slide-in-from-right-4">
                      <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">
                        Execute_Load
                      </span>
                   </div>
                   <div className="w-10 h-10 bg-white text-black flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* CORNER ACCENTS */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/5 group-hover:border-blue-500/50 transition-colors" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/5 group-hover:border-blue-500/50 transition-colors" />
          </div>
        </motion.div>
      </a>
    </div>
  );
}