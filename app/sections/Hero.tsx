"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { socials } from "../data/socials";

export default function Hero() {
    const prefersReducedMotion = useReducedMotion();
    const [downloaded, setDownloaded] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const ease = [0.22, 1, 0.36, 1] as const;

    const itemVariants = (delay: number) =>
        prefersReducedMotion
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.1 } }
            : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease, delay } };

    const handleDownload = () => {
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    };

    const subtitleItems = ["Software Developer", "Robotics", "Analytics", "Computer Vision"];

    return (
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-8">
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent font-sans"
                    {...itemVariants(0)}
                >
                    Nicholas Tam
                </motion.h1>
                <motion.p
                    className="mx-auto max-w-2xl uppercase tracking-[0.15em] text-xs sm:text-sm font-mono text-zinc-400 sm:whitespace-nowrap"
                    {...itemVariants(0.3)}
                >
                    {subtitleItems.map((item, i) => (
                        <span key={item}>
                            {i > 0 && <span className="text-accent"> &middot; </span>}
                            {item}
                        </span>
                    ))}
                </motion.p>
                <motion.div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    {...itemVariants(0.6)}
                >
                    <a
                        href="/Nicholas_Tam_Resume(default).pdf"
                        download
                        onClick={handleDownload}
                        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-accent-hover active:scale-95"
                    >
                        {downloaded ? (
                            <span className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Downloaded!
                            </span>
                        ) : (
                            "Download Resume"
                        )}
                    </a>
                    <a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-transparent border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5 active:scale-95"
                    >
                        GitHub
                    </a>
                </motion.div>
            </div>

            {/* Scroll-down indicator — fixed to viewport bottom, fades out on scroll */}
            <motion.div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ delay: scrolled ? 0 : 1.2, duration: 0.4 }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-zinc-500"
                    animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </motion.svg>
                <span className="text-xs tracking-widest uppercase text-zinc-500">scroll</span>
            </motion.div>
        </section>
    );
}
