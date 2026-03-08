"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { href: "#about", label: "Story" },
    { href: "#amenities", label: "Amenities" },
    { href: "#listings", label: "Real Estate" },
    { href: "#events", label: "Events" },
    { href: "#portal", label: "Portal" },
];

export function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
                <Link href="/" className="text-sm uppercase tracking-[0.3em] text-white font-sans font-light">
                    Oasis
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[11px] uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors font-sans"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
}
