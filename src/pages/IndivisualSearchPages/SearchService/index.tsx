import CommonCard from '@/components/CommonCard';
import CommonCardSkeleton from '@/components/CommonCardSkeleton';
import { useSearchData } from '@/lib/useSearchData';
import type { TCommonCard } from '@/types/commonCard.type';
import { useSearchParams } from 'react-router';

export default function SearchService() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const { data: allData = {}, isLoading, error } = useSearchData(searchQuery);

    if(error) {
        return (
            <div className="text-center py-8 flex items-center justify-center h-full">
                <p className="text-red-600">Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Our Service
            </h1>
            {/* Grid for the service cards, rendered dynamically from the serviceData array */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <CommonCardSkeleton key={index} />
                    ))
                ) : (
                    allData.service.map((service: TCommonCard) => (
                        <CommonCard
                            key={service.id}
                            service={service}
                        />
                    ))
                )}
            </div>
        </section>
    )
}
