import type { TCommonCard } from "@/types/commonCard.type";
import type { Articles } from "@/types/expertise.type";
import { Link, useLocation } from "react-router";

interface CommonCardProps {
  service?: TCommonCard;
  article?: Articles;
}

export default function CommonCard({ service, article }: CommonCardProps) {
  const location = useLocation();
  const currentpath = location.pathname;
  const { title, description } = service || article || {};

     // Helper function to safely parse HTML content
    const parseHtmlContent = (content: string | undefined) => {
        if (!content) return 'No description available';
        try {
            // Remove HTML tags and get plain text, then truncate
            const plainText = content.replace(/<[^>]*>/g, '').trim();
            return plainText.length > 75 ? plainText.substring(0, 75) + '...' : plainText;
        } catch (error) {
            console.error("Error parsing HTML content:", error);
            return content.substring(0, 75) + '...';
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
    <>
      {(currentpath === '/articles' || currentpath.includes('global')|| currentpath.includes('search-articles')) ? (
        <Link to={`/article/${article?.id}`} className={`bg-white p-6 rounded-md duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] hover:scale-103 transition-transform ${currentpath.includes('articles') ? '' : ''}`}>
          <div >
            <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
            <p className="text-description">{parseArticleDescription(description)}</p>
          </div>
        </Link>
      ) : (
        <div className={`bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] ${currentpath.includes('articles') ? '' : ''}`}>
          <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
          <p className="text-description">{parseHtmlContent(description)}</p>
        </div>
      )}
    </>
  )
}
