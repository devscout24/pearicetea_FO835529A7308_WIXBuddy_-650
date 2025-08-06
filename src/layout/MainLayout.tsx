import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsNew from "@/components/WhatsNew";
import { icons } from "@/lib/imageProvider";
import { Outlet, useLocation } from "react-router";


export default function MainLayout() {
    const location = useLocation();
    const currentpath = location.pathname;
    console.log("Current location:", currentpath);
    return (
        <main>
            <Navbar />
            <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4">
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }} />
                <div className={`md:col-span-2  ${currentpath.includes('article') ? 'md:col-span-8 lg:col-span-6' : 'lg:col-span-4'} min-h-[calc(100vh-289px)]`}>
                    <Outlet />
                </div>
                {!currentpath.includes('article') && (<div className="md:col-span-1 lg:col-span-2 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,#ccddf0_3px,#ccddf0_10px)] 
                dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,#374151_3px,#374151_6px)] 
                bg-gray-50 dark:bg-gray-900" >
                    <WhatsNew />
                </div>)}
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }} />
            </div>
            {/* footer */}
            <Footer />
        </main>
    )
}
