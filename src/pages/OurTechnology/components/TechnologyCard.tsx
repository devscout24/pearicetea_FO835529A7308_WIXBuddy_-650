import type { Technology } from "@/types/expertise.type";
import { ArrowUpRight } from "lucide-react";


export default function TechnologyCard({ technology }: { technology: Technology }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.2)]">
            {/* Image */}
            <div className="h-48 w-full">
                <img
                    src={technology.image}
                    alt={technology.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Footer */}
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h3 className="mt-1 text-base font-semibold text-gray-900">{technology.title}</h3>
                </div>
                <button
                    className="bg-foreground text-white p-2 rounded-full cursor-pointer"
                >
                    <ArrowUpRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
