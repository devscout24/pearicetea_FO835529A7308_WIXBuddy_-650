import { Search } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";


export default function GlobalSearch() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentPath = location.pathname;
    
    // Get initial search value from URL params or empty string
    const [searchValue, setSearchValue] = useState(() => {
        return searchParams.get('q') || '';
    });

    // Update search value when URL params change
    useEffect(() => {
        const queryFromUrl = searchParams.get('q') || '';
        setSearchValue(queryFromUrl);
    }, [searchParams]);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Navigate to global search page with search query
        if (searchValue.trim()) {
            navigate(`/global-search?q=${encodeURIComponent(searchValue.trim())}`);
        } else {
            navigate('/global-search');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleRequestQuote = () => {

        
        // Navigate to global search page with current search value
        if (searchValue.trim()) {
            navigate(`/global-search?q=${encodeURIComponent(searchValue.trim())}`);
        } else {
            navigate('/global-search');
        }
    };

    return (
        <form onSubmit={handleSearch} className={`${currentPath.includes('global') ? 'flex flex-col md:flex-row justify-center mt-8 gap-2 md:gap-5' : ''} px-5`}>
            <div className={`flex items-center border border-foreground rounded-md overflow-hidden mb-6 shadow-sm bg-white relative ${currentPath.includes('global') ? 'w-full md:w-3/4' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleInputChange}
                    className="flex-grow p-3 text-gray-700 focus:outline-none focus:ring focus:ring-foreground rounded-l-md "
                />
                <div onClick={handleSearch} className="bg-foreground text-white p-3.5 rounded-r-md flex items-center justify-center transition-colors duration-200 absolute right-0 cursor-pointer">
                    <Search size={24} />
                </div>
            </div>

            {/* Request a Quote Button */}
            <div className={` ${currentPath.includes('global') ? 'w-full md:w-1/4' : 'w-full'}`}>
                <button 
                    type="button" 
                    onClick={handleRequestQuote}
                    className={`w-full bg-foreground hover:bg-foreground/90 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 cursor-pointer text-xl${currentPath.includes('global') ? 'mb-0' : 'mb-10'} ${currentPath=== '/technology' && 'mb-14'}`}
                >
                    Request a Quote
                </button>
            </div>
        </form>
    )
}