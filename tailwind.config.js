/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                sand: "#fcf6f1",
                dune: "#f2e1d0",
                terracotta: "#d86c57",
                copper: "#b87333",
                "oasis-teal": "#2a9d8f",
                rock: "#6c5746",
                midnight: "#2e231e",
                "moonlit-blue": "#1e3a8a",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
            },
        },
    },
    plugins: [],
};
