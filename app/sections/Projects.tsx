"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Modal from "../components/Modal";
import Pill from "../components/Pill";
import SectionHeading from "../components/SectionHeading";
import TagPills from "../components/TagPills";
import { GitHubIcon, ExternalLinkIcon } from "../components/Icons";
import { ProjectData } from "../types";
import { projects } from "../data/projects";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const cardVariants = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

    const handleKeyDown = (e: React.KeyboardEvent, project: ProjectData) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedProject(project);
        }
    };

    return (
        <section id="projects" className="container mx-auto px-4 py-28 md:py-36 md:px-6">
            <SectionHeading number="04" label="Projects" title="Projects" />
            <div className="mx-auto flex flex-wrap justify-center max-w-5xl gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedProject(project)}
                        onKeyDown={(e) => handleKeyDown(e, project)}
                        role="button"
                        tabIndex={0}
                        className="flex flex-col justify-between rounded-2xl bg-white/5 overflow-hidden border border-white/5 transition-all hover:scale-105 hover:border-accent/20 hover:shadow-lg hover:shadow-white/5 active:scale-95 cursor-pointer w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                    >
                        {project.image && (
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {project.inProgress && (
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 backdrop-blur-sm px-2.5 py-1">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                        </span>
                                        <span className="text-xs font-medium text-amber-400 tracking-wide">In Progress</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-lg font-semibold text-white min-w-0">{project.title}</h3>
                                    {project.period && (
                                        <Pill size="sm" className="text-zinc-400 whitespace-nowrap flex-shrink-0 ml-auto">
                                            {project.period}
                                        </Pill>
                                    )}
                                </div>
                                <p className="mt-4 text-sm text-zinc-400">{project.description}</p>
                            </div>
                            <TagPills tags={project.tags} max={3} />
                        </div>
                    </motion.div>
                ))}
            </div>
            <p className="mx-auto max-w-2xl py-6 text-center text-sm text-zinc-500">
                Click on a project to learn more
            </p>

            {/* Modal */}
            <Modal isOpen={selectedProject !== null} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <>
                        {selectedProject.image && (
                            <div className="relative w-full h-56 -mt-8 -mx-8 mb-6 overflow-hidden rounded-t-3xl" style={{ width: 'calc(100% + 4rem)' }}>
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 90vw, 600px"
                                />
                            </div>
                        )}
                        <div className="flex flex-col mb-6 items-start w-full">

                            <div className="flex flex-row w-full justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-white text-left flex-1 break-words">
                                    {selectedProject.title}
                                </h3>

                                <div className="flex flex-wrap items-center gap-3 justify-end flex-shrink-0">
                                    {selectedProject.inProgress && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                            </span>
                                            <span className="text-xs font-medium text-amber-400 tracking-wide">In Progress</span>
                                        </div>
                                    )}
                                    {selectedProject.period && (
                                        <Pill size="sm" className="text-sm text-zinc-400 whitespace-nowrap">
                                            {selectedProject.period}
                                        </Pill>
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

                            <p className="text-zinc-300 leading-relaxed text-sm mb-8 text-left w-full">
                                {selectedProject.description}
                            </p>

                            <h4 className="text-xs font-semibold text-zinc-500 mb-4 uppercase tracking-wider text-left w-full">
                                Key Contributions
                            </h4>

                            {selectedProject.keyContribution && (
                                <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-left w-full mb-8">
                                    {selectedProject.keyContribution.map((item, i) => (
                                        <li key={i} className="text-sm leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            )}

                            <div className="flex flex-wrap gap-2 mt-auto justify-start w-full">
                                {selectedProject.tags.map((tag) => (
                                    <Pill key={tag} size="sm" className="text-sm font-medium text-zinc-300">
                                        {tag}
                                    </Pill>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </section>
    );
}
