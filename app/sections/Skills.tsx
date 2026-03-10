"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories, skillValues } from "../data/skills";
import Pill from "../components/Pill";
import SectionHeading from "../components/SectionHeading";

export default function Skills() {
    const [activeTab, setActiveTab] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % categories.length);
        }, 5000);
    }, []);

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        resetTimer();
    };

    return (
        <section id="skills" className="container mx-auto px-4 py-28 md:py-36 md:px-6">
            <SectionHeading number="03" label="Skills" title="Skills and Interests" />

            <div className="mx-auto max-w-5xl">
                {/* Tab buttons */}
                <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            onClick={() => handleTabClick(index)}
                            className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none ${
                                index === activeTab
                                    ? "bg-accent-muted text-accent border border-accent/30"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skills grid */}
                <div className="min-h-[120px] flex items-start justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-wrap justify-center gap-2"
                        >
                            {skillValues[activeTab].map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : index * 0.03 }}
                                >
                                    <Pill
                                        variant="subtle"
                                        size="md"
                                        className="font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                                    >
                                        {skill}
                                    </Pill>
                                </motion.span>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
