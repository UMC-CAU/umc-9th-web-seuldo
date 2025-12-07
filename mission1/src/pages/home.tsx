import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLPList";
import { useThrottle } from "../hooks/useThrottle";

const HomePage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLpList({
      limit: 30,
      order,
      search: "",
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const throttledShouldLoadMore = useThrottle(shouldLoadMore, 500);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadMore((prev) => (prev ? prev : true));
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (throttledShouldLoadMore) {
      fetchNextPage();
      setShouldLoadMore(false); // 다시 false로 초기화
    }
  }, [throttledShouldLoadMore]);

  const lpList = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="bg-black min-h-screen px-[2px] py-8 flex flex-col items-center">
      <div className="w-[90%] flex justify-end mb-5 gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md border ${
            order === "asc"
              ? "bg-white text-black"
              : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
          } transition-colors duration-200`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md border ${
            order === "desc"
              ? "bg-white text-black"
              : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
          } transition-colors duration-200`}
        >
          최신순
        </button>
      </div>

      {isPending ? (
        <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg overflow-hidden bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
            {lpList.map((lp) => (
              <div
                key={lp.id}
                onClick={() => navigate(`/lp/${lp.id}`)}
                className="relative aspect-square bg-gray-900 overflow-hidden group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.04] hover:z-10"
              >
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 text-white">
                  <p className="text-xs font-semibold truncate">{lp.title}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-300">
                    <span>
                      {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <div className="flex items-center gap-[2px]">
                      <span className="text-white">♥</span>
                      <span>{lp.likes?.length ?? 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isFetchingNextPage && (
            <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px] mt-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
        </>
      )}
    </div>
  );
};

export default HomePage;
