import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/randomusers");
      const result = await response.json();
      setUsers(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter logic
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || user.login.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 p-6 md:p-12 font-mono selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SYSTEM HEADER --- */}
        <header className="mb-12 border-b border-white/10 pb-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.4em]">
                  Registry_Active // Node_Secure
                </span>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                User_Registry<span className="text-blue-500">.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-sm">
              <div className="text-right">
                <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest">Active_Records</span>
                <span className="text-xl font-black text-white tracking-tighter">{filteredUsers.length}</span>
              </div>
              <button
                onClick={() => fetchData()}
                className="h-10 px-5 bg-white text-black hover:bg-blue-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                Sync_Database
              </button>
            </div>
          </div>

          {/* --- SEARCH TERMINAL --- */}
          <div className="relative group max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-blue-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input
              type="text"
              placeholder="SEARCH_BY_IDENTITY_OR_HANDLE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none py-4 pl-12 pr-6 text-sm font-bold tracking-widest text-white transition-all placeholder:text-zinc-700 uppercase"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-zinc-600 font-black">
              FILTER_MODE
            </div>
          </div>
        </header>

        {/* --- USER GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredUsers.map((user) => (
              <motion.div
                layout
                key={user.login.uuid}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[#0c0d0e] border border-white/10 hover:border-blue-500/40 p-6 transition-all duration-500 shadow-2xl flex flex-col"
              >
                {/* TOP ACCENT */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-blue-500/50 transition-colors" />
                
                {/* AVATAR SYSTEM */}
                <div className="relative w-24 h-24 mb-6 bg-black border border-white/10 overflow-hidden shrink-0">
                  <img
                    src={user.picture.large}
                    alt={user.name.first}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>

                {/* IDENTITY DATA */}
                <div className="space-y-6 flex-1 flex flex-col">
                  <div>
                    <span className="block text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">
                      ID: {user.login.username}
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-blue-400 transition-colors leading-tight">
                      {user.name.first} {user.name.last}
                    </h2>
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-5 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Endpoint</span>
                      <span className="text-xs text-zinc-300 truncate font-bold">
                        {user.email}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/[0.02] p-3 border border-white/5">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black mb-1">Origin</span>
                        <span className="text-[11px] text-zinc-200 font-black tracking-tight truncate">{user.location.country}</span>
                      </div>
                      <div className="bg-white/[0.02] p-3 border border-white/5">
                        <span className="block text-[8px] text-zinc-600 uppercase font-black mb-1">Age</span>
                        <span className="text-[11px] text-zinc-200 font-black">{user.dob.age}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DECORATIVE CORNER */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/5 group-hover:border-blue-500/40 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- EMPTY / LOADING STATES --- */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-white/[0.02] border border-dashed border-white/10 animate-pulse rounded-sm" />
            ))}
          </div>
        )}

        {!isLoading && filteredUsers.length === 0 && (
          <div className="py-32 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-[1px] bg-zinc-800" />
            <p className="text-xs text-zinc-600 uppercase tracking-[0.5em] animate-pulse">
              Zero_Matches_Found // Reset_Search_Query
            </p>
            <div className="w-12 h-[1px] bg-zinc-800" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;