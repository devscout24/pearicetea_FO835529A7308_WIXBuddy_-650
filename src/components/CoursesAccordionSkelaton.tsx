

export default function CoursesAccordionSkelaton() {
    return (
        <section>
            <div className="w-full space-y-4">
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="bg-muted-foreground/20 py-2 px-5 rounded-md animate-pulse">
                        <div className="flex md:items-center justify-between w-full gap-3 py-4">
                            {/* Title skeleton */}
                            <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                            {/* Icon skeleton */}
                            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                        </div>
                        {/* Expanded content skeleton (show for first item) */}
                        {index === 1 && (
                            <div className="md:w-[85%] pb-4 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
