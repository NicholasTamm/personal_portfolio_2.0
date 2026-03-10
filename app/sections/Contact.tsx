"use client";
import { motion, useReducedMotion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "../components/Icons";
import SectionHeading from "../components/SectionHeading";
import { socials } from "../data/socials";

export default function Contact() {
    const prefersReducedMotion = useReducedMotion();

    const containerVariants = prefersReducedMotion
        ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
        : { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 } };

    return (
        <section id="contact" className="container mx-auto px-4 py-32 md:py-40 text-center md:px-6">
            <SectionHeading number="05" label="Contact" title="Get in Touch" />
            <motion.div
                {...containerVariants}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 backdrop-blur-xl border border-white/15 shadow-2xl"
            >
                <div className="flex flex-col">
                    <p className="mb-8 text-lg text-zinc-400">
                        Currently seeking for Summer & Fall 2026 terms
                    </p>
                    <div className="flex flex-row justify-center items-center">
                        <a
                            href="mailto:tamlhnicholas@gmail.com"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-black transition-colors hover:bg-accent-hover"
                        >
                            Connect
                        </a>
                        <a
                            href={socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors p-2.5"
                            aria-label="GitHub Profile"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors p-2.5"
                            aria-label="View LinkedIn Profile"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
