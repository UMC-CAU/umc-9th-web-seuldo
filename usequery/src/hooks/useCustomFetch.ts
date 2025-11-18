import { useQuery } from '@tanstack/react-query';

export const useCustomFetch = <T>(url: string) => {
  return useQuery({

    queryKey: [url],

    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error();
      }

      //나중에 T 타입을 돌려주는 비동기 작업
      return response.json() as Promise<T>;
    },

    retry: 3,

    retryDelay: (attemptIndex) =>
      Math.min(1000 * Math.pow(2, attemptIndex), 30000),

    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};