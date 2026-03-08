"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeatMirageTransition() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 6, 6, 0]);
    const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="relative h-[60vh] overflow-hidden bg-sand">
            {/* Wavy heat distortion bands */}
            <motion.div
                style={{ opacity, scaleX }}
                className="absolute inset-0 flex flex-col justify-center items-center"
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ filter: `blur(${i * 1.5}px)` }}
                        animate={{
                            y: [0, -4, 0, 4, 0],
                            scaleX: [1, 1.01, 1, 0.99, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3 + i * 0.5,
                            ease: "easeInOut",
                            delay: i * 0.2,
                        }}
                        className="w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent my-6"
                    />
                ))}
            </motion.div>

            {/* Editorial quote */}
            <div className="relative z-10 flex items-center justify-center h-full px-6">
                <motion.blockquote
                    style={{ filter: blur.get ? undefined : undefined }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="max-w-3xl text-center"
                >
                    <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-rock/90 leading-relaxed">
                        &ldquo;Where the desert heat shimmers and the lake meets the sky&mdash;a place suspended between earth and dream.&rdquo;
                    </p>
                    <footer className="mt-8 text-xs uppercase tracking-[0.3em] text-copper/70 font-sans">
                        Osoyoos, BC &mdash; Canada&rsquo;s Pocket Desert
                    </footer>
                </motion.blockquote>
            </div>
        </section>
    );
}
