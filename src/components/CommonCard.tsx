import type { TCommonCard } from "@/types/commonCard.type";

interface CommonCardProps {
  service: TCommonCard; 
}

export default function CommonCard({service}: CommonCardProps) {
  const { title, description } = service;
  return (
     <div className="bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)]">
      <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
      <p className="text-description">{description}</p>
    </div>
  )
}
