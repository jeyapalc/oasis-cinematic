"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
    () => import("@/components/canvas/HeroCanvas").then((mod) => mod.HeroCanvas),
    { ssr: false }
);

export function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <HeroCanvas />
        </section>
    );
}
