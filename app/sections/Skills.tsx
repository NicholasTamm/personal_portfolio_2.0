"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import { SkillSet } from '../types';

const skillList: SkillSet = {
    languages: ["C", "C++", "HTML", "CSS", "Java", "JavaScript", "Python", "Kotlin", "R", "SQL", "TypeScript"],
    frameworks: ["React", "FastAPI", "Qt", "Boost", "Next.js", "Node.js"],
    devtools: ["Github", "GitLab", "Azure", "Docker", "DockerFiles", "Android Studio"]
};

const categories = ["Languages", "Frameworks", "Dev-Tools"];
const skillValues = Object.values(skillList) as string[][];

export default function Skills() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);

    // Refs for intervals and timeouts
    const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    }, []);

    // Handle manual interaction (arrows or dots)
    const handleInteraction = useCallback(() => {
        setIsInteracting(true);

        // Clear existing interaction timeout if any
        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }

        // Set new timeout to resume auto-scroll after 3 seconds
        interactionTimeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
            interactionTimeoutRef.current = null;
        }, 3000);
    }, []);

    const manualNextSlide = () => {
        handleInteraction();
        nextSlide();
    };

    const manualPrevSlide = () => {
        handleInteraction();
        prevSlide();
    };

    const manualSetIndex = (index: number) => {
        handleInteraction();
        setCurrentIndex(index);
    };

    // Effect for auto-scrolling
    useEffect(() => {
        // Clear interval if it exists
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = null;
        }

        // Only set interval if not hovered and not interacting
        if (!isHovered && !isInteracting) {
            autoScrollIntervalRef.current = setInterval(nextSlide, 3000);
        }

        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, [isHovered, isInteracting, nextSlide]);

    // Cleanup effect for interaction timeout
    useEffect(() => {
        return () => {
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
        };
    }, []);

    return (
        <section id="skills" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
                Skills and Interests
            </h2>

            <div
                className="mx-auto max-w-5xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center justify-between gap-4">
                    {/* Left Arrow */}
                    <button
                        onClick={manualPrevSlide}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white hidden md:block"
                        aria-label="Previous skill category"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div className="flex-1 flex flex-col items-center gap-4 min-h-[160px] transition-opacity duration-500">
                        <h3 className="text-center text-xl font-bold text-zinc-300">
                            {categories[currentIndex]}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {skillValues[currentIndex].map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="rounded-full bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={manualNextSlide}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white hidden md:block"
                        aria-label="Next skill category"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    {categories.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => manualSetIndex(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-white w-8"
                                : "bg-white/20 hover:bg-white/40"
                                }`}
                            aria-label={`Go to ${categories[index]}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
