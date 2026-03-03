"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import FlipCard from "../components/FlipCard";
import { photos } from "../data/about";

export default function About() {
    const constraintsRef = useRef<HTMLDivElement>(null);

    return (
        <section id="about" className="container mx-auto px-4 py-20 md:px-6">
            <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-white">
                About me
            </h2>
            <p className="mb-12 text-center text-lg text-white/50">Who am I?</p>

            {/* Draggable Photo Cards */}
            <div
                ref={constraintsRef}
                className="relative mx-auto max-w-5xl "
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
                                <div
                                    key={card.id}
                                    className="absolute"
                                    style={{
                                        left: `${lefts[i]}px`,
                                        top: `${tops[i]}px`,
                                    }}
                                >
                                    <FlipCard card={card} dragConstraints={constraintsRef} />
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>

            {/* Text Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-5xl rounded-3xl bg-white/10 p-8 md:p-12 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                <p className="text-base leading-relaxed font-mono text-white/80">
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
