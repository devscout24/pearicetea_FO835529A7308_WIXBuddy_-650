import CommonCard from "@/components/CommonCard";
import CommonCardSkeleton from "@/components/CommonCardSkeleton";
import { Button } from "@/components/ui/button";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import type { TCommonCard } from "@/types/commonCard.type";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router";


export default function OurService() {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  const axiosCommon = useAxiosCommon();


  const { data: services = [], isLoading, error, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const { data } = await axiosCommon.get('/service/index');
        return data.data;
      } catch (err: unknown) {
        console.error("Failed to fetch services:", err instanceof Error ? err.message : err);
      }
    }
  })
  // console.log("Service data:", services); 

  if (error) {
    return <div className="py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
        Our Service
      </h1>
      <div className="flex items-center gap-5 justify-center">
        <div className="text-red-500 text-center">{error.message}</div>
        <Button variant="default" onClick={() => refetch()} className="cursor-pointer px-8">
          Retry
        </Button>
      </div>
    </div>
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
          Array.from({ length: location.pathname === '/' ? 4 : 8 }).map((_, index) => (
            <CommonCardSkeleton key={index} />
          ))
        ) : (
          location.pathname === '/' ? services.slice(0, 4).map((service: TCommonCard) => (
            <CommonCard
              key={service.id}
              service={service}
            />
          )) : (
            services.map((service: TCommonCard) => (
              <CommonCard
                key={service.id}
                service={service}
              />
            ))
          )
        )}
      </div>
      {/* 'View All' button */}
      {location.pathname === '/' && (<div className="flex justify-center mt-10">
        <Link to='/service'>
          <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
            <span>View All</span>
            <ChevronDown size={20} />
          </Button>
        </Link>
      </div>)}
    </section>
  )
}
