
import { useLoaderData } from "react-router";


export default function ArticleDetail() {
    const article = useLoaderData();
    console.log("Article Detail Data:", article.data.data);
    const { title, description, image } = article.data.data || {};
    return (
        <section className="px-5 py-8">
            <h1 className="text-3xl font-semibold text-title02 mb-7">{title}</h1>
            {/* {image && <img src={image} alt={title} className="h- w-full object-cover rounded-md" />} */}
            <div className="w-full h-64 md:h-[500px] mb-6 rounded-lg overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.2)]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="mt-6 text-lg font-normal text-title02/80">{description}</p>
        </section>
    )
}
