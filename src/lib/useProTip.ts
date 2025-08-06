import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";



export default function useProTip() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    try {
        const { data: proTips = {}, isLoading: isLoadingProTips } = useQuery({
            queryKey: ['proTips'],
            queryFn: async () => {
                const { data } = await axiosCommon.get('/protip/index');
                // Handle different possible response structures
                const result = data?.data?.data || data?.data || data || null;
                return result;
            }
        });
        return { proTips,  isLoadingProTips };
    } catch (error) {
        console.error("Failed to fetch pro tips:", error);
        throw error; // Let the caller handle the error
    }
}