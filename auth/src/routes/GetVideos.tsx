import {createFileRoute} from "@tanstack/react-router";
import {motion} from "framer-motion";

export const Route = createFileRoute("/GetVideos")({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <div className="flex items-center justify-center p-4">
      <a
        href="https://youtube-zeta-ivory.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-md outline-none group"
      >
        <motion.div
          whileHover={{y: -5}}
          whileTap={{scale: 0.98}}
          className="relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-1 overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full"
        >
          {/* THE BENTO CONTAINER */}
          <div className="bg-[#0c0d0e] p-6 relative flex flex-col h-full">
            {/* TOP ACCENT LINE */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 group-hover:bg-blue-500 transition-colors duration-500" />

            {/* SCANLINE / GLOW EFFECT */}
            <div className="absolute -inset-24 bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

            {/* HEADER DATA */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                    System_Ready
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                  Media_Archive
                </h2>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-zinc-600 font-bold uppercase tracking-widest">
                  Project_ID
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  YT-NODE-01
                </span>
              </div>
            </div>

            {/* VISUAL PREVIEW BLOCK */}
            <div className="relative w-full aspect-video mb-8 bg-black border border-white/5 overflow-hidden group/image z-10">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
                alt="YouTube Project Display"
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />

              {/* PLAY BUTTON OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-10 bg-red-600/90 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-all duration-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* DURATION / STATUS BADGE */}
              <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 text-[9px] font-bold text-white border border-white/10 font-mono tracking-widest">
                LIVE_STREAM
              </div>
            </div>

            {/* DESCRIPTION & FOOTER */}
            <div className="space-y-6 relative z-10 flex-1 flex flex-col">
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Access the decentralized streaming repository. Connect to the
                deployed YouTube interface to view visual assets and video
                telemetry.
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                <div>
                  <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">
                    Authorization
                  </span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Initialize_Client
                  </span>
                </div>

                <div className="w-12 h-12 bg-white/5 border border-white/10 text-zinc-400 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CORNER DECORATION */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 group-hover:border-blue-500/50 transition-colors" />
          </div>
        </motion.div>
      </a>
    </div>
  );
}
