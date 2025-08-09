import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";


export default function useSetting() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    const { data: basicData = {}, isLoading, error } = useQuery({
        queryKey: ['basicData'],
        queryFn: async () => {

            try {
                const { data } = await axiosCommon.get('/systemSettings/index');
                return data.data;
            }
            catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Failed to fetch basic data:", err.message);
                } else {
                    console.error("Failed to fetch basic data:", err);
                }
                return []; // Always return a value, even on error
            }
        }
    });
    return { basicData, isLoading, error };
}