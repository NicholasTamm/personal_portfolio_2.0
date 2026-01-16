"use client";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">About Me</h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50% 0px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl rounded-2xl bg-component p-8 md:p-12"
            >
                <p className="text-lg leading-relaxed text-zinc-300">
                    I am a passionate software developer with a strong foundation in C++, Python, and full-stack web development.
                    Currently studying at Simon Fraser University, I specialize in building efficient systems and user-friendly applications.
                    From designing autonomous robot behaviors to optimizing data pipelines, I love tackling complex problems and turning ideas into reality.
                </p>
            </motion.div>
        </section>
    );
}
