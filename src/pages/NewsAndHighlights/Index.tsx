import NewsAndHighlightsSkeleton from "@/components/NewsAndHighlightsSkeleton";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import { useQuery } from "@tanstack/react-query";
import parse, { domToReact, Element } from "html-react-parser";
import { Link, useLocation } from "react-router";


export default function NewsAndHighlights() {
  const axiosCommon = useAxiosCommon();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      try {
        const { data } = await axiosCommon.get('/news/index');

        // Handle different possible response structures
        const result = data?.data?.data || data?.data || data || null;
        return result;
      }
      catch (err: unknown) {
        console.error("Failed to fetch news data:", err);
        throw err; // Let React Query handle the error
      }
    }
  });

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
        <div className="max-w-4xl">
          {news.image && (
            <img
              src={news.image}
              alt={news.title || "News image"}
              className="w-full h-auto rounded-lg mb-6 shadow-lg"
            />
          )}

          {news.title && (
            <h2 className="text-2xl font-semibold text-title02 py-4">
              {news.title}
            </h2>
          )}

          {news.description && (
            <div className="text-gray-700 leading-relaxed prose max-w-none">
              {(() => {
                // If on home page, show truncated HTML with read more button
                if (isHomePage) {
                  // First, strip HTML tags to count words accurately
                  const textOnly = news.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
                  const words = textOnly.split(/\s+/) || [];
                  const isTruncated = words.length > 20;

                  if (isTruncated) {
                    // Find the approximate position in the original HTML string
                    let wordCount = 0;
                    let result = '';
                    
                    // Simple HTML-aware word counting and truncation
                    const htmlRegex = /<[^>]*>|[^\s<]+/g;
                    let match;
                    
                    while ((match = htmlRegex.exec(news.description)) !== null && wordCount < 20) {
                      if (match[0].startsWith('<')) {
                        // It's an HTML tag, add it without counting
                        result += match[0];
                      } else {
                        // It's a word, add it and increment counter
                        result += match[0];
                        wordCount++;
                        
                        // Add space if not at the end and next character isn't a tag
                        const nextChar = news.description[htmlRegex.lastIndex];
                        if (nextChar && !nextChar.match(/</) && wordCount < 20) {
                          result += ' ';
                        }
                      }
                    }
                    
                    // Close any unclosed tags
                    const openTags: string[] = [];
                    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)/g;
                    let tagMatch;
                    
                    while ((tagMatch = tagRegex.exec(result)) !== null) {
                      const tagName = tagMatch[1].toLowerCase();
                      if (tagMatch[0].startsWith('</')) {
                        // Closing tag
                        const index = openTags.lastIndexOf(tagName);
                        if (index !== -1) {
                          openTags.splice(index, 1);
                        }
                      } else if (!tagMatch[0].endsWith('/>')) {
                        // Opening tag (not self-closing)
                        openTags.push(tagName);
                      }
                    }
                    
                    // Close unclosed tags
                    openTags.reverse().forEach(tag => {
                      result += `</${tag}>`;
                    });

                    return (
                      <div className="prose max-w-none text-gray-700 leading-relaxed">
                        <span className="inline">
                          {renderDescription(result)}...
                          <Link to={`/news-highlight`} className="inline ml-2">
                            <button
                              className="text-foreground font-semibold hover:underline inline cursor-pointer"
                              type="button"
                            >
                              Read more
                            </button>
                          </Link>
                        </span>
                      </div>
                    );
                  } else {
                    // Less than 20 words, show all content with HTML parsing
                    return renderDescription(news.description);
                  }
                } else {
                  // If on news detail page, show full HTML content
                  return renderDescription(news.description);
                }
              })()}
            </div>
          )}
        </div>
      )}

      {!news && !isLoading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No news available at the moment.</p>
        </div>
      )}
    </section>
  )
}
