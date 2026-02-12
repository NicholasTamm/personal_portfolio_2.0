"use client";

import dynamic from "next/dynamic";

const MoonBackground = dynamic(() => import("./MoonBackground"), {
    ssr: false,
});

export default function MoonWrapper() {
    return <MoonBackground />;
}
