"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Generate star positions deterministically to avoid hydration mismatch
function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
}

interface Star {
    id: number;
    width: number;
    height: number;
    top: string;
    left: string;
    duration: number;
    delay: number;
}

function generateStars(count: number): Star[] {
    return Array.from({ length: count }, (_, i) => {
        const r1 = seededRandom(i);
        const r2 = seededRandom(i + 100);
        const r3 = seededRandom(i + 200);
        const r4 = seededRandom(i + 300);
        const size = r1 * 2 + 1;
        return {
            id: i,
            width: size,
            height: size,
            top: `${r2 * 100}%`,
            left: `${r3 * 100}%`,
            duration: 2 + r4 * 3,
            delay: r1 * 2,
        };
    });
}

const STARS = generateStars(80);

export function NightDesertSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-moonlit-blue overflow-hidden">
            {/* Stars - rendered only on client to avoid hydration mismatch */}
            <div className="absolute inset-0">
                {mounted && STARS.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: star.width,
                            height: star.height,
                            top: star.top,
                            left: star.left,
                        }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{
                            repeat: Infinity,
                            duration: star.duration,
                            delay: star.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Moon glow */}
            <div className="absolute top-20 right-[15%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-dune/20 blur-2xl" />
            <div className="absolute top-24 right-[16%] w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-dune/60" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                >
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-oasis-teal/80 font-sans mb-6">
                        Under the Desert Sky
                    </p>
                    <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-dune leading-[0.95]">
                        Where <span className="italic text-oasis-teal">Stillness</span>
                        <br />
                        Becomes Luxury
                    </h2>
                    <p className="max-w-xl mx-auto mt-8 text-sm sm:text-base text-dune/60 font-sans leading-relaxed">
                        Nestled in Canada&rsquo;s only pocket desert, Oasis Resort offers an unparalleled
                        retreat where warm days dissolve into star-filled nights, and every
                        moment is an invitation to pause.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="#listings"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 border border-oasis-teal/40 text-oasis-teal text-xs uppercase tracking-[0.2em] font-sans rounded-full hover:bg-oasis-teal/10 transition-colors"
                        >
                            Explore Listings
                        </motion.a>
                        <motion.a
                            href="#portal"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 border border-dune/20 text-dune/70 text-xs uppercase tracking-[0.2em] font-sans rounded-full hover:bg-dune/5 transition-colors"
                        >
                            Owner Portal
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Horizon line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oasis-teal/20 to-transparent" />
        </section>
    );
}
