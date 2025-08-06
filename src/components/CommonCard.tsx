import type { TCommonCard } from "@/types/commonCard.type";
import type { Articles } from "@/types/expertise.type";
import { useLocation } from "react-router";

interface CommonCardProps {
  service?: TCommonCard; 
  article?: Articles;
}

export default function CommonCard({service, article}: CommonCardProps) {
  const location = useLocation();
  const currentpath = location.pathname;
  console.log("Current location:", currentpath);
  const { title, description } = service || article || {};
  return (
     <div className={`bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] ${currentpath.includes('articles') ? '' : ''}`}>
      <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
      <p className="text-description">{description}</p>
    </div>
  )
}
