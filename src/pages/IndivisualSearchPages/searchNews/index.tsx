import NewsAndHighlightsSkeleton from "@/components/NewsAndHighlightsSkeleton";
import { useSearchData } from "@/lib/useSearchData";
import { useSearchParams } from "react-router";

import parse, { domToReact, Element } from "html-react-parser";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

export default function SearchNews() {

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const { data: allData = {}, isLoading, error } = useSearchData(searchQuery);
    const news = allData?.news || [];

    const renderDescription = (htmlString: string | undefined) => {
        if (!htmlString || typeof htmlString !== 'string') {
            return null;
        }

        return parse(htmlString, {
            replace: (node) => {
                if (node instanceof Element && node.name === "a") {
                    const href = node.attribs.href;
                    const text = domToReact(node.children as import("html-react-parser").DOMNode[]);

                    // Custom styled link
                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground font-semibold hover:underline"
                        >
                            {text}
                        </a>
                    );
                }
            },
        });
    };



    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                News and Highlights
            </h1>

            {isLoading && (
                <NewsAndHighlightsSkeleton />
            )}

            {error && (
                <div className="text-center py-8">
                    <p className="text-red-600">Failed to load news. Please try again later.</p>
                </div>
            )}

            {news && !isLoading && !error && (
                news.map((newsItem: NewsItem) => (
                    <div key={newsItem.id} className="max-w-4xl">
                        {newsItem.image && (
                            <img
                                src={newsItem.image}
                                alt={newsItem.title || "News image"}
                                className="w-full h-auto rounded-lg mb-6 shadow-lg"
                            />
                        )}

                        {newsItem.title && (
                            <h2 className="text-2xl font-semibold text-title02 py-4">
                                {newsItem.title}
                            </h2>
                        )}

                        {newsItem.description && (
                            <div className="text-gray-700 leading-relaxed prose max-w-none">
                                {renderDescription(newsItem.description)}
                            </div>
                        )}
                    </div>
                ))
            )}

            {!news && !isLoading && !error && (
                <div className="text-center py-8">
                    <p className="text-gray-600">No news available at the moment.</p>
                </div>
            )}
        </section>
    )
}
