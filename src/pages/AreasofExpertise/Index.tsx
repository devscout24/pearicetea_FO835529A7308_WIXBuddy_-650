import CommonCard from "@/components/CommonCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router";


export default function AreasOfExpertise() {
    const location = useLocation();
    console.log("Current location:", location.pathname);
    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Areas of Expertise
            </h1>
            {/* Grid for the service cards, rendered dynamically from the serviceData array */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.pathname === '/' ? AreasOfExpertiseData.slice(0, 4).map((service, index) => (
                    <CommonCard
                        key={index}
                        service={service}
                    />
                )) : (
                    AreasOfExpertiseData.map((service, index) => (
                        <CommonCard
                            key={index}
                            service={service}
                        />
                    ))
                )}
            </div>
            {/* 'View All' button */}
            {location.pathname === '/' && (<div className="flex justify-center mt-10">
                <Link to='/expertise'>
                    <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                        <span>View All</span>
                        <ChevronDown size={20} />
                    </Button>
                </Link>
            </div>)}
        </section>
    )
}


const AreasOfExpertiseData = [
    {
        id: "gasification-1",
        title: "Gasification",
        description: "Process development for gasification technologies using coal, biomass, plastics, and other hydrocarbon feedstocks."
    },
    {
        id: "pyrolysis-1",
        title: "Pyrolysis",
        description: "Advance pyrolysis processes for converting organic materials into valuable products."
    },
    {
        id: "chemical-processing-1",
        title: "Chemical Processing",
        description: "Comprehensive chemical process engineering and optimization solutions."
    },
    {
        id: "pyrolysis-2",
        title: "Pyrolysis",
        description: "Sustainable energy solution and process integration for clean technology."
    },
    {
        id: "gasification-1",
        title: "Gasification",
        description: "Process development for gasification technologies using coal, biomass, plastics, and other hydrocarbon feedstocks."
    },
    {
        id: "pyrolysis-1",
        title: "Pyrolysis",
        description: "Advance pyrolysis processes for converting organic materials into valuable products."
    },
    {
        id: "chemical-processing-1",
        title: "Chemical Processing",
        description: "Comprehensive chemical process engineering and optimization solutions."
    },
    {
        id: "pyrolysis-2",
        title: "Pyrolysis",
        description: "Sustainable energy solution and process integration for clean technology."
    },
    {
        id: "gasification-1",
        title: "Gasification",
        description: "Process development for gasification technologies using coal, biomass, plastics, and other hydrocarbon feedstocks."
    },
    {
        id: "pyrolysis-1",
        title: "Pyrolysis",
        description: "Advance pyrolysis processes for converting organic materials into valuable products."
    },
    {
        id: "chemical-processing-1",
        title: "Chemical Processing",
        description: "Comprehensive chemical process engineering and optimization solutions."
    },
    {
        id: "pyrolysis-2",
        title: "Pyrolysis",
        description: "Sustainable energy solution and process integration for clean technology."
    }
]
