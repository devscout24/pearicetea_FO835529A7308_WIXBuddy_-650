import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";



export default function useArticle() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    try {
        const { data: articles = [], isLoading } = useQuery({
            queryKey: ['articles'],
            queryFn: async () => {
                const { data } = await axiosCommon.get('/article/index');
                // Handle different possible response structures
                const result = data?.data?.data || data?.data || data || null;
                return result;
            }
        });
        return { articles, isLoading };
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        throw error; // Let the caller handle the error
    }
}
