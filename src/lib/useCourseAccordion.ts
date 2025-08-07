import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";


export default function useCourseAccordion() {
    const axiosCommon = useAxiosCommon();
    // Your custom hook logic here
    const { data: coursesAccordion = [], isLoading, error } = useQuery({
        queryKey: ['coursesAccordion'],
        queryFn: async () => {

            try {
                const { data } = await axiosCommon.get('/course/index');
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
    return { coursesAccordion, isLoading, error };
}