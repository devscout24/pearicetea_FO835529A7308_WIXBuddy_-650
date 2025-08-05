import { useQuery } from "@tanstack/react-query";
import TechnologyCard from "./components/TechnologyCard";
import TechnologyCardSkeleton from "./components/TechnologyCardSkeleton";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import type { Technology } from "@/types/expertise.type";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";


export default function OurTechnology() {
    const axiosCommon = useAxiosCommon();
    const location = useLocation();


    const { data: technologys = [], isLoading } = useQuery({
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
    console.log("Technology data:", technologys);

    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Our Technology
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <TechnologyCardSkeleton key={index} />
                    ))
                ) : (
                    location.pathname === '/' ? technologys.slice(0, 2).map((technology: Technology) => (
                        <TechnologyCard
                            key={technology.id}
                            technology={technology}
                        />
                    )) : (
                        technologys.map((technology: Technology) => (
                            <TechnologyCard
                                key={technology.id}
                                technology={technology}
                            />
                        ))
                    )
                )}
            </div>

            {/* 'View All' button */}
            {location.pathname === '/' && (<div className="flex justify-center mt-10">
                <Link to='/expertise'>
                    <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                        <span>View All</span>
                        <ChevronDown size={20} />
                    </Button>
                </Link>
            </div>)}
        </section>
    )
}
