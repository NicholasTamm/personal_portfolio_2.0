"use client";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "../components/Icons";

export default function Contact() {
    return (
        <section id="contact" className="container mx-auto px-4 py-20 text-center md:px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl rounded-3xl bg-white/10 p-8 md:p-12 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
                    Get in Touch
                </h2>
                <div className="flex flex-col">
                    <p className="mb-8 text-lg text-zinc-400">
                        Currently seeking for Summer & Fall 2026 terms
                    </p>
                    <div className="flex flex-row justify-center items-center">
                        <a
                            href="mailto:tamlhnicholas@gmail.com"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
                        >
                            Connect
                        </a>
                        <a
                            href={"https://github.com/NicholasTamm"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors p-1"
                            aria-label="GitHub Profile"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href={"https://www.linkedin.com/in/nicholastamm/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-white transition-colors p-1"
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
