import GlobalSearch from "@/components/GlobalSearch";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router";
import { ChevronDown, Search } from "lucide-react";
import type { Articles } from "@/types/expertise.type";
import { Button } from "@/components/ui/button";


export default function GlobalSearchResult() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const axiosCommon = useAxiosCommon();

    const { data: allData = {}, isLoading, error } = useQuery({
        queryKey: ['allData', searchQuery],
        queryFn: async () => {
            if (!searchQuery.trim()) {
                return {};
            }
            try {
                const { data } = await axiosCommon.post('/search/index', {
                    search: searchQuery,
                });
                return data?.data?.data;
            } catch (err: unknown) {
                console.error("Failed to fetch search results:", err instanceof Error ? err.message : err);
                throw err;
            }
        },
        enabled: !!searchQuery.trim() // Only run query if searchQuery exists
    })

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">Failed to load search results. Please try again later.</p>
            </div>
        );
    }


    // Helper function to safely parse HTML content
    const parseHtmlContent = (content: string | undefined) => {
        if (!content) return 'No description available';
        try {
            // Remove HTML tags and get plain text, then truncate
            const plainText = content.replace(/<[^>]*>/g, '').trim();
            return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
        } catch (error) {
            console.error("Error parsing HTML content:", error);
            return content.substring(0, 150) + '...';
        }
    };

    // Helper function to handle article descriptions specifically
    const parseArticleDescription = (content: string | undefined) => {
        if (!content) return 'No description available';
        try {
            // Remove HTML tags and get plain text
            const plainText = content.replace(/<[^>]*>/g, '').trim();

            // Handle HTML entities
            const decodedText = plainText
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, ' ');

            // Clean up extra whitespace
            const cleanText = decodedText.replace(/\s+/g, ' ').trim();

            // Truncate if too long, but try to break at sentence end
            if (cleanText.length <= 180) {
                return cleanText;
            }

            // Try to find a good breaking point (sentence end)
            const truncated = cleanText.substring(0, 180);
            const lastSentenceEnd = Math.max(
                truncated.lastIndexOf('.'),
                truncated.lastIndexOf('!'),
                truncated.lastIndexOf('?')
            );

            if (lastSentenceEnd > 100) {
                return truncated.substring(0, lastSentenceEnd + 1);
            }

            // If no good sentence break, just truncate and add ellipsis
            return truncated.trim() + '...';
        } catch (error) {
            console.error("Error parsing article description:", error);
            return content.length > 180 ? content.substring(0, 180) + '...' : content;
        }
    };

    return (
        <section>
            <GlobalSearch />

            {/* Search Results Content */}
            <div className="px-5 mt-8">
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-4 text-lg text-gray-600">Searching...</span>
                    </div>
                )}

                {!isLoading && allData && (
                    <div className="space-y-12 pb-10">

                        {/* Services Section */}
                        {allData.service && Array.isArray(allData.service) && allData.service.length > 0 && (
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                                    Our Service
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allData.service.slice(0, 6).map((service: { id: string; title: string; description: string; }, index: number) => (
                                        <div
                                            key={service.id || index}
                                            className="bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]"
                                        >
                                            <h3 className="text-xl font-bold text-foreground mb-2.5">
                                                {service.title}
                                            </h3>
                                            <p className="text-description">
                                                {parseHtmlContent(service.description)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-10">
                                    <Link to='/service'>
                                        <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                            <span>View All</span>
                                            <ChevronDown size={20} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Articles Section */}
                        {allData.article && Array.isArray(allData.article) && allData.article.length > 0 && (
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7 px-4">
                                    Articles
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allData.article.slice(0, 6).map((art: Articles) => (
                                        <Link
                                            key={art.id}
                                            to={`/article/${art.id}`}
                                            className="bg-white p-6 rounded-md duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] hover:scale-103 transition-transform"
                                        >
                                            <h2 className="text-xl font-bold text-foreground mb-2.5">
                                                {art.title}
                                            </h2>
                                            <p className="text-description">
                                                {parseArticleDescription(art.description)}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-10">
                                    <Link to='/articles'>
                                        <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                            <span>View All</span>
                                            <ChevronDown size={20} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Technologies Section */}
                        {allData.technology && Array.isArray(allData.technology) && allData.technology.length > 0 && (
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                                    Our Technology
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allData.technology.slice(0, 6).map((tech: { id: string; title: string; description: string; }) => (
                                        <div
                                            key={tech.id}
                                            className="bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]"
                                        >
                                            <h3 className="text-xl font-bold text-foreground mb-2.5">
                                                {tech.title}
                                            </h3>
                                            <p className="text-description">
                                                {parseHtmlContent(tech.description)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-10">
                                    <Link to='/technology'>
                                        <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                            <span>View All</span>
                                            <ChevronDown size={20} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Courses Section */}
                        {allData.course && Array.isArray(allData.course) && allData.course.length > 0 && (
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                                    Professional Training Courses
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allData.course.slice(0, 6).map((course: { id: string; title: string; description: string; }) => (
                                        <div
                                            key={course.id}
                                            className="bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]"
                                        >
                                            <h3 className="text-xl font-bold text-foreground mb-2.5">
                                                {course.title}
                                            </h3>
                                            <p className="text-description">
                                                {parseHtmlContent(course.description)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-10">
                                    <Link to='/training-courses'>
                                        <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                            <span>View All</span>
                                            <ChevronDown size={20} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* News Section */}
                        {allData.news && Array.isArray(allData.news) && allData.news.length > 0 && (
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                                    News & Highlights
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {allData.news.slice(0, 6).map((newsItem: { id: string; title: string; description: string; content: string; date: string; }, index: number) => (
                                        <div
                                            key={newsItem.id || index}
                                            className="bg-white p-6 rounded-md duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]"
                                        >
                                            <h3 className="text-xl font-bold text-foreground mb-2.5">
                                                {newsItem.title}
                                            </h3>
                                            <p className="text-description">
                                                {parseHtmlContent(newsItem.description || newsItem.content)}
                                            </p>
                                            {newsItem.date && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {new Date(newsItem.date).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-10">
                                    <Link to='/news-highlight'>
                                        <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                            <span>View All</span>
                                            <ChevronDown size={20} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Generic fallback for any other data types */}
                        {/* {Object.entries(allData).map(([key, value]: [string, unknown]) => {
                            // Skip already handled types
                            if (['article', 'service', 'technology', 'course', 'news'].includes(key)) {
                                return null;
                            }

                            if (Array.isArray(value) && value.length > 0) {
                                return (
                                    <div key={key}>
                                        <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {value.map((item: unknown, index: number) => (
                                                <div
                                                    key={(item as { id?: string }).id || index}
                                                    className="bg-white p-6 rounded-md duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]"
                                                >
                                                    <h3 className="text-xl font-bold text-foreground mb-2.5">
                                                        {(item as { title?: string; name?: string }).title || (item as { name?: string }).name || `${key} Item ${index + 1}`}
                                                    </h3>
                                                    <p className="text-description">
                                                        {parseHtmlContent(item.description || item.content)}
                                                    </p>
                                                    {item.category && (
                                                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })} */}

                        {/* No Results - Only show if we have a search query but no meaningful data */}
                        {!isLoading && searchQuery && (
                            (!allData ||
                                (typeof allData === 'object' && !Array.isArray(allData) &&
                                    Object.values(allData).every(value => !Array.isArray(value) || value.length === 0)
                                )
                            ) && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4 flex justify-center"><Search size={24} /></div>
                                    <p className="text-gray-600 text-lg mb-2">
                                        No results found for "<span className="font-semibold text-2xl">{searchQuery}</span>"
                                    </p>
                                    <p className="text-gray-500">
                                        Try different keywords or check your spelling.
                                    </p>
                                </div>
                            )
                        )}

                        {/* Empty state when no search query */}
                        {!searchQuery && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4 flex justify-center"><Search size={24} /></div>
                                <p className="text-gray-600 text-lg">
                                    Enter a search term above to find services and expertise
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
