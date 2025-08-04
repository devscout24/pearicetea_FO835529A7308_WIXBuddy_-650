import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/imageProvider";
import { ChevronDown } from "lucide-react";
import { Link, Outlet } from "react-router";


export default function MainLayout() {
    return (
        <main>
            <Navbar />
            <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4">
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }} />
                <div className="md:col-span-2 lg:col-span-4 min-h-[calc(100vh-289px)]">
                    <Outlet />
                </div>
                <div className="md:col-span-1 lg:col-span-2 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,#ccddf0_3px,#ccddf0_10px)] 
                dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,#374151_3px,#374151_6px)] 
                bg-gray-50 dark:bg-gray-900" >
                    <div className="bg-white mt-12 px-5 py-7">
                        <h1 className="text-xl font-semibold text-foreground mb-4 underline">What’s New</h1>
                        <ul className="text-lg font-normal space-y-4">
                            <li>ETSI Creating Custom Designed Training Webinars</li>
                            <li>ETSI acquisition of Grubb Filtration Assets</li>
                            <li>EPA Small Business Innovation Research (SBIR)</li>
                        </ul>
                        <div className="flex justify-center my-5">
                            <Link to='/expertise'>
                                <Button variant="outline" className="flex items-center !px-5.5 !py-3.5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                                    <span>View All</span>
                                    <ChevronDown size={20} />
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-foreground mb-4 underline">Pro Tip</h1>
                            <p className="text-lg font-normal">The Golden Rules of Fabric Filtration -Rule #9</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }} />
            </div>
            {/* footer */}
            <Footer />
        </main>
    )
}
