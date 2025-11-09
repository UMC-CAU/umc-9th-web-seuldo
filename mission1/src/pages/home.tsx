import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLPList";

const HomePage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useGetLpList({
    cursor: 0,
    limit: 30,
    order,
    search: "",
  });

  if (isPending)
    return (
      <div className="bg-black min-h-screen px-[2px] py-8 flex flex-col items-center">
        <div className="w-[90%] flex justify-end mb-5 gap-2">
          <div className="w-24 h-8 rounded-md skeleton" />
          <div className="w-24 h-8 rounded-md skeleton" />
        </div>

        <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg overflow-hidden relative skeleton"
            />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-20">오류가 발생했습니다.</div>
    );

  const lpList = data?.data.data || [];

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

      <div className="w-[90%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[3px]">
        {lpList.map((lp) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="relative aspect-square bg-gray-900 overflow-hidden group cursor-pointer
             transition-transform duration-300 ease-out hover:scale-[1.04] hover:z-10"
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
    </div>
  );
};

export default HomePage;
