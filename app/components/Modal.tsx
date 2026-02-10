"use client";

import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Detail view"
        >
            <div
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {children}
            </div>
        </div>
    );
}
