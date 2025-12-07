import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search", debouncedQuery],
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        return await getLpList({
          cursor: pageParam,
          limit: 20,
          search: debouncedQuery,
          order: "asc",
        });
      },
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      enabled: debouncedQuery.trim().length > 0,
      staleTime: 1000 * 10,
      gcTime: 1000 * 60,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const items = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="bg-black min-h-screen px-[2px] py-8 flex flex-col items-center">
      <div className="w-[90%] max-w-xl mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="찾고 싶은 LP 제목을 입력하세요"
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-500"
        />
      </div>

      {debouncedQuery.trim().length === 0 && (
        <p className="text-gray-400 mt-10">검색어를 입력해주세요.</p>
      )}

      {isLoading && (
        <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg overflow-hidden bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && items.length > 0 && (
        <>
          <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
            {items.map((lp) => (
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

      {!isLoading && debouncedQuery.trim().length > 0 && items.length === 0 && (
        <p className="text-gray-400 mt-10">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;
