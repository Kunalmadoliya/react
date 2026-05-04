import {useNavigate, createFileRoute} from "@tanstack/react-router";
import { useEffect, useState} from "react";
import GetVideos from "./GetVideos";

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
          <div className="text-center p-12 border border-dashed border-white/10 bg-white/[0.02]">
            {user ? (
              <GetVideos />
            ) : (
              <p className="text-xs text-zinc-500 uppercase tracking-[0.4em] animate-pulse">
                System_Operational // Awaiting_Module
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
