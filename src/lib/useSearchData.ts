import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";

export function useSearchData(searchQuery: string) {
    const axiosCommon = useAxiosCommon();
  return useQuery({
    queryKey: ["allData", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) {
        return {};
      }
      try {
        const { data } = await axiosCommon.post("/search/index", {
          search: searchQuery,
        });
        return data?.data?.data;
      } catch (err: unknown) {
        console.error(
          "Failed to fetch search results:",
          err instanceof Error ? err.message : err
        );
        throw err;
      }
    },
    enabled: !!searchQuery.trim(), // Only run query if searchQuery exists
  });
}