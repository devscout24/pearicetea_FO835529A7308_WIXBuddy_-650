export default function CommonCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-2.5 w-3/4"></div>
      
      {/* Description skeleton - multiple lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  )
}
