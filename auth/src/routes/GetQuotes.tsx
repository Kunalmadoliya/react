import {motion} from "framer-motion";

export default function AccessTerminal() {
  const uri = "https://quotes-sage-kappa.vercel.app";

  return (
    <div className="flex items-center justify-center p-4">
      <a
        href={uri}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-md outline-none group"
      >
        <motion.div
          whileHover={{y: -8}}
          whileTap={{scale: 0.98}}
          className="relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-1 overflow-hidden transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          {/* THE BENTO CONTAINER */}
          <div className="bg-[#0c0d0e] p-6 relative">
            {/* SCANLINE EFFECT */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(59,130,246,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* HEADER DATA */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                    Wisdom_Network_Active
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Oracle_Archive<span className="text-blue-500">_V2</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  THOUGHT_ID
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  REF-99-THOUGHT
                </span>
              </div>
            </div>

            {/* VISUAL PREVIEW BLOCK (QUOTES/LITERATURE THEMED) */}
            <div className="relative w-full aspect-video mb-8 bg-black border border-white/5 overflow-hidden group/image">
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
                alt="Vintage fountain pen"
                className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />

              {/* HUD / CROSSHAIR OVERLAYS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-blue-500/10 absolute top-1/2" />
                <div className="h-full w-[1px] bg-blue-500/10 absolute left-1/2" />
                <div className="w-24 h-24 border border-blue-500/20 rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite]">
                  <div className="w-full h-full border-b-2 border-blue-500/40 rounded-full" />
                </div>
                <div className="absolute w-2 h-2 bg-blue-500 shadow-[0_0_15px_#3b82f6] rounded-full" />
              </div>

              {/* URL TAG */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/90 backdrop-blur-xl border border-white/10">
                <span className="text-[8px] text-blue-400 font-mono tracking-tighter uppercase font-black">
                  SOURCE: {uri.replace("https://", "")}
                </span>
              </div>
            </div>

            {/* DESCRIPTION & FOOTER */}
            <div className="space-y-6 relative z-10">
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">
                Establishing uplink with the philosophical mainframe. Decoding
                literary syntax and legacy wisdom protocols. Initializing secure
                handshake with global quote repositories.
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">
                    Stream_Buffer
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest">
                      Live_Quotes
                    </span>
                    <div className="flex gap-0.5 ml-2">
                      <div className="w-1 h-3 bg-blue-500/60" />
                      <div className="w-1 h-3 bg-blue-500/40" />
                      <div className="w-1 h-3 bg-blue-500/20" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden group-hover:block animate-in fade-in slide-in-from-right-4 duration-300">
                    <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">
                      Extract_Wisdom
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
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
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5 group-hover:border-blue-500/50 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 group-hover:border-blue-500/50 transition-colors duration-500" />
          </div>
        </motion.div>
      </a>
    </div>
  );
}
