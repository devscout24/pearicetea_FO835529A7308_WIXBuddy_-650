import { icons } from "@/lib/imageProvider";
import { Button } from "./ui/button";
import { Link } from "react-router";
import useSetting from "@/lib/useSetting";

export default function Header() {
    const { basicData, isLoading } = useSetting();
    return (
        <section className="bg-foreground lg:px-10 relative overflow-hidden">
            <img className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 " src={icons.circle} alt="Circle Icon" />
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    {isLoading ? <>
                        <div className="h-12 w-14 md:h-18 lg:h-28 lg:w-24 bg-gray-100 animate-pulse rounded"></div>
                    </> : <Link to="/">
                        <img className="h-12 w-14 md:h-18 lg:h-28 lg:w-24" src={basicData.logo} alt="Logo" />
                    </Link>}
                    <h1 className="text-lg md:text-3xl lg:text-5xl text-white font-bold font-roboto">Innovation in the chemical, energy <br /> industries</h1>
                </div>
                <Link to="/contact" className="z-10">
                    <Button variant="default" className="md:text-xl font-bold py-3 px-6 md:px-8 lg:px-10 rounded-full cursor-pointer ">Contact us</Button>
                </Link>
            </div>
        </section>
    )
}
