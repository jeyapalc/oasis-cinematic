"use client";

import { motion } from "framer-motion";
import { Home, Calendar, FileText, Users } from "lucide-react";

const BLOCKS = [
    {
        icon: Home,
        title: "Real Estate Listings",
        description: "Browse available lots and properties within the resort community. Premium lakefront and desert-view locations.",
        href: "#listings",
        accent: "terracotta",
    },
    {
        icon: Calendar,
        title: "Community Events",
        description: "Seasonal gatherings, wine tastings, and resort activities. Connect with your neighbors under the Osoyoos sun.",
        href: "#events",
        accent: "copper",
    },
    {
        icon: FileText,
        title: "Documents & Resources",
        description: "Access community guidelines, strata documents, and resort policies. Everything you need in one place.",
        href: "#documents",
        accent: "oasis-teal",
    },
    {
        icon: Users,
        title: "Owner Portal",
        description: "Manage your lot, submit maintenance requests, and stay connected with the Oasis community.",
        href: "#portal",
        accent: "moonlit-blue",
    },
];

const accentMap: Record<string, string> = {
    terracotta: "border-terracotta/20 hover:border-terracotta/40",
    copper: "border-copper/20 hover:border-copper/40",
    "oasis-teal": "border-oasis-teal/20 hover:border-oasis-teal/40",
    "moonlit-blue": "border-moonlit-blue/20 hover:border-moonlit-blue/40",
};

const iconAccentMap: Record<string, string> = {
    terracotta: "text-terracotta",
    copper: "text-copper",
    "oasis-teal": "text-oasis-teal",
    "moonlit-blue": "text-moonlit-blue",
};

export function ContentBlocks() {
    return (
        <section className="relative py-24 sm:py-32 px-6 bg-sand" id="amenities">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-copper/70 font-sans mb-4">
                        Resort Living
                    </p>
                    <h2 className="font-serif text-3xl sm:text-5xl text-midnight">
                        Everything You Need
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {BLOCKS.map((block, index) => {
                        const Icon = block.icon;
                        return (
                            <motion.a
                                key={block.title}
                                href={block.href}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className={`group block p-8 sm:p-10 border rounded-2xl transition-all duration-500 bg-white/50 backdrop-blur-sm ${accentMap[block.accent]}`}
                            >
                                <Icon className={`w-6 h-6 mb-6 ${iconAccentMap[block.accent]} transition-transform group-hover:scale-110`} strokeWidth={1.5} />
                                <h3 className="font-serif text-xl sm:text-2xl text-midnight mb-3">
                                    {block.title}
                                </h3>
                                <p className="text-sm text-rock/70 font-sans leading-relaxed">
                                    {block.description}
                                </p>
                                <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-copper/60 font-sans group-hover:text-copper transition-colors">
                                    Explore →
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
