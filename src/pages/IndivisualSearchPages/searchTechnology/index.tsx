import { useSearchData } from "@/lib/useSearchData";
import TechnologyCard from "@/pages/OurTechnology/components/TechnologyCard";
import TechnologyCardSkeleton from "@/pages/OurTechnology/components/TechnologyCardSkeleton";
import type { Technology } from "@/types/expertise.type";
import { useSearchParams } from "react-router";


export default function SearchTechnology() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const { data: allData = {}, isLoading, error } = useSearchData(searchQuery);

    if (error) {
        return (
            <div className="text-center py-8 flex items-center justify-center h-full">
                <p className="text-red-600">Something went wrong. Please try again later.</p>
            </div>
        );
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
                    allData.technology.map((technology: Technology) => (
                        <TechnologyCard
                            key={technology.id}
                            technology={technology}
                        />
                    ))
                )}
            </div>
        </section>
    )
}
