import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/v1/lps/${lpid}`);
      return res.data;
    },
    enabled: !!lpid,
  });

  if (isPending) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-500">오류가 발생했습니다.</p>
      </div>
    );
  }

  const lp = data?.data;

  if (!lp) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-gray-400">LP 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-[#1C1C1C] text-white rounded-2xl shadow-lg p-8 sm:p-10 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {lp.author?.avatar ? (
              <img
                src={lp.author.avatar}
                alt="작성자 프로필"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
                {lp.author?.name?.[0] ?? "A"}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-100">
                {lp.author?.name ?? `작성자 #${lp.authorId}`}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white hover:font-semibold text-sm transition">
              수정
            </button>
            <button className="text-gray-400 hover:text-white hover:font-semibold text-sm transition">
              삭제
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          {lp.title}
        </h1>

        {lp.thumbnail && (
          <div className="flex justify-center mb-10">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full max-w-lg h-auto rounded-xl shadow-lg object-cover border border-gray-700"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}

        {lp.content && (
          <div className="mb-10 text-center">
            <p className="text-gray-200 text-sm sm:text-base whitespace-pre-line leading-relaxed">
              {lp.content}
            </p>
          </div>
        )}

        {lp.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {lp.tags.map((tag: { id: number; name: string }) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs bg-gray-800 rounded-full text-gray-200"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors text-sm">
            ♥ <span>{lp.likes?.length ?? 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
