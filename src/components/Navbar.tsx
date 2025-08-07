import Header from "./Header";
import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { icons } from "@/lib/imageProvider";
import useTechnology from "@/lib/useTechnology";

// We'll define the navigation links here to make them easy to manage and reuse.
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Service', href: '/service' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Training & Courses', href: '/training-courses' },
    { name: 'News & Highlight', href: '/news-highlight' },
];

export default function Navbar() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);
    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { technologys } = useTechnology();

    // Create dynamic technology links from API data
    const technologyLinks = technologys?.map((tech: { id: string | number; title?: string; name?: string }) => {
        const href = `/technology/show/${tech.id}`;
        return {
            name: tech.title || tech.name || `Technology ${tech.id}`,
            href
        };
    }) || [];

    // Function to check if route is active
    const isActiveRoute = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    // Check if any technology route is active
    const isTechnologyActive = technologyLinks.some((link: { href: string }) => isActiveRoute(link.href));

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            
            // Check if click is outside mobile dropdown (when mobile is visible)
            const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(target);
            
            // Check if click is outside desktop dropdown (when desktop is visible)
            const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(target);
            
            // Close dropdown if clicking outside the currently visible dropdown
            if (mobileDropdownRef.current && isOutsideMobile && isMobileDropdownOpen) {
                setIsMobileDropdownOpen(false);
            }
            if (desktopDropdownRef.current && isOutsideDesktop && isDesktopDropdownOpen) {
                setIsDesktopDropdownOpen(false);
            }
        }

        if (isMobileDropdownOpen || isDesktopDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileDropdownOpen, isDesktopDropdownOpen]);

    return (
        <section>
            <Header />
            <header className="sticky top-0 z-50 bg-foreground border-t border-border">
                <div className="container mx-auto flex items-center justify-between">
                    {/*This is the hamburger menu for mobile.It will be hidden on medium and larger screens.*/}
                    <div className="md:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <Menu strokeWidth={1.75} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="bg-foreground">
                                <img src={icons.logo} alt="Logo" className="w-7 mt-3 ml-3" />
                                {/* Mobile menu content here */}
                                <nav className="flex flex-col space-y-2 py-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={`text-base font-medium px-5 text-white transition-all duration-200 ${isActiveRoute(link.href) ? 'bg-white !text-black py-2' : ''
                                                }`}
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {/* Technology links for mobile */}
                                    <div ref={mobileDropdownRef} className="relative">
                                        <button
                                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                                            className={`px-5 text-white hover:underline transition-all duration-200 font-semibold hover:bg-transparent hover:text-white py- 4cursor-pointer flex items-center gap-1 ${isTechnologyActive ? 'bg-white !text-black w-full py-2' : ''
                                                }`}
                                        >
                                            Our technology
                                            <ChevronDown strokeWidth={1.75} size={18} className="mt-1.5" />
                                        </button>
                                        {isMobileDropdownOpen && (
                                            <div className="absolute top-full left-8 mt-1 bg-white text-foreground rounded-md shadow-lg z-50 min-w-[185px] text-center">
                                                <ul className="grid gap-2 p-1.5">
                                                    {technologyLinks.length > 0 ? (
                                                        technologyLinks.map((link: { name: string; href: string }) => (
                                                            <li key={link.name}>
                                                                <button
                                                                    onClick={() => {
                                                                        console.log('Mobile navigation triggered for:', link.name, link.href);
                                                                        setIsMobileDropdownOpen(false);
                                                                        setIsSheetOpen(false);
                                                                        navigate(link.href);
                                                                    }}
                                                                    className="block w-full p-2 hover:bg-foreground hover:text-white rounded-md transition-colors text-left"
                                                                >
                                                                    {link.name}
                                                                </button>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="p-2 text-gray-500">
                                                            Loading technologies...
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/*This is the desktop navigation menu.It will be hidden on small screens and shown on medium and larger screens.*/}
                    <div className="hidden md:flex items-center justify-center w-full border-r border-l border-border py-3">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {/* Desktop navigation links */}
                                {navLinks.map((link) => (
                                    <NavigationMenuItem key={link.name}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={link.href}
                                                className={`lg:px-10 text-white hover:underline transition-all duration-200 lg:text-xl font-semibold hover:bg-transparent hover:text-white ${isActiveRoute(link.href) ? 'bg-white !text-black' : ''
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                {/* Desktop dropdown for "Our technology" */}
                                <NavigationMenuItem>
                                    <div ref={desktopDropdownRef} className="relative">
                                        <button
                                            onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                                            className={`lg:px-6 text-white hover:underline transition-all duration-200 lg:text-xl font-semibold  hover:text-white py-2 cursor-pointer flex items-center gap-1 ${isTechnologyActive ? 'bg-white !text-black rounded-md' : ''
                                                }`}
                                        >
                                            Our technology
                                            <ChevronDown strokeWidth={1.75} size={20} className="mt-1.5" />
                                        </button>
                                        {isDesktopDropdownOpen && (
                                            <div className="absolute top-[110%] left-[50%] transform -translate-x-1/2 mt- bg-white text-foreground rounded-md shadow-lg z-50 min-w-[185px]">
                                                <ul className="grid gap-2 p-1.5">
                                                    {technologyLinks.length > 0 ? (
                                                        technologyLinks.map((link: { name: string; href: string }) => (
                                                            <li key={link.name}>
                                                                <Link
                                                                    to={link.href}
                                                                    className="block p-2 hover:bg-foreground hover:text-white rounded-md transition-colors text-base font-semibold text-center"
                                                                    onClick={() => setIsDesktopDropdownOpen(false)}
                                                                >
                                                                    {link.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="p-2 text-gray-500 text-sm">
                                                            Loading technologies...
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </header>
        </section>
    )
}
