import CoursesAccordionSkelaton from "@/components/CoursesAccordionSkelaton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import useCourseAccordion from "@/lib/useCourseAccordion";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import parse, { domToReact, Element } from "html-react-parser";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

interface CourseAccordion {
    id: string;
    title: string;
    description: string;
}


export default function CourseAccordion() {
    const location = useLocation();
    const currentpath = location.pathname;
    const { coursesAccordion, isLoading, error } = useCourseAccordion();
    console.log("course Accordion", coursesAccordion);
    const [openItem, setOpenItem] = useState<string | null>(coursesAccordion && coursesAccordion.length > 0 ? coursesAccordion[0].id : null);

    const renderDescription = (htmlString: string | undefined) => {
        if (!htmlString || typeof htmlString !== 'string') {
            return null;
        }

        return parse(htmlString, {
            replace: (node) => {
                if (node instanceof Element && node.name === "a") {
                    const href = node.attribs.href;
                    const text = domToReact(node.children as import("html-react-parser").DOMNode[]);

                    // Custom styled link
                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground font-semibold hover:underline"
                        >
                            {text}
                        </a>
                    );
                }
            },
        });
    };

    // Skeleton loader component
    if (isLoading) {
        return (
            <CoursesAccordionSkelaton />
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">Failed to load services. Please try again later.</p>
            </div>
        )
    }

    return (
        <section>
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 "
                defaultValue={currentpath === '/training-courses' && coursesAccordion.length > 0 ? coursesAccordion[0].id : "item-1"}
                onValueChange={(value) => setOpenItem(value)}
            >
                {currentpath === '/' ? coursesAccordion.slice(0, 3).map((course: CourseAccordion) => (
                    <div key={course.id}>
                        <AccordionItem value={course.id} className={`bg-muted-foreground/20 py-2 px-5 rounded-md`}>
                            <AccordionTrigger>
                                <div className="flex md:items-center justify-between w-full gap-3 cursor-pointer">
                                    <span className="text-base md:text-xl text-foreground01">{course.title}</span>
                                    {openItem === course.id ? <Minus strokeWidth={1.75} className="size-6" /> :  <Plus strokeWidth={1.75} className="size-6" />}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="md:w-[85%]">
                                <div className="text-sm md:text-base text-description prose max-w-none">
                                    {renderDescription(course.description)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                )) :
                    coursesAccordion.map((course: CourseAccordion) => (
                        <div key={course.id}>
                            <AccordionItem value={course.id} className={`bg-muted-foreground/20 py-2 px-5 rounded-md`}>
                                <AccordionTrigger>
                                    <div className="flex md:items-center justify-between w-full gap-3 cursor-pointer">
                                        <span className="text-base md:text-xl text-foreground01">{course.title}</span>
                                        {openItem === course.id ? <Minus strokeWidth={1.75} className="size-6" /> :  <Plus strokeWidth={1.75} className="size-6" />}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="md:w-[85%]">
                                    <div className="text-sm md:text-base text-description prose max-w-none">
                                        {renderDescription(course.description)}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </div>
                    ))
                }
            </Accordion>

            {/* 'View All' button */}
            {location.pathname === '/' && (<div className="flex justify-center mt-10">
                <Link to='/training-courses'>
                    <Button variant="outline" className="flex items-center !px-10 !py-5 border-foreground text-foreground text-xl font-medium rounded-md transition-all duration-300 hover:bg-foreground hover:text-white ease-in-out cursor-pointer">
                        <span>View All</span>
                        <ChevronDown size={20} />
                    </Button>
                </Link>
            </div>)}
        </section>
    )
}
