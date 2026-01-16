"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "../components/Modal";

interface ExperienceData {
    company: string;
    role: string;
    period: string;
    description: string[];
    location: string;
    logo: string;
    skills: string[];
}

export default function Experience() {
    const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

    const experiences: ExperienceData[] = [
        {
            company: "SFU Robot Soccer",
            role: "Head Developer",
            period: "Feburary 2025 - Present",
            location: "Burnaby, British Columbia",
            description: [
                "Engineered game-state reactivity with Qt signals and slots integrated into a Behavior Tree framework, enabling robots to autonomously process referee commands and maintain 100% compliance with SSL rule enforcement in both simulation and live matches",
                "Spearheaded development of an autonomous agent in C++ using Behavior Trees, enabling real-time decision-making and active game state reflex for 6 robots",
                "Developed and implemented 10+ unit tests with BoostUT to validate robot behaviour and movement, increasing reliability of strategic play and tactic management by 30%"
            ],
            logo: "/SFUrs.png",
            skills: ["C++", "Qt", "BoostUT", "Dockerfile"]
        },
        {
            company: "PricewaterhouseCoopers (PwC)",
            role: "Data Engineer Intern",
            period: "July 2022 - September 2022",
            location: "Central, Hong Kong",
            description: [
                "Built ETL pipelines to perform data migration from cloud platform to custom designed database, ensuring 100% data accuracy and integrity throughout the process",
                "Deployed and tested an Azure Synapse pipeline to query, validate, and process 11M+ database records, automating Excel report generation and reducing manual preparation time for consultants and client-facing services by 70%",
                "Automated manual data handling and error-prone tasks by developing a custom Python script to validate and transform data"
            ],
            logo: "/pwc.png",
            skills: ["Azure", "Python", "SQL", "PowerShell", "Bash", "OutSystems", "Excel"]
        }
    ];

    return (
        <section id="experience" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
                Experiences and Clubs
            </h2>
            <div className="flex flex-col md:flex-row justify-center mx-auto max-w-4xl gap-8 items-center">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -50% 0px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedExperience(exp)}
                        className="relative rounded-2xl bg-component max-w-md p-8 transition-transform hover:scale-110 cursor-pointer"
                    >
                        <div className="flex flex-col gap-6 sm:flex-row items-center sm:items-start">
                            <div className="flex-shrink-0">
                                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white p-1">
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
                                <p className="mt-1 text-lg font-medium text-zinc-300">{exp.company}</p>
                                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                                    {exp.skills.slice(0, 4).map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {selectedExperience && (
                <Modal onClose={() => setSelectedExperience(null)}>

                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white p-2 flex-shrink-0">
                            <Image
                                src={selectedExperience.logo}
                                alt={`${selectedExperience.company} logo`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-white">{selectedExperience.role}</h3>
                            <p className="text-xl font-medium text-zinc-300">{selectedExperience.company}</p>
                            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
                                    {selectedExperience.period}
                                </span>
                                <span className="flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {selectedExperience.location}
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* In depth description */}
                    <div className="prose prose-invert max-w-none">
                        <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                            {selectedExperience.description.map((item, i) => (
                                <li key={i} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>

                        {/* Skills */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {selectedExperience.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
}
