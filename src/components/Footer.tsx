import useSetting from "@/lib/useSetting";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
    const { basicData, isLoading } = useSetting();
    
    if (isLoading) {
        return (
            <footer className="bg-foreground text-white px-6 md:px-8 py-3.5 animate-pulse">
                <div className="lg:px-10 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
                    {/* Left side - Logo and text skeleton */}
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-md bg-gray-300"></div>
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-300 rounded w-60"></div>
                        </div>
                    </div>

                    {/* Right side - Contact info skeleton */}
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                        {/* Email skeleton */}
                        <div className="flex items-center space-x-2">
                            <div className="w-[18px] h-[18px] bg-gray-300 rounded"></div>
                            <div className="h-5 bg-gray-300 rounded w-44"></div>
                        </div>
                        
                        {/* Phone skeleton */}
                        <div className="flex items-center space-x-2">
                            <div className="w-[18px] h-[18px] bg-gray-300 rounded"></div>
                            <div className="h-5 bg-gray-300 rounded w-32"></div>
                        </div>
                        
                        {/* LinkedIn icon skeleton */}
                        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-foreground text-white px-6 md:px-8 py-2">
            <div className="lg:px-10 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Link to="/">
                            <img src={basicData.logo} alt="Your Company Logo" />
                        </Link>
                    </div>
                    <div className="">
                        <span className="font-semibold text-base">{basicData.copyright_text}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                    <a href={`mailto:${basicData.email}`} className="flex items-center space-x-2 text-sm hover:underline">
                        <Mail size={18} />
                        <span className="font-semibold text-lg">{basicData.email}</span>
                    </a>
                    <a href={`tel:${basicData.phone}`} className="flex items-center space-x-2 text-sm hover:underline">
                        <Phone size={18} />
                        <span className="font-semibold text-lg">{basicData.phone_code} {basicData.phone_number}</span>
                    </a>
                    <a href={basicData.linkdln} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/50">
                        <Linkedin strokeWidth={1.75} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
