import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";


export default function useCourse() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {

            try {
                const { data } = await axiosCommon.get('/course/details');
                return data.data.data;
            }
            catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Failed to fetch course data:", err.message);
                } else {
                    console.error("Failed to fetch course data:", err);
                }
                return []; // Always return a value, even on error
            }
        }
    });
    return { courses, isLoading, error };
}