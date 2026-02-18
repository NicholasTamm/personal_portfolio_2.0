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
                className="mx-auto max-w-4xl rounded-3xl bg-white/10 p-8 md:p-12 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                <p className="text-m leading-relaxed font-sans-mono">
                    I am a passionate software developer who enjoys tackling complex challenges and learning through hands-on
                    experience. I am particularly interested in Robotics, Analytics, and Computer Vision. I especially enjoy working
                    on projects where I can see my contributions and work come to life. I am intrigued by what seems to the ever-evolving
                    nature of programming, where there is always more to learn, explore, and build.
                </p>
            </motion.div>
        </section>
    );
}
