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
          DEFAULT: "#FBFBF9",
          deep: "#E5E0D4",
        },
        crimson: {
          DEFAULT: "#B01E20",
          dark: "#7A1415",
        },
        carbon: {
          soft: "#333333",
          DEFAULT: "#141414",
        },
        stone: {
          pale: "#E5E1DA",
          DEFAULT: "#8C867A",
        },
        parchment: "#FDFCFA",
      },
      fontFamily: {
        display: ['var(--font-serif)'],
        body: ['var(--font-sans)'],
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
