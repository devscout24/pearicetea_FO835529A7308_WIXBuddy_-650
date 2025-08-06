import CommonCard from "@/components/CommonCard";
import CommonCardSkeleton from "@/components/CommonCardSkeleton";
import useArticle from "@/lib/useArticle";
import type { Articles } from "@/types/expertise.type";

export default function Articles() {
    const { articles, isLoading } = useArticle();
    return (
        <section className="py-5 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7 px-4">
                Articles
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4" >
                    {isLoading ? (
                      // Show skeletons while loading
                      Array.from({ length: 12 }).map((_, index) => (
                        <CommonCardSkeleton key={index} />
                      ))
                    ) : (
                      articles.map((article: Articles) => (
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
