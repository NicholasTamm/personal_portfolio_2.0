"use client";

import { ReactNode, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const prefersReducedMotion = useReducedMotion();
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<Element | null>(null);

    // Store the element that triggered the modal
    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement;
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Disable background scroll while modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Focus trap
    const getFocusableElements = useCallback(() => {
        if (!modalRef.current) return [];
        return Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
        );
    }, []);

    // Focus first element on open
    useEffect(() => {
        if (!isOpen) return;
        // Small delay to let AnimatePresence render
        const timer = setTimeout(() => {
            const focusable = getFocusableElements();
            if (focusable.length > 0) {
                focusable[0].focus();
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [isOpen, getFocusableElements]);

    // Return focus on close
    useEffect(() => {
        if (!isOpen && triggerRef.current && triggerRef.current instanceof HTMLElement) {
            triggerRef.current.focus();
        }
    }, [isOpen]);

    // Handle tab trapping
    useEffect(() => {
        if (!isOpen) return;
        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const focusable = getFocusableElements();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", handleTab);
        return () => document.removeEventListener("keydown", handleTab);
    }, [isOpen, getFocusableElements]);

    const motionProps = prefersReducedMotion
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.1 } }
        : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2, ease: "easeOut" as const } };

    const backdropProps = prefersReducedMotion
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.1 } }
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Detail view"
                    {...backdropProps}
                >
                    <motion.div
                        ref={modalRef}
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-6 md:p-8 backdrop-blur-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        {...motionProps}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
