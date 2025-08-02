import { icons } from "@/lib/imageProvider";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-foreground text-white px-6 md:px-8 py-3.5">
            <div className="lg:px-10 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-md flex items-center justify-center">
                        <Link to="/">
                            <img src={icons.logo} alt="Your Company Logo" />
                        </Link>
                    </div>
                    <div className="">
                        <span className="font-semibold text-lg">Innovation in the chemical, <br /> energy industries</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                    <a href="mailto:info@yourcompany.com" className="flex items-center space-x-2 text-sm hover:underline">
                        <Mail size={18} />
                        <span className="font-semibold text-lg">info@yourcompany.com</span>
                    </a>
                    <a href="tel:+14122946089" className="flex items-center space-x-2 text-sm hover:underline">
                        <Phone size={18} />
                        <span className="font-semibold text-lg">(412) 294-6089</span>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/50">
                        <Linkedin strokeWidth={1.75} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
