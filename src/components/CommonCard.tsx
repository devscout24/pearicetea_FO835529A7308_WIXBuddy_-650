import type { TCommonCard } from "@/types/commonCard.type";
import type { Articles } from "@/types/expertise.type";
import { Link, useLocation } from "react-router";

interface CommonCardProps {
  service?: TCommonCard;
  article?: Articles;
}

export default function CommonCard({ service, article }: CommonCardProps) {
  const location = useLocation();
  const currentpath = location.pathname;
  const { title, description } = service || article || {};

  return (
    <>
      {(currentpath === '/articles' || currentpath.includes('global')) ? (
        <Link to={`/article/${article?.id}`} className={`bg-white p-6 rounded-md duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] hover:scale-103 transition-transform ${currentpath.includes('articles') ? '' : ''}`}>
          <div >
            <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
            <p className="text-description">{description}</p>
          </div>
        </Link>
      ) : (
        <div className={`bg-white p-6 rounded-md transition-shadow duration-300 shadow-[0_0_14px_rgba(0,0,0,0.2)] ${currentpath.includes('articles') ? '' : ''}`}>
          <h2 className="text-xl font-bold text-foreground mb-2.5">{title}</h2>
          <p className="text-description">{description}</p>
        </div>
      )}
    </>
  )
}
