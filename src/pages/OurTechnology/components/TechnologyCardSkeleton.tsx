export default function TechnologyCardSkeleton() {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.2)] animate-pulse">
            {/* Image skeleton */}
            <div className="h-48 w-full bg-gray-200"></div>

            {/* Footer skeleton */}
            <div className="p-4 pt-0 flex justify-between items-center">
                <div className="p-4">
                    {/* Title skeleton */}
                    <div className="mt-1 h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
                {/* Button skeleton */}
                <div className="bg-gray-200 p-2 rounded-full w-9 h-9"></div>
            </div>
        </div>
    )
}
