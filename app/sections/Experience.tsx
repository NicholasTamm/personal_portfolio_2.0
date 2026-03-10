"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Modal from "../components/Modal";
import Pill from "../components/Pill";
import SectionHeading from "../components/SectionHeading";
import { LocationIcon } from "../components/Icons";
import { ExperienceData } from "../types";
import { experiences } from "../data/experiences";

export default function Experience() {
    const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const cardVariants = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : { hidden: { opacity: 0, y: 30, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1 } };

    const handleKeyDown = (e: React.KeyboardEvent, exp: ExperienceData) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedExperience(exp);
        }
    };

    return (
        <section id="experience" className="container mx-auto px-4 py-28 md:py-36 md:px-6">
            <div className="mx-auto max-w-5xl">
                <SectionHeading number="02" label="Experience" title="Experiences and Clubs" />
                <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedExperience(exp)}
                            onKeyDown={(e) => handleKeyDown(e, exp)}
                            role="button"
                            tabIndex={0}
                            className="relative rounded-2xl bg-white/5 w-full max-w-lg p-8 border border-white/5 transition-all hover:scale-105 hover:border-accent/20 hover:shadow-lg hover:shadow-white/5 cursor-pointer focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                        >
                            <div className="flex flex-col gap-6 sm:flex-row items-center sm:items-start">
                                <div className="flex-shrink-0">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/90 p-1">
                                        <Image
                                            src={exp.logo}
                                            alt={`${exp.company} logo`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                    <p className="mt-1 text-sm font-medium text-zinc-300">{exp.company}</p>
                                    <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                                        {exp.skills.slice(0, 4).map((skill) => (
                                            <Pill key={skill} size="sm" className="font-medium text-zinc-300">
                                                {skill}
                                            </Pill>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-xs text-zinc-500 md:hidden">Tap for details</p>
                        </motion.div>
                    ))}
                </div>

                {/* Modal */}
                <Modal isOpen={selectedExperience !== null} onClose={() => setSelectedExperience(null)}>
                    {selectedExperience && (
                        <div className="max-h-[65vh] overflow-y-auto no-scrollbar">
                            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                                <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-white/90 p-2 flex-shrink-0">
                                    <Image
                                        src={selectedExperience.logo}
                                        alt={`${selectedExperience.company} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div className="text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-white">{selectedExperience.role}</h3>
                                    <p className="text-base font-medium text-zinc-300">{selectedExperience.company}</p>
                                    <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                                        <Pill size="sm" className="text-sm text-zinc-400">
                                            {selectedExperience.period}
                                        </Pill>
                                        <Pill size="sm" className="flex items-center gap-1.5 text-sm text-zinc-400">
                                            <LocationIcon className="w-3.5 h-3.5" />
                                            {selectedExperience.location}
                                        </Pill>
                                    </div>
                                </div>
                            </div>


                            {/* In depth description */}
                            <div className="prose prose-invert max-w-none">
                                <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                                    {selectedExperience.description.map((item, i) => (
                                        <li key={i} className="text-sm leading-relaxed">{item}</li>
                                    ))}
                                </ul>

                                {/* Skills */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {selectedExperience.skills.map((skill) => (
                                        <Pill key={skill} size="sm" className="text-sm font-medium text-zinc-300">
                                            {skill}
                                        </Pill>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </section>
    );
}
