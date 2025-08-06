import { useState } from "react";
import { useLoaderData } from "react-router";


interface Technology {
    data: {
        data: {
            id: number;
            title: string;
            image: string;
            description: string;
        };
    }
}

export default function TechnologyDetail() {
    const { title, image, description } = (useLoaderData() as Technology).data.data;
    const [fullText, ] = useState<string>(description);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    


    const getPreviewHTML = (html: string, wordLimit: number) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        const words = textContent.split(/\s+/);
        const truncated = words.slice(0, wordLimit).join(" ");
        return `${truncated}...`;
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                    {title}
                </h1>

                {/* Image container with proper styling */}
                <div className="w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.2)]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("Image failed to load:", image);
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                <p className="prose max-w-none text-gray-700 leading-relaxed">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: isExpanded ? fullText : getPreviewHTML(fullText, 50),
                        }}
                    />
                    {fullText && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-foreground hover:underline ml-1 cursor-pointer"
                        >
                            {isExpanded ? "Show Less" : "Read More"}
                        </button>
                    )}
                </p>
            </div>
        </div>
    )
}
