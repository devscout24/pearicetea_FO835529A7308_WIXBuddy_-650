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
      console.log("Technology Detail:", image);

    return (
        <div className="py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                    {title}
                </h1>

                {/* Image container with proper styling */}
                <div className="w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.2)]">
                    <img
                        src={`https://pearicetea.softvencefsd.xyz/${image}`}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("Image failed to load:", image);
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    )
}
