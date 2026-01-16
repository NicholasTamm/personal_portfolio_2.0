"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";

interface ProjectData {
    title: string;
    description: string;
    keyContribution: string[];
    tags: string[];
    link: string;
    additionalLink: string;
    period: string;
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    const projects: ProjectData[] = [
        {
            title: "MovieFinder",
            description: "Jetpack-Compose Android app for discovering movies",
            keyContribution: [
                "Implemented an NLP-driven search pipeline that translated user-described movie features into structured queries, enhancing search expressiveness beyond keyword matching",
                "Developed a Jetpack-Compose–based, infinite vertical scrolling trailer feed using the YouTube Player API, caching media assets and differentiating from traditional grid-based movie UIs with a short-form content approach",
                "Architected a Room-backed local cache integrated with the MVVM data layer to persist recently viewed and searched movies, reducing TMDb API request volume and ensuring fast, resilient UI state restoration",
                "Implemented Firebase Authentication and cloud-backed data sync to provide real-time, cross-device consistency, ensuring seamless user sessions and state restoration across Android devices"
            ],
            period: "December 2025",
            tags: ["Android", "Kotlin", "Jetpack-Compose", "Natural Language Processing"],
            link: "https://github.com/Gherra/MovieFinder",
            additionalLink: "https://cmpt-362-website.vercel.app",
        },
        {
            title: "YOLO Traffic Analysis",
            description: "A vision model benchmarking pipeline",
            keyContribution: [
                "Engineered and deployed ETL pipelines with Pandas, NumPy, and OpenCV to preprocess 20,000+ annotated images, enabling simultaneous training of 3 YOLO model variants",
                "Produced analytical scripts with teammates to benchmark model performance using IoU, chi-square tests, and Euclidean residuals, improving detection accuracy insights and streamlining comparison across model variants",
                "Co - authored a 13 - page research report on statistical confidence, edge -case failures, and model limitations, delivering actionable recommendations that enhanced tuning strategies and informed real - world deployment."
            ],
            period: "May 2025",
            tags: ["Python", "YOLO", "Pandas", "OpenCV", "Matplotlib"],
            link: "https://github.com/jonathanung/traffic-yolo-analysis",
            additionalLink: "",

        },
        {
            title: "RateTheWashroom",
            description: "A web application for rating and reviewing washrooms",
            keyContribution: [
                "Engineered a RESTful API using FastAPI and SQLAlchemy, enabling seamless and reliable data flow between frontend and backend",
                "Containerized the frontend, backend, and PostgreSQL database with Docker, ensuring consistent deployment and development across all team environments",
                "Designed ETL pipeline to automating transformation process for over 1,000 SFU campus washroom listings and 100+ public washrooms, providing a comprehensive dataset that enhances user accessibility and utility"
            ],
            period: "October 2025",
            tags: ["React", "Python", "FastAPI", "Firebase", "PostgreSQL", "Tailwind CSS", "DockerFile"],
            link: "https://github.com/gregoryliu05/rate-the-washroom",
            additionalLink: "",
        },
        {
            title: "youOme",
            description: "Android app for expense splitting made using XML-Layouts",
            keyContribution: [
                "Developed an Android application in Kotlin to simplify expense splitting, minimizing the total transactions",
                "Modeled and implemented a local database and DAOs using Room ORM to enable offline access and persistent data, enhancing user reliability and data integrity",
                "Preserved MVVM architecture to ensure reactive, maintainable, testable, and scalable data flow between the UI and Room database"
            ],
            period: "October 2025",
            tags: ["Kotlin", "XML", "Room", "MVVM"],
            link: "https://github.com/NicholasTamm/youOme",
            additionalLink: "",

        }
    ];

    return (
        <section id="projects" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Projects</h2>
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        className="flex flex-col justify-between rounded-2xl bg-component p-6 transition-transform hover:scale-105 cursor-pointer"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                            <p className="mt-4 text-zinc-400">{project.description}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            <p className="mx-auto max-w-2xl py-6 text-center text-sm text-zinc-500">
                Click on a project to learn more
            </p>

            {/* Modal */}
            {selectedProject && (
                <Modal onClose={() => setSelectedProject(null)}>
                    <div className="flex flex-col mb-6 max-h-[60vh] overflow-y-auto items-start w-full no-scrollbar">

                        <div className="flex flex-row w-full justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-white text-left flex-1 break-words">
                                {selectedProject.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-3 mr-2 justify-end flex-shrink-0">
                                {/* Period Pill */}
                                {selectedProject.period && (
                                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400 whitespace-nowrap">
                                        {selectedProject.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Links Section */}
                        {(selectedProject.link || selectedProject.additionalLink) && (
                            <div className="w-full">
                                <h4 className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider text-left">
                                    Links
                                </h4>
                                <div className="flex items-center gap-2 mb-4 w-full justify-start">
                                    {/* GitHub Link (Repo) */}
                                    {selectedProject.link && (
                                        <a
                                            href={selectedProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-400 hover:text-white transition-colors p-1"
                                            aria-label="View Source on GitHub"
                                        >
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}

                                    {/* Website Link (Deployment) */}
                                    {selectedProject.additionalLink && (
                                        <a
                                            href={selectedProject.additionalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 px-3 py-1 text-sm text-blue-400 transition-colors"
                                        >
                                            <span>View Website</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        <h4 className="text-xs font-semibold text-zinc-500 mb-4 uppercase tracking-wider text-left w-full">
                            Description
                        </h4>

                        <p className="text-zinc-300 leading-relaxed text-lg mb-8 text-left w-full">
                            {selectedProject.description}
                        </p>

                        <h4 className="text-xs font-semibold text-zinc-500 mb-4 uppercase tracking-wider text-left w-full">
                            Key Contributions
                        </h4>

                        {selectedProject.keyContribution && (
                            <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-left w-full mb-8">
                                {selectedProject.keyContribution.map((item, i) => (
                                    <li key={i} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto justify-start w-full">
                            {selectedProject.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </Modal>
            )}
        </section>
    );
}
