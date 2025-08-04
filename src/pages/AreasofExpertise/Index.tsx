import CommonCard from "@/components/CommonCard";
import CommonCardSkeleton from "@/components/CommonCardSkeleton";
import { Button } from "@/components/ui/button";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import type { TCommonCard } from "@/types/commonCard.type";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router";


export default function AreasOfExpertise() {
    const location = useLocation();
    console.log("Current location:", location.pathname);
    const axiosCommon = useAxiosCommon();

    const { data: expertises = [], isLoading } = useQuery({
        queryKey: ["expertise"],
        queryFn: async () => {
            try {
                const { data } = await axiosCommon.get("/expert/index");
                return data.data.data;
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Failed to fetch expertises:", err.message);
                } else {
                    console.error("Failed to fetch expertises:", err);
                }
                throw err; // rethrow so React Query still marks it as an error
            }
        },
    });

    console.log("Expertise data:", expertises);

    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Areas of Expertise
            </h1>
            {/* Grid for the service cards, rendered dynamically from the serviceData array */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: location.pathname === '/' ? 4 : 8 }).map((_, index) => (
                        <CommonCardSkeleton key={index} />
                    ))
                ) : (
                    location.pathname === '/' ? expertises.slice(0, 4).map((expertise: TCommonCard) => (
                        <CommonCard
                            key={expertise.id}
                            service={expertise}
                        />
                    )) : (
                        expertises.map((expertise: TCommonCard) => (
                            <CommonCard
                                key={expertise.id}
                                service={expertise}
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
