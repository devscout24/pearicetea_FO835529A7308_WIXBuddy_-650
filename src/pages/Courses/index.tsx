import useCourse from "@/lib/useCourse";
import { useLocation } from "react-router";
import CourseAccordion from "./components/CourseAccordion";


export default function Courses() {
    const { courses } = useCourse();
    const location = useLocation();
    const currentpath = location.pathname;

    return (
        <section className="py-10 px-4">
            <div className="mb-5">
                <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                    {courses.title}
                </h1>
                <p className="text-base text-description">
                    {currentpath === '/'
                        ? (courses?.description ? `${courses.description.slice(0, 340)}...` : '')
                        : (courses?.description || '')}
                </p>
            </div>
            <CourseAccordion />
        </section>
    )
}
