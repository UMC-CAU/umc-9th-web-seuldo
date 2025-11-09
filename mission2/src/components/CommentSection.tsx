import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
  };
}

interface CommentResponse {
  data: {
    nextCursor: number | null;
    data: Comment[];
  };
}

const CommentSection = ({ lpid }: { lpid: string }) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [input, setInput] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<CommentResponse>({
      queryKey: ["lpComments", lpid, order],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
          params: { cursor: pageParam, limit: 10, order },
        });
        return res.data;
      },
      getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
      initialPageParam: 0,
    });

  const comments = data?.pages.flatMap((page) => page.data.data) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="bg-[#1C1C1C] mt-12 w-full max-w-3xl mx-auto rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">댓글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 rounded-md text-sm ${
              order === "asc"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 rounded-md text-sm ${
              order === "desc"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 bg-gray-900 rounded-md px-3 py-2 text-sm outline-none"
        />
        <button className="bg-gray-700 px-4 rounded-md text-sm font-semibold hover:bg-gray-600">
          작성
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex items-start gap-3 py-2 border-b border-gray-800"
            >
              {c.author.avatar ? (
                <img
                  src={c.author.avatar}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-sm font-bold">
                  {c.author.name[0]}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold">{c.author.name}</p>
                <p className="text-gray-300 text-sm">{c.content}</p>
              </div>
            </div>
          ))}

          {isFetchingNextPage && (
            <div className="flex flex-col gap-3 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-gray-800 animate-pulse" />
              ))}
            </div>
          )}

          {hasNextPage && <div ref={loaderRef} className="h-8" />}
        </>
      )}
    </div>
  );
};

export default CommentSection;
