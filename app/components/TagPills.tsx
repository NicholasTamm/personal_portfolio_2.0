"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Pill from "./Pill";

export default function TagPills({ tags, max = 3 }: { tags: string[]; max?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(max);

    const measure = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = Array.from(container.children) as HTMLElement[];
        if (children.length === 0) return;

        const firstTop = children[0].offsetTop;
        let fitCount = 0;

        for (const child of children) {
            if (child.dataset.overflow) continue;
            if (child.offsetTop === firstTop) {
                fitCount++;
            } else {
                break;
            }
        }

        const slicedTags = tags.slice(0, max);
        if (fitCount < slicedTags.length) {
            setVisibleCount(Math.max(fitCount - 1, 1));
        } else {
            setVisibleCount(slicedTags.length);
        }
    }, [tags, max]);

    useEffect(() => {
        let debounceTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(measure, 200);
        };

        // Initial measurement after layout
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(debounceTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, [measure]);

    const slicedTags = tags.slice(0, max);
    const remaining = tags.length - visibleCount;

    return (
        <div ref={containerRef} className="mt-6 flex flex-wrap gap-2">
            {slicedTags.map((tag, i) => (
                <Pill
                    key={tag}
                    size="sm"
                    className="font-medium text-zinc-300"
                    style={i >= visibleCount ? { position: "absolute", visibility: "hidden", pointerEvents: "none" } : undefined}
                >
                    {tag}
                </Pill>
            ))}
            {remaining > 0 && (
                <Pill
                    size="sm"
                    className="font-medium text-zinc-400"
                    data-overflow="true"
                >
                    +{remaining}
                </Pill>
            )}
        </div>
    );
}
