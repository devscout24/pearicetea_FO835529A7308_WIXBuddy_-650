import { Link } from "react-router";
import { Button } from "./ui/button";
import { ChevronDown, Search } from "lucide-react";
import useArticle from "@/lib/useArticle";
import type { Articles } from "@/types/expertise.type";
import useProTip from "@/lib/useProTip";




export default function WhatsNew() {
    const { articles, isLoading } = useArticle();
    const { proTips,  isLoadingProTips } = useProTip();
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
                                <li key={article.id} className="">
                                    {article.title}
                                </li>
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
                        <p className="text-lg font-normal">{proTips.title}</p>
                    )}
                </div>
            </div>
            <div className="mt-10 mx-7">
        {/* Search Bar */}
        <div className="flex items-center border border-foreground rounded-md overflow-hidden mb-6 shadow-sm bg-white relative">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-3 text-gray-700 focus:outline-none focus:ring focus:ring-foreground rounded-l-md "
          />
          <button className="bg-foreground text-white p-3.5 rounded-r-md flex items-center justify-center transition-colors duration-200 absolute right-0">
            <Search size={24} />
          </button>
        </div>

        {/* Request a Quote Button */}
        <button className="w-full bg-foreground hover:bg-foreground/90 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 cursor-pointer text-xl mb-10">
          Request a Quote
        </button>
      </div>
        </div>
    )
}
