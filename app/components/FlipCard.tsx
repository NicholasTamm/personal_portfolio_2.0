"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { RefObject, useState } from "react";

export interface PhotoCard {
    id: number;
    src: string;
    alt: string;
    date: string;
    location: string;
    description: string;
    rotation: number;
}

interface FlipCardProps {
    card: PhotoCard;
    dragConstraints: RefObject<HTMLElement | null>;
}

export default function FlipCard({ card, dragConstraints }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [zIndex, setZIndex] = useState(0);

    return (
        <motion.div
            className="relative cursor-grab active:cursor-grabbing"
            style={{
                width: "180px",
                height: "240px",
                zIndex,
            }}
            drag
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={() => {
                setIsDragging(true);
                setZIndex(50);
            }}
            onDragEnd={() => {
                setIsDragging(false);
                setZIndex(10);
            }}
            onMouseEnter={() => {
                if (!isDragging) {
                    setIsFlipped(true);
                    setZIndex(10);
                }
            }}
            onMouseLeave={() => {
                if (!isDragging) {
                    setIsFlipped(false);
                    setZIndex(0);
                }
            }}
        >
            {/* Inner visual wrapper applies rotation so hit area stays axis-aligned */}
            <motion.div
                className="absolute inset-0"
                style={{
                    rotate: `${card.rotation}deg`,
                    perspective: "1000px",
                }}
                animate={{
                    scale: isDragging ? 1.05 : isFlipped ? 1.08 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    animate={{ rotateY: isFlipped && !isDragging ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Front - Image */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-white/15"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            className="object-cover"
                            sizes="180px"
                        />
                    </div>

                    {/* Back - Description */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-white/15 flex flex-col items-center justify-center p-5 text-center"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background: "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                            backdropFilter: "blur(16px)",
                        }}
                    >
                        {card.date && (
                            <span className="text-xs text-white/50 font-mono mb-1">
                                {card.date}
                            </span>
                        )}
                        {card.location && (
                            <span className="text-sm font-semibold text-white/90 mb-3">
                                {card.location}
                            </span>
                        )}
                        <p className="text-sm text-white/70 leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
