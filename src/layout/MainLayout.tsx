import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { icons } from "@/lib/imageProvider";
import { Outlet } from "react-router";


export default function MainLayout() {
    return (
        <main>
            <Navbar />
            <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-4">
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }}/>
                <div className="md:col-span-2 lg:col-span-4 min-h-[calc(100vh-289px)]">
                    <Outlet />
                </div>
                <div className="md:col-span-1 lg:col-span-2 bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,#ccddf0_3px,#ccddf0_10px)] 
                dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,#374151_3px,#374151_6px)] 
                bg-gray-50 dark:bg-gray-900" >
                    <div>
                        lorem10000
                    </div>
                </div>
                <div className="col-span-1 hidden lg:block" style={{ backgroundImage: `url(${icons.dot})`, backgroundPosition: 'center' }}/>
            </div>
            {/* footer */}
            <Footer />
        </main>
    )
}
