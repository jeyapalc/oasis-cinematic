"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroOverlay() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax: text moves up slower than scroll for depth feel
    const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <div
            ref={ref}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
            style={{ zIndex: 5 }}
        >
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(46,35,30,0.25)_100%)]" />

            <motion.p
                style={{ y: subtitleY, opacity: textOpacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                className="relative text-xs sm:text-sm uppercase tracking-[0.35em] text-copper font-sans mb-4 z-0"
            >
                A Private RV Resort Community
            </motion.p>

            {/* 
        Giant title – intentionally oversized so foreground 3D cacti 
        partially obstruct it, creating depth of field illusion.
        z-index 0 keeps it BEHIND the foreground 3D layer (z-index 10).
      */}
            <motion.h1
                style={{ y: textY, opacity: textOpacity }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                className="relative font-serif text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] text-midnight/90 leading-[0.8] text-center select-none z-0"
            >
                Oasis
                <br />
                <span className="italic text-terracotta/80">Resort</span>
            </motion.h1>

            <motion.p
                style={{ y: subtitleY, opacity: textOpacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
                className="relative font-serif italic text-lg sm:text-2xl md:text-3xl text-rock/70 mt-4 z-0"
            >
                Osoyoos, British Columbia
            </motion.p>

            {/* Scroll cue */}
            <motion.div
                style={{ opacity: scrollCueOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1.5 }}
                className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-auto z-0"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-rock/60 font-sans">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-copper/60 to-transparent"
                />
            </motion.div>
        </div>
    );
}
