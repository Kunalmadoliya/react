import { motion } from "framer-motion";

export default function AccessTerminal() {
  const uri = "https://random-users-lovat-five.vercel.app";

  return (
    <div className="flex items-center justify-center p-4">
      <a
        href={uri}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-md outline-none group"
      >
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
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
                    Personnel_Sync_Active
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  User_Registry<span className="text-blue-500">_V2</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  CORE_UPLINK
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  BIO-AUTH-04
                </span>
              </div>
            </div>

            {/* VISUAL PREVIEW BLOCK (HUMAN/BIOMETRIC THEMED) */}
            <div className="relative w-full aspect-video mb-8 bg-black border border-white/5 overflow-hidden group/image">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Portrait for identification"
                className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />

              {/* BIOMETRIC HUD OVERLAYS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-blue-500/20 absolute top-1/4 animate-pulse" />
                <div className="w-full h-[1px] bg-blue-500/20 absolute top-3/4 animate-pulse" />
                <div className="w-32 h-32 border-2 border-blue-500/10 flex items-center justify-center">
                   <div className="w-full h-[1px] bg-blue-500/40 animate-[bounce_2s_infinite]" />
                </div>
                {/* Facial Recognition Points */}
                <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              </div>

              {/* URL TAG */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/90 backdrop-blur-xl border border-white/10">
                <span className="text-[8px] text-blue-400 font-mono tracking-tighter uppercase font-black">
                  HOST: {uri.replace("https://", "")}
                </span>
              </div>
            </div>

            {/* DESCRIPTION & FOOTER */}
            <div className="space-y-6 relative z-10">
              <p className="text-[11px] text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">
                Pulling verified identities from the distributed social 
                mesh. Synchronizing biometric signatures, location telemetry, 
                and communication protocols for randomized entity generation.
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">
                    Identity_Status
                  </span>
                  <div className="flex gap-1 items-center">
                    <span className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest">
                      Live_Profiles
                    </span>
                    <div className="flex gap-0.5 ml-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                       <span className="text-[9px] text-blue-500/70 font-black">ENCRYPTED</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden group-hover:block animate-in fade-in slide-in-from-right-4 duration-300">
                    <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">
                      Fetch_Entities
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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