import TechnologyCard from "./components/TechnologyCard";
import TechnologyCardSkeleton from "./components/TechnologyCardSkeleton";
import type { Technology } from "@/types/expertise.type";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import useTechnology from "@/lib/useTechnology";


export default function OurTechnology() {
    const { technologys, isLoading, error } = useTechnology();
    const location = useLocation();

     if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">Failed to load technologies. Please try again later.</p>
            </div>
        )
    }

    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Our Technology
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: 2 }).map((_, index) => (
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
                <Link to='/technology'>
                    <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                        <span>View All</span>
                        <ChevronDown size={20} />
                    </Button>
                </Link>
            </div>)}
        </section>
    )
}
