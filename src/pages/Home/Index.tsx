import AreasOfExpertise from "../AreasofExpertise/Index";
import ContactUs from "../ContuctUs";
import Courses from "../Courses";
import NewsAndHighlights from "../NewsAndHighlights/Index";
import OurService from "../OurService/Index";
import OurTechnology from "../OurTechnology/Index";


export default function Home() {
  return (
    <section>
      <OurService />
      <AreasOfExpertise />
      <Courses />
      <NewsAndHighlights />
      <OurTechnology />
      <ContactUs />
    </section>
  )
}
