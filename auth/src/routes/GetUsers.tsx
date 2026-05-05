import {useNavigate, createFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import GetVideos from "./GetVideos";
import GetProduct from "./GetProduct";

export const Route = createFileRoute("/GetUsers")({
  component: RouteComponent,
});

type User = {
  username?: string;
  email?: string;
};

const NavAnchor = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`h-full border-x border-white/5 bg-[#0c0d0e] relative overflow-hidden flex items-center px-6 ${className}`}
  >
    <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
    <div className="relative z-10 flex items-center gap-4">{children}</div>
  </div>
);

export default function RouteComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"SYNCING" | "STABLE" | "OFFLINE">(
    "SYNCING",
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("OFFLINE");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/users/current-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
          setStatus("STABLE");
        } else {
          setStatus("OFFLINE");
          navigate({to: "/Login"});
        }
      } catch (err) {
        console.error("SYS_FETCH_ERR", err);
        setStatus("OFFLINE");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({to: "/Login"});
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#a1a1aa] font-mono selection:bg-blue-500 selection:text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-20 [background-image:radial-gradient(#444_1px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

      {/* FIXED NAVBAR - SCALED FOR LEGIBILITY */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-[#0c0d0e]/90 backdrop-blur-md border-b border-white/10 z-[100] flex justify-between items-stretch">
        {/* LEFT: BRANDING (Scaled Up) */}
        <NavAnchor className="border-l-0">
          <div className="flex items-center gap-4">
            {/* Increased logo size and font */}
            <div className="w-8 h-8 border border-white/30 flex items-center justify-center text-[11px] font-black text-white">
              AUTH
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold tracking-widest text-white uppercase leading-none">
                FreeAPI // System
              </span>
              <span className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-bold mt-1">
                Cohort_2026
              </span>
            </div>
          </div>
        </NavAnchor>

        {/* MIDDLE: USER IDENTITY (Increased visibility) */}
        <div className="flex-1 flex items-center px-8 border-x border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
              Session_Owner:
            </span>
            <span className="text-xs text-blue-400 font-bold tracking-tight">
              {user ? user.username?.toUpperCase() : "IDENTIFYING..."}
            </span>
          </div>
        </div>

        {/* RIGHT: SYSTEM STATUS & TERMINATE */}
        <NavAnchor className="border-r-0">
          <div className="hidden sm:flex flex-col items-end mr-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">
                Status
              </span>
              <div
                className={`w-2 h-2 rounded-full ${status === "STABLE" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-red-500"} animate-pulse`}
              />
            </div>
            <span className="text-[11px] text-zinc-400 font-bold">
              {status}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="group relative px-5 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative z-10 text-[11px] font-black text-zinc-300 group-hover:text-red-500 uppercase tracking-[0.15em]">
              Terminate
            </span>
          </button>
        </NavAnchor>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 pt-20 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-6">
            {user ? (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
                {/* SYSTEM HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 gap-4">
                  <div>
                    <p className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">
                      Module_Deployment // 02_Units_Active
                    </p>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                      Project_Registry
                    </h2>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <span className="block text-[8px] text-zinc-600 uppercase font-bold tracking-widest">
                        Environment
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        PRODUCTION_ALPHA
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-600 uppercase font-bold tracking-widest">
                        Latency
                      </span>
                      <span className="text-[10px] text-emerald-500 font-mono">
                        14MS // STABLE
                      </span>
                    </div>
                  </div>
                </div>

                {/* GRID LAYOUT FOR CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
                  <div className="flex flex-col h-full">
                    <GetVideos />
                    <p className="mt-4 text-[9px] text-zinc-600 font-mono uppercase tracking-tight px-2">
                      Ref: 01 // Streaming_Engine_V2
                    </p>
                  </div>
                  <div className="flex flex-col h-full">
                    <GetProduct />
                    <p className="mt-4 text-[9px] text-zinc-600 font-mono uppercase tracking-tight px-2">
                      Ref: 02 // Ecomm_Logistics_Module
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* LOADING STATE */
              <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-6" />
                  <p className="text-xs text-zinc-500 uppercase tracking-[0.5em] animate-pulse font-black">
                    System_Operational // Awaiting_Auth_Handshake
                  </p>
                  <p className="mt-2 text-[10px] text-zinc-700 font-mono">
                    TRACING_ROUTE... [OK]
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
