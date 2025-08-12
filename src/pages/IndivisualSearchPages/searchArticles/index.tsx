import CommonCard from "@/components/CommonCard";
import CommonCardSkeleton from "@/components/CommonCardSkeleton";
import { useSearchData } from "@/lib/useSearchData";
import type { Articles } from "@/types/expertise.type";
import { useSearchParams } from "react-router";

export default function SearchArticles() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const { data: allData = {}, isLoading, error } = useSearchData(searchQuery);
    console.log("Search Query:", searchQuery);
    console.log("All Data:", allData);

    if (error) {
        return (
            <div className="text-center py-8 flex items-center justify-center h-full">
                <p className="text-red-600">Something went wrong. Please try again later.</p>
            </div>
        );
    }
    return (
        <section className="py-5 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7 px-4">
                Articles
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4" >
                {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <CommonCardSkeleton key={index} />
                    ))
                ) : (
                    allData.article.map((article: Articles) => (
                        <CommonCard
                            key={article.id}
                            article={article}
                        />
                    ))
                )}
            </div>
        </section>
    )
}
