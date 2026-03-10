"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { PhotoCard } from "../types";

interface FlipCardProps {
    card: PhotoCard;
    dragConstraints: RefObject<HTMLElement | null> | false;
}

export default function FlipCard({ card, dragConstraints }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [zIndex, setZIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Track pointer start for tap-vs-drag detection
    const pointerStart = useRef<{ x: number; y: number } | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!pointerStart.current) return;
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        pointerStart.current = null;

        // Only flip on tap (< 5px movement), not after a drag
        if (distance < 5 && !isDragging) {
            setIsFlipped((prev) => !prev);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
        }
    };

    const flipTransition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.5, ease: "easeInOut" as const };

    const scaleTransition = prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 300, damping: 20 };

    return (
        <motion.div
            className="relative cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none rounded-2xl"
            style={{
                width: "180px",
                height: "240px",
                zIndex,
            }}
            role="button"
            tabIndex={0}
            aria-label={`Photo card: ${card.description} - press Enter to flip`}
            onKeyDown={handleKeyDown}
            drag={dragConstraints !== false}
            dragConstraints={dragConstraints || undefined}
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
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
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
                transition={scaleTransition}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    animate={{ rotateY: isFlipped && !isDragging ? 180 : 0 }}
                    transition={flipTransition}
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
