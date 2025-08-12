import CoursesAccordionSkelaton from "@/components/CoursesAccordionSkelaton";
import { useSearchData } from "@/lib/useSearchData";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {  Minus, Plus } from "lucide-react";
import parse, { domToReact, Element } from "html-react-parser";


interface CourseAccordion {
    id: string;
    title: string;
    description: string;
}


export default function SearchCourses() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const { data: allData = {}, isLoading, error } = useSearchData(searchQuery);
    const coursesAccordion: CourseAccordion[] = allData.course || [];
    const [openItem, setOpenItem] = useState<string | null>(coursesAccordion && coursesAccordion.length > 0 ? coursesAccordion[0].id : null);
    console.log("Search Query:", searchQuery);
    console.log("All Data:", coursesAccordion);

    const renderDescription = (htmlString: string | undefined) => {
        if (!htmlString || typeof htmlString !== 'string') {
            return null;
        }

        // First, decode HTML entities
        const decodeHtmlEntities = (str: string) => {
            const entityMap: { [key: string]: string } = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#39;': "'",
                '&nbsp;': ' ',
                '&apos;': "'",
                '&cent;': '¢',
                '&pound;': '£',
                '&yen;': '¥',
                '&euro;': '€',
                '&copy;': '©',
                '&reg;': '®'
            };

            // First handle named entities
            let decoded = str.replace(/&[a-zA-Z]+;/g, (entity) => {
                return entityMap[entity] || entity;
            });

            // Then handle numeric entities like &#39;
            decoded = decoded.replace(/&#(\d+);/g, (_, num) => {
                return String.fromCharCode(parseInt(num, 10));
            });

            // Clean up any malformed HTML patterns like ">"> or similar
            decoded = decoded.replace(/["'][>]+["']/g, '');
            decoded = decoded.replace(/>[">]+/g, '');
            decoded = decoded.replace(/["']{2,}/g, '"');

            return decoded.trim();
        };

        // Decode HTML entities first
        const decodedString = decodeHtmlEntities(htmlString);

        // Remove HTML tags to get plain text for parsing structure
        const plainText = decodedString.replace(/<[^>]*>/g, '').trim();

        // Split by line breaks first
        let lines = plainText.split(/[\n\r]+/).map(line => line.trim()).filter(line => line.length > 0);

        // If no line breaks, try splitting by common patterns
        if (lines.length <= 1) {
            lines = plainText
                .split(/(?=Chapter\s+)|(?=Course\s+Material:)|(?=Time\s+Frame:)|(?=Cost:)/gi)
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }

        // Separate chapters from course details
        const chapters: string[] = [];
        const courseDetails: string[] = [];

        lines.forEach(line => {
            if (line.toLowerCase().includes('chapter') ||
                line.match(/^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*[-–—]\s*.+/i)) {
                chapters.push(line);
            } else if (line.includes('Course Material:') || line.includes('Time Frame:') || line.includes('Cost:')) {
                courseDetails.push(line);
            } else if (line.match(/material|frame|cost|price|\$|hours|days|textbook|included/i)) {
                courseDetails.push(line);
            }
        });

        // If we have structured content, return formatted version
        if (chapters.length > 0 || courseDetails.length > 0) {
            return (
                <div className="space-y-4">
                    {/* Course Content Header */}
                    {chapters.length > 0 && (
                        <div>
                            <h4 className="text-muted-title font-semibold text-base mb-3">Course Content:</h4>

                            {/* Chapters with bullet points */}
                            <div className="space-y-2">
                                {chapters.map((chapter, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="text-description mt-0.5 text-base">•</span>
                                        <div className="flex-1 text-description">{chapter}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Course Details without bullets */}
                    {courseDetails.length > 0 && (
                        <div className="space-y-1 text-base text-muted-title">
                            {courseDetails.map((detail, index) => (
                                <div key={index}>{detail}</div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // If no structured content found, use html-react-parser for general HTML content
        return parse(decodedString, {
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
                <p className="text-red-600">Failed to load courses. Please try again later.</p>
            </div>
        )
    }

    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                    Professional Training Courses
                </h1>
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 "
                // defaultValue={currentpath === '/training-courses' && coursesAccordion.length > 0 ? coursesAccordion[0].id : ""}
                onValueChange={(value) => setOpenItem(value)}
            >

                {coursesAccordion.map((course: CourseAccordion) => (
                    <div key={course.id}>
                        <AccordionItem value={course.id} className={`bg-muted-foreground/20 py-2 px-5 rounded-md`}>
                            <AccordionTrigger>
                                <div className="flex md:items-center justify-between w-full gap-3 cursor-pointer">
                                    <span className="text-base md:text-xl text-title02">{course.title}</span>
                                    {openItem === course.id ? <div className="bg-muted-foreground/80 p-1 rounded-full">
                                        <Minus strokeWidth={1.75} className="size-5 text-white" />
                                    </div> : <div className="bg-foreground p-1 rounded-full">
                                        <Plus strokeWidth={1.75} className="size-5 text-white" />
                                    </div>}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="md:w-[85%]">
                                <div className="text-sm md:text-base text-description prose max-w-none">
                                    {renderDescription(course.description)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                ))}

            </Accordion>
        </section>
    )
}
