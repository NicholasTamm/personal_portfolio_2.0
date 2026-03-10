import React from "react";

type PillProps = {
    children: React.ReactNode;
    variant?: "default" | "subtle";
    size?: "sm" | "md";
    className?: string;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "className">;

export default function Pill({
    children,
    variant = "default",
    size = "sm",
    className = "",
    ...rest
}: PillProps) {
    const base = "rounded-full font-mono";
    const bg = variant === "subtle" ? "bg-white/5" : "bg-zinc-800/80";
    const sizing = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm";

    return (
        <span className={`${base} ${bg} ${sizing} ${className}`} {...rest}>
            {children}
        </span>
    );
}
