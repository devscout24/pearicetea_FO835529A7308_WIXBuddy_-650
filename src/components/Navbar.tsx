import Header from "./Header";
import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";

// We'll define the navigation links here to make them easy to manage and reuse.
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Service', href: '/service' },
    { name: 'Expertise', href: '/expertise' },
    { name: 'Training & Courses', href: '/training-courses' },
    { name: 'News & Highlight', href: '/news-highlight' },
];

// Dropdown items for "Our technology"
const technologyLinks = [
    { name: 'Technology 1', href: '/tech/1' },
    { name: 'Technology 2', href: '/tech/2' },
    { name: 'Technology 3', href: '/tech/3' },
];

export default function Navbar() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Function to check if route is active
    const isActiveRoute = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    // Check if any technology route is active
    const isTechnologyActive = technologyLinks.some(link => isActiveRoute(link.href));

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false);
    };

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
                                {/* Mobile menu content here */}
                                <nav className="flex flex-col space-y-2 py-5">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={`text-base font-medium px-5 text-white transition-all duration-200 ${
                                                isActiveRoute(link.href) ? 'bg-white !text-black' : ''
                                            }`}
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {/* Technology links for mobile */}
                                        <div ref={dropdownRef} className="relative">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`px-5 text-white hover:underline transition-all duration-200 font-semibold hover:bg-transparent hover:text-white py-4 cursor-pointer flex items-center gap-1 ${
                                                    isTechnologyActive ? 'bg-white !text-black' : ''
                                                }`}
                                            >
                                                Our technology
                                                <ChevronDown strokeWidth={1.75} size={18} className="mt-1.5" />
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute top-full left-8 mt-1 bg-[#1e78c0] text-white p-2 border border-border rounded-md shadow-lg z-50 min-w-[200px]">
                                                    <ul className="grid gap-2 p-2">
                                                        {technologyLinks.map((link) => (
                                                            <li key={link.name}>
                                                                <Link
                                                                    to={link.href}
                                                                    className="block p-2 hover:bg-white/20 rounded-md transition-colors"
                                                                    onClick={handleDropdownItemClick}
                                                                >
                                                                    {link.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/*This is the desktop navigation menu.It will be hidden on small screens and shown on medium and larger screens.*/}
                    <div className="hidden md:flex items-center justify-center w-full border-r border-l border-border py-0">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {/* Desktop navigation links */}
                                {navLinks.map((link) => (
                                    <NavigationMenuItem key={link.name}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={link.href}
                                                className={`lg:px-10 text-white hover:underline transition-all duration-200 lg:text-xl font-semibold hover:bg-transparent hover:text-white ${
                                                    isActiveRoute(link.href) ? 'bg-white !text-black' : ''
                                                }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                {/* Desktop dropdown for "Our technology" */}
                                <NavigationMenuItem>
                                    <div ref={dropdownRef} className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`lg:px-10 text-white hover:underline transition-all duration-200 lg:text-xl font-semibold hover:bg-transparent hover:text-white py-4 cursor-pointer flex items-center gap-1 ${
                                                isTechnologyActive ? 'bg-white !text-black' : ''
                                            }`}
                                        >
                                            Our technology
                                            <ChevronDown strokeWidth={1.75} size={20} className="mt-1.5" />
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-1 bg-[#1e78c0] text-white p-2 border border-gray-600 rounded-md shadow-lg z-50 min-w-[200px]">
                                                <ul className="grid gap-2 p-2">
                                                    {technologyLinks.map((link) => (
                                                        <li key={link.name}>
                                                            <Link
                                                                to={link.href}
                                                                className="block p-2 hover:bg-white/20 rounded-md transition-colors"
                                                                onClick={handleDropdownItemClick}
                                                            >
                                                                {link.name}
                                                            </Link>
                                                        </li>
                                                    ))}
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
