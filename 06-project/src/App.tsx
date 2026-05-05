import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function StreamInterface() {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("javascript");
  const [inputValue, setInputValue] = useState("");

  const fetchData = async (pageNum: number, query: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNum}&limit=12&query=${query}`,
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
        setVideos((prev) =>
          pageNum === 1 ? data.data.data : [...prev, ...data.data.data],
        );
        setHasMore(data.data.nextPage);
      }
    } catch (err) {
      console.error("SYS_STREAM_ERR", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch on query change
  useEffect(() => {
    setPage(1);
    fetchData(1, searchQuery);
  }, [searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, searchQuery);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white font-mono selection:bg-blue-500">
      {/* NAVBAR: Aligned width with Bento Content */}
      <nav className="fixed top-0 left-0 w-full h-20 z-[300] bg-[#060606]/80 backdrop-blur-xl border-b border-white/5 flex items-center transition-all">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex items-center justify-between gap-8">
          {/* BRANDING */}
          <div
            className="flex items-center gap-4 cursor-pointer shrink-0"
            onClick={() => {
              setSelectedVideo(null);
              setSearchQuery("javascript");
            }}
          >
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-black text-xs shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              SYS
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-black tracking-tighter uppercase leading-none block">
                Stream_Node
              </span>
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1 block">
                Archive_v2
              </span>
            </div>
          </div>

          {/* SEARCH COMPONENT */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl relative group"
          >
            <input
              type="text"
              placeholder="Search_Registry..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-5 py-3 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all rounded-sm placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <div className="flex items-center gap-6 shrink-0">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 overflow-hidden">
              <span className="text-[10px] font-bold text-zinc-400">OP</span>
            </div>
          </div>
        </div>
      </nav>

      {/* THEATER MODE (OVERLAY) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[400] bg-[#060606] overflow-y-auto pt-28 pb-12"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-10">
              <div className="flex-[2.5]">
                <div className="aspect-video bg-black border border-white/10 shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.items.id}?autoplay=1`}
                    allowFullScreen
                  />
                </div>
                <div className="mt-8">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight mb-4">
                    {selectedVideo.items.snippet.title}
                  </h1>
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 flex items-center justify-center font-black">
                        JS
                      </div>
                      <div>
                        <p className="text-sm font-black">
                          {selectedVideo.items.snippet.channelTitle}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                          Verified_Source
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase hover:text-red-500 hover:border-red-500/50 transition-all"
                    >
                      Exit_Terminal
                    </button>
                  </div>
                  <div className="mt-6 p-6 bg-white/[0.02] border border-white/5 text-xs text-zinc-400 leading-relaxed max-h-60 overflow-y-auto">
                    {selectedVideo.items.snippet.description}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BENTO GRID FEED */}
      <main
        className={`max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-20 ${selectedVideo ? "hidden" : "block"}`}
      >
        <header className="mb-12 border-l-2 border-blue-600 pl-6">
          <p className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">
            Protocol: {searchQuery}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Explore_Units
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[300px]">
          {videos.map((video, idx) => (
            <motion.div
              layoutId={video.items.id}
              key={video.items.id}
              onClick={() => setSelectedVideo(video)}
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: idx * 0.03}}
              className={`group relative overflow-hidden bg-[#0c0d0e] border border-white/5 hover:border-blue-500/40 transition-all duration-500 p-6 flex flex-col justify-between cursor-pointer
                ${idx % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                <span className="text-[40px] font-black text-white leading-none">
                  0{idx + 1}
                </span>
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2">
                  {video.items.snippet.channelTitle}
                </span>
                <h3
                  className={`font-black text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-2
                  ${idx % 7 === 0 ? "text-3xl" : "text-sm"}
                `}
                >
                  {video.items.snippet.title}
                </h3>

                <div className="mt-auto aspect-video w-full bg-zinc-900 border border-white/5 overflow-hidden relative">
                  <img
                    src={video.items.snippet.thumbnails.high?.url}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="Thumbnail"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[8px] font-bold border border-white/10">
                    {video.items.contentDetails.duration
                      .replace("PT", "")
                      .replace("M", ":")
                      .replace("S", "")}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between relative z-10">
                <div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase mb-1">
                    Telemetry
                  </p>
                  <p className="text-xs font-black text-white">
                    {Number(video.items.statistics.viewCount).toLocaleString()}{" "}
                    VWS
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        {hasMore && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-16 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all disabled:opacity-20"
            >
              {loading ? "Syncing..." : "Retrieve_Next_Batch"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
