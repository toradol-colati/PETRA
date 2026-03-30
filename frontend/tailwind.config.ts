import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F5F0EB",
          deep: "#EDE6DD",
        },
        crimson: {
          light: "#A62B2B",
          DEFAULT: "#8B1A1A",
          dark: "#6B1010",
        },
        carbon: {
          soft: "#2E2E2E",
          DEFAULT: "#1A1A1A",
        },
        stone: {
          pale: "#D4CFC8",
          DEFAULT: "#9A9488",
          light: "#B8B0A4",
        },
        parchment: "#FDFCFA",
      },
      fontFamily: {
        display: [
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: ["DM Sans", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        institutional: "0.35em",
        wide: "0.15em",
        eyebrow: "0.4em",
      },
      lineHeight: {
        monumental: "0.92",
        relaxed: "1.85",
      },
    },
  },
  plugins: [],
};

export default config;
