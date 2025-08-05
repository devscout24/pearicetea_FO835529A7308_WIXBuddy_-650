import AreasOfExpertise from "../AreasofExpertise/Index";
import NewsAndHighlights from "../NewsAndHighlights/Index";
import OurService from "../OurService/Index";
import OurTechnology from "../OurTechnology/Index";


export default function Home() {
  return (
    <section>
        <OurService />
        <AreasOfExpertise />
        <NewsAndHighlights />
        <OurTechnology />
    </section>
  )
}
