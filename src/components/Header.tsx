import { icons } from "@/lib/imageProvider";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Header() {
    return (
        <section className="bg-foreground lg:px-10 relative overflow-hidden">
            <img className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2" src={icons.circle} alt="Circle Icon" />
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <img className="h-12 md:h-18 lg:h-28" src={icons.logo} alt="Logo" />
                    </Link>
                    <h1 className="text-lg md:text-3xl lg:text-5xl text-white font-bold font-roboto">Innovation in the chemical, energy <br /> industries</h1>
                </div>
                <Button variant="default" className="md:text-xl font-bold py-3 px-6 md:px-8 lg:px-10 rounded-full cursor-pointer z-10">Contact us</Button>
            </div>
        </section>
    )
}
