import { Link } from "react-router";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import useArticle from "@/lib/useArticle";
import type { Articles } from "@/types/expertise.type";
import useProTip from "@/lib/useProTip";
import GlobalSearch from "./GlobalSearch";




export default function WhatsNew() {
    const { articles, isLoading } = useArticle();
    const { proTips, isLoadingProTips } = useProTip();
    console.log(proTips);
    return (
        <div>
            <div className="bg-white mt-12 px-5 py-7">
                <h1 className="text-xl font-semibold text-foreground mb-4 underline">What’s New</h1>
                <ul className="text-lg font-normal space-y-4">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, idx) => (
                            <li key={idx} className="animate-pulse h-6 bg-gray-200 rounded w-full" />
                        ))
                        : articles.slice(0, 3).map((article: Articles) => (
                            <Link  key={article.id} to={`/article/${article.id}`}>
                                <li className="mb-1 hover:text-foreground hover:underline transition-all duration-300 ease-in-out cursor-pointer">
                                    {article.title}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                <div className="flex justify-center my-5">
                    <Link to='/articles'>
                        <Button variant="outline" className="flex items-center !px-5.5 !py-3.5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                            <span>View All</span>
                            <ChevronDown size={20} />
                        </Button>
                    </Link>
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-foreground mb-4 underline">Pro Tip</h1>
                    {isLoadingProTips ? (
                        <div className="animate-pulse h-6 bg-gray-200 rounded w-full" />
                    ) : (
                        <Link to={`/protip/${proTips.id}`} className="text-lg font-normal hover:text-foreground hover:underline transition-all duration-300 ease-in-out cursor-pointer">{proTips.title}</Link>
                    )}
                </div>
            </div>
            <div className="my-10 mx-7">
                {/* Search Bar */}
                <GlobalSearch />
            </div>
        </div>
    )
}
