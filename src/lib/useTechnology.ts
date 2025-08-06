import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";


export default function useTechnology() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    const { data: technologys = [], isLoading, error } = useQuery({
        queryKey: ['technologys'],
        queryFn: async () => {

            try {
                const { data } = await axiosCommon.get('/technology/index');
                return data.data.data;
            }
            catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Failed to fetch technology data:", err.message);
                } else {
                    console.error("Failed to fetch technology data:", err);
                }
                return []; // Always return a value, even on error
            }
        }
    });
    return { technologys, isLoading, error };
}