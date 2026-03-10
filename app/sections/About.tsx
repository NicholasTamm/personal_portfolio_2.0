"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FlipCard from "../components/FlipCard";
import SectionHeading from "../components/SectionHeading";
import { photos } from "../data/about";

export default function About() {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 767px)");
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    const textVariants = prefersReducedMotion
        ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
        : { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } };

    return (
        <section id="about" className="container mx-auto px-4 py-28 md:py-36 md:px-6">
            <SectionHeading number="01" label="About" title="About me" />

            {/* Photo Cards */}
            {isMobile ? (
                /* -- Mobile: horizontal scroll row with peek hint -- */
                <div className="mb-8 -mx-4 px-4 pr-0 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    <div className="flex gap-4 w-max py-4 pr-8">
                        {photos.map((card, index) => (
                            <motion.div
                                key={card.id}
                                className="snap-center flex-shrink-0"
                                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
                                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <FlipCard card={card} dragConstraints={false} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                /* -- Desktop: fan layout with drag (unchanged) -- */
                <div
                    ref={constraintsRef}
                    className="relative mx-auto max-w-5xl"
                    style={{ height: "300px" }}
                >
                    {(() => {
                        const cardWidth = 180;
                        const tops = [0, 30, 20, 15, 5];
                        const lefts = [0, 140, 280, 400, 540];
                        const totalWidth = Math.max(...lefts) + cardWidth;

                        return (
                            <div
                                className="absolute p-3"
                                style={{
                                    left: "50%",
                                    transform: `translateX(-${totalWidth / 2}px)`,
                                    width: `${totalWidth}px`,
                                    height: "100%",
                                }}
                            >
                                {photos.map((card, i) => (
                                    <motion.div
                                        key={card.id}
                                        className="absolute"
                                        style={{
                                            left: `${lefts[i]}px`,
                                            top: `${tops[i]}px`,
                                        }}
                                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
                                        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                    >
                                        <FlipCard card={card} dragConstraints={constraintsRef} />
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Text Card */}
            <motion.div
                {...textVariants}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-12 backdrop-blur-xl border border-white/15 shadow-2xl"
            >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-4 text-center">Who am I?</h3>
                <p className="text-md leading-relaxed font-mono text-white/80 text-center">
                    I am a passionate software developer who enjoys
                    tackling complex challenges and learning through
                    hands-on experience. I am particularly interested
                    in Robotics, Analytics, and Computer Vision. I
                    especially enjoy working on projects where I can see
                    my contributions and work come to life. I am
                    intrigued by what seems to be the ever-evolving
                    nature of programming, where there is always more to
                    learn, explore, and build.
                </p>
            </motion.div>
        </section>
    );
}
