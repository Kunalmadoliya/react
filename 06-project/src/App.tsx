import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function StreamInterface() {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("");

  // FETCH DATA WITH PAGINATION
  const fetchData = async (pageNum: number) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNum}&limit=12&query=javascript`,
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

  useEffect(() => {
    try {
      const filteredVideos = videos.filter((video) =>
        video.items.snippet.title.toLowerCase().includes(filter.toLowerCase()),
      );
    } catch (error) {}
  }, [filter, videos]);

  useEffect(() => {
    fetchData(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white font-mono selection:bg-blue-500">
      {/* PERSISTENT NAVBAR - Matches page spacing exactly */}
      <nav className="fixed top-0 left-0 w-full h-16 z-[300] bg-[#060606]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 md:px-12 transition-all">
        {/* BRANDING */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-black text-[10px] shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            SYS
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-black tracking-[0.15em] uppercase leading-none">
              FreeAPI_Stream
            </span>
            <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
              Network_Node_01
            </span>
          </div>
        </div>

        {/* SEARCH BAR (Visual) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="w-full bg-white/[0.03] border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] transition-all flex items-center px-4 py-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-zinc-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search data payloads..."
              className="bg-transparent border-none outline-none text-xs text-white w-full ml-3 placeholder:text-zinc-600 font-medium"
            />
          </div>
        </div>

        {/* USER CONTROLS */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-[0.2em] transition-colors">
            Library
          </button>
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 overflow-hidden flex items-center justify-center">
              <span className="text-[10px] font-bold text-zinc-400">OP</span>
            </div>
          </div>
        </div>
      </nav>

      {/* WATCH VIEW (Theater Mode) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[200] bg-[#060606] overflow-y-auto pt-24 pb-12"
          >
            {/* Same left/right padding as the Navbar and Gallery */}
            <div className="w-full px-6 md:px-12 flex flex-col lg:flex-row gap-8">
              {/* MAIN PLAYER AREA */}
              <div className="flex-[2.5]">
                <div className="aspect-video bg-black w-full border border-white/10 shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.items.id}?autoplay=1`}
                    title="Player"
                    allowFullScreen
                  />
                </div>
                <div className="mt-6">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">
                    {selectedVideo.items.snippet.title}
                  </h1>
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-black text-xs">
                        JS
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {selectedVideo.items.snippet.channelTitle}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                          Verified_Source
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="px-6 py-2.5 bg-white/5 border border-white/10 text-[10px] font-black uppercase hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                    >
                      Close_Terminal
                    </button>
                  </div>
                  <div className="mt-6 p-6 bg-white/[0.02] border border-white/5 text-xs text-zinc-400 leading-loose max-h-48 overflow-y-auto rounded-sm">
                    {selectedVideo.items.snippet.description}
                  </div>
                </div>
              </div>

              {/* RECOMMENDATIONS SIDEBAR */}
              <div className="flex-1 space-y-4 lg:pl-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  Recommended_Payloads
                </h3>
                {videos
                  .filter((v) => v.items.id !== selectedVideo.items.id)
                  .slice(0, 10)
                  .map((video) => (
                    <div
                      key={video.items.id}
                      onClick={() => {
                        setSelectedVideo(video);
                        window.scrollTo(0, 0);
                      }}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-40 aspect-video flex-shrink-0 bg-zinc-900 overflow-hidden border border-white/5 group-hover:border-blue-500/50 transition-all">
                        <img
                          src={video.items.snippet.thumbnails.medium?.url}
                          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all"
                          alt="Thumbnail"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 py-1">
                        <h4 className="text-xs font-bold line-clamp-2 group-hover:text-blue-400 leading-snug">
                          {video.items.snippet.title}
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">
                          {video.items.snippet.channelTitle}
                        </p>
                        <p className="text-[9px] text-zinc-600">
                          {Number(
                            video.items.statistics.viewCount,
                          ).toLocaleString()}{" "}
                          Views
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY VIEW (Grid with Pagination) */}
      <main
        className={`relative z-20 px-6 md:px-12 py-28 ${selectedVideo ? "hidden" : "block"}`}
      >
        <header className="mb-12 border-l-2 border-blue-500 pl-6">
          <span className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase">
            System_Feed_Active
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-2 text-white">
            EXPLORE_UNITS
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {videos.map((video) => (
            <motion.div
              layoutId={video.items.id}
              key={video.items.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video bg-zinc-900 border border-white/5 group-hover:border-blue-500/50 transition-all mb-4 overflow-hidden shadow-xl">
                <img
                  src={video.items.snippet.thumbnails.high?.url}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  alt="Thumbnail"
                />
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold border border-white/10">
                  HD //{" "}
                  {video.items.contentDetails.duration
                    .replace("PT", "")
                    .replace("M", ":")
                    .replace("S", "")}
                </div>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-zinc-200 line-clamp-2 mb-2 group-hover:text-white leading-snug">
                  {video.items.snippet.title}
                </h3>
                <div className="flex items-center justify-between text-[9px] font-bold uppercase text-zinc-500">
                  <span className="group-hover:text-blue-400 transition-colors">
                    {video.items.snippet.channelTitle}
                  </span>
                  <span className="text-zinc-600">
                    {Number(video.items.statistics.viewCount).toLocaleString()}{" "}
                    Views
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION BUTTON */}
        {hasMore && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative px-12 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10">
                {loading ? "Syncing_Data..." : "Load_Next_Batch"}
              </span>
              <div className="absolute inset-0 bg-blue-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
