import { motion } from "framer-motion";

export default function AccessTerminal() {
  const uri = "https://product-ten-swart.vercel.app";

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
            {/* SCANLINE EFFECT */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* HEADER DATA */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                    Active_Connection
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Registry_V2
                </h2>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  Node_ID
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  PRD-7700-TX
                </span>
              </div>
            </div>

            {/* VISUAL PREVIEW BLOCK */}
            <div className="relative w-full aspect-video mb-8 bg-black border border-white/5 overflow-hidden group/image">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                alt="Product Preview"
                className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              />
              
              {/* CROSSHAIR OVERLAYS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-white/5 absolute top-1/2" />
                <div className="h-full w-[1px] bg-white/5 absolute left-1/2" />
                <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                </div>
              </div>

              {/* URL TAG */}
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[8px] text-blue-400 font-mono tracking-tighter uppercase">
                  Route: {uri.replace("https://", "")}
                </span>
              </div>
            </div>

            {/* DESCRIPTION & FOOTER */}
            <div className="space-y-6 relative z-10">
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">
                Redirecting to core product management system. Initializing handshake with production-grade UI components and inventory logic.
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">
                    Authorization
                  </span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest">
                    Standard_Access
                  </span>
                </div>

                <div className="flex items-center gap-4">
                   <div className="hidden group-hover:block animate-in fade-in slide-in-from-right-4">
                      <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">
                        Initialize_Link
                      </span>
                   </div>
                   <div className="w-12 h-12 bg-white text-black flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg
                      width="20"
                      height="20"
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
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5 group-hover:border-blue-500/50 transition-colors" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 group-hover:border-blue-500/50 transition-colors" />
          </div>
        </motion.div>
      </a>
    </div>
  );
}