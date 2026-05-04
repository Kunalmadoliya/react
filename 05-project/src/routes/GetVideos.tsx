import {Link, createFileRoute} from "@tanstack/react-router";
import {motion} from "framer-motion";

export const Route = createFileRoute("/GetVideos")({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <a
      href="https://yt-projet.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-sm outline-none group"
    >
      <motion.div
        whileHover={{y: -4}}
        whileTap={{scale: 0.98}}
        className="relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/50 p-6 overflow-hidden transition-colors duration-300 shadow-2xl"
      >
        {/* TOP ACCENT LINE */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 group-hover:bg-blue-500 transition-colors duration-500" />

        {/* GLOW */}
        <div className="absolute -inset-24 bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
              System_Ready
            </span>
          </div>
          <span className="text-[10px] text-zinc-600 font-bold tracking-[0.2em] uppercase">
            YT_Project
          </span>
        </div>

        {/* CONTENT */}
        <div className="mb-10 relative z-10">
          <h3 className="text-2xl font-black text-white tracking-tighter mb-3 group-hover:text-blue-400 transition-colors">
            MEDIA_ARCHIVE
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Access streaming repository from deployed project.
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5 relative z-10">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">
              Action
            </span>
            <span className="text-[11px] text-zinc-300 uppercase font-bold tracking-widest group-hover:text-white transition-colors">
              Open_Project
            </span>
          </div>

          <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </a>
  );
}
