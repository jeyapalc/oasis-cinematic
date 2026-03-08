"use client";

import { motion } from "framer-motion";

export function HeroOverlay() {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(46,35,30,0.3)_100%)]" />

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                className="relative text-xs sm:text-sm uppercase tracking-[0.35em] text-copper font-sans mb-4"
            >
                A Private RV Resort Community
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
                className="relative font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-midnight leading-[0.9] text-center"
            >
                Oasis
                <br />
                <span className="italic text-terracotta">Resort</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
                className="relative font-serif italic text-lg sm:text-2xl text-rock/80 mt-6"
            >
                Osoyoos, British Columbia
            </motion.p>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1.5 }}
                className="absolute bottom-12 flex flex-col items-center gap-2 pointer-events-auto"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-rock/60 font-sans">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-copper/60 to-transparent"
                />
            </motion.div>
        </div>
    );
}
