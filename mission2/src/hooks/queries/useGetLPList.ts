import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PaginationDto } from "../../types/common";

function useGetLpList({ search, order, limit }: Omit<PaginationDto, "cursor">) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, order, search],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getLpList({
        cursor: pageParam,
        search,
        order,
        limit,
      });
      return res;
    },
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpList