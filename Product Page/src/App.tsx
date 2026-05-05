import {useState, useEffect,useMemo} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function SystemMarketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetching enough data to allow local pagination and filtering
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=100",
      );
      const data = await response.json();
      if (data.success) setProducts(data.data.data);
    } catch (error) {
      console.error("SYS_FETCH_ERR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter and Paginate logic
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
    return filtered;
  }, [search, products]);

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentBatch = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#060606] text-[#a1a1aa] font-mono selection:bg-blue-500 pb-20">
      {/* NAVBAR: Aligned with main body spacing */}
      <nav className="sticky top-0 z-50 bg-[#060606]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              PRO
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none">
                Products
              </h1>
              <p className="text-[8px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">
                Working
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search_Registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-5 py-3 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all rounded-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-500 hover:text-white"
              >
                CLEAR_
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 overflow-hidden">
              <span className="text-[10px] font-bold text-zinc-400">OP</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* HEADER SECTION */}
        <header className="mb-12 border-l-2 border-blue-600 pl-6">
          <p className="text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">
            Inventory_Control
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            {search
              ? `Searching_Result [${filteredProducts.length}]`
              : "Explore_Units"}
          </h2>
        </header>

        {/* BENTO GRID: 
            Some items take up more space to create a dynamic look 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[280px]">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 animate-pulse border border-white/10"
              />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {currentBatch.map((product, idx) => (
                <motion.div
                  layout
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.9}}
                  key={product.id}
                  className={`group relative overflow-hidden bg-[#0c0d0e] border border-white/5 hover:border-blue-500/40 transition-all duration-500 p-6 flex flex-col justify-between
                    ${idx % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  `}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-[40px] font-black text-white leading-none">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-2">
                      {product.brand}
                    </span>
                    <h3
                      className={`font-black text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors
                      ${idx % 5 === 0 ? "text-3xl" : "text-lg"}
                    `}
                    >
                      {product.title}
                    </h3>

                    <div className="mt-auto aspect-video w-full bg-zinc-900/50 p-4 border border-white/5 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        alt="Product"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between relative z-10">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">
                        Mkt_Value
                      </p>
                      <p className="text-2xl font-black text-white">
                        ${product.price}
                      </p>
                    </div>
                    <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">
                      Add_To_Sync
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* PAGINATION CONTROL: Industrial styling */}
        {!loading && totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-3 border border-white/10 hover:border-blue-500 disabled:opacity-20 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-2">
              <span className="text-xs font-black text-white">
                {currentPage}
              </span>
              <span className="text-xs text-zinc-600">/</span>
              <span className="text-xs text-zinc-600">{totalPages}</span>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-3 border border-white/10 hover:border-blue-500 disabled:opacity-20 transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="py-20 text-center border border-dashed border-white/10">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-[0.5em]">
              No_Matching_Payloads_Found
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
