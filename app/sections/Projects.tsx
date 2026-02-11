"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import { GitHubIcon, ExternalLinkIcon } from "../components/Icons";
import { ProjectData } from "../types";
import { projects } from "../data/projects";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    return (
        <section id="projects" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">Projects</h2>
            <div className="mx-auto flex flex-wrap justify-center max-w-5xl gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        className="flex flex-col justify-between rounded-2xl bg-component p-6 transition-transform hover:scale-105 cursor-pointer w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                {project.period && (
                                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 whitespace-nowrap flex-shrink-0">
                                        {project.period}
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-zinc-400">{project.description}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
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

                            <div className="flex flex-wrap items-center gap-3 pr-8 justify-end flex-shrink-0">
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
                                            <GitHubIcon />
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
                                            <ExternalLinkIcon className="w-3.5 h-3.5" />
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
                            {selectedProject.tags.map((tag) => (
                                <span
                                    key={tag}
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
