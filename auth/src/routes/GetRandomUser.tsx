import { motion } from "framer-motion";

interface UserProps {
  user: {
    name: { first: string; last: string };
    picture: { large: string };
    email: string;
    login: { username: string; uuid: string };
    location: { country: string };
    dob: { age: number };
    nat: string;
  };
}

const GetRandomUser = ({ user }: UserProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-6 transition-all duration-500 shadow-2xl flex flex-col h-full"
    >
      {/* --- TOP SYSTEM ACCENT --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-blue-500/50 transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-16 h-[1px] bg-blue-500/0 group-hover:bg-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[1px]" />

      {/* --- HEADER TELEMETRY --- */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
          <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-[0.3em]">
            Node_Verified
          </span>
        </div>
        <span className="text-[9px] text-zinc-700 font-mono tracking-widest uppercase">
          {user.nat} // {user.dob.age}Y
        </span>
      </div>

      {/* --- AVATAR SYSTEM --- */}
      <div className="relative w-full aspect-square mb-6 bg-black border border-white/5 overflow-hidden group/image">
        <img
          src={user.picture.large}
          alt={user.name.first}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px] pointer-events-none" />
        
        {/* CORNER BRACKETS */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />
      </div>

      {/* --- IDENTITY DATA --- */}
      <div className="space-y-5 flex-1 flex flex-col">
        <div>
          <span className="block text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">
            Identity_Handle
          </span>
          <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-tight group-hover:text-blue-400 transition-colors">
            {user.name.first} {user.name.last}
          </h2>
          <span className="text-[10px] text-blue-500/60 font-mono mt-1 block">
            @{user.login.username}
          </span>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5 mt-auto">
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-700 uppercase font-black tracking-[0.2em] mb-1">
              Data_Endpoint
            </span>
            <span className="text-[11px] text-zinc-400 truncate font-bold lowercase tracking-wider">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3">
            <div className="flex flex-col">
              <span className="text-[7px] text-zinc-600 uppercase font-black">Region</span>
              <span className="text-[10px] text-zinc-200 font-black uppercase tracking-tighter">
                {user.location.country}
              </span>
            </div>
            <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                className="text-zinc-500 group-hover:text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* --- DECORATIVE CORNER --- */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/5 group-hover:border-blue-500/40 transition-colors duration-500" />
    </motion.div>
  );
};

export default GetRandomUser;