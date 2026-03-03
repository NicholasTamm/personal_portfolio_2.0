"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    // Q4: Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Disable background scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Detail view"
        >
            <div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white/10 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Q9: Visible close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {children}
            </div>
        </div>
    );
}
