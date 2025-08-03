import CommonCard from "@/components/CommonCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";


export default function Services() {
    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Our Service
            </h1>
            {/* Grid for the service cards, rendered dynamically from the serviceData array */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceData.map((service, index) => (
                    <CommonCard
                        key={index}
                        service={service}
                    />
                ))}
            </div>

            {/* 'View All' button */}
            <div className="flex justify-center mt-10">
                <Link to='/service'>
                    <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                        <span>View All</span>
                        <ChevronDown size={20} />
                    </Button>
                </Link>
            </div>
        </section>
    )
}

// Sample data array to be mapped over
const serviceData = [
    {
        title: "Process Development",
        description: "Advanced modeling and simulation tools for scalable production processes."
    },
    {
        title: "Techno-Economic Assessment",
        description: "Evaluating project feasibility and economic viability for decision-making."
    },
    {
        title: "Custom Model Development",
        description: "Enhancing control of complex processes with tailored, accurate models.Enhancing control of complex processes with tailored, accurate models."
    },
    {
        title: "Data-Driven Process Scale-Up",
        description: "Scaling processes from lab to industrial scale for optimal performance."
    },
];
