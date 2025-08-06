import { useLocation } from 'react-router';

export default function NewsAndHighlightsSkeleton() {
      const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className="max-w-4xl animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg mb-6 shadow-lg"></div>
          
          {/* Title Skeleton */}
          <div className="py-4">
            <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-2"></div>
            <div className="h-7 bg-gray-200 rounded-md w-1/2"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
            
            {/* Read More Button Skeleton (only for home page) */}
            {isHomePage && (
              <div className="inline-flex items-center">
                <div className="h-4 bg-gray-200 rounded-md w-24"></div>
              </div>
            )}
          </div>
        </div>
  )
}
