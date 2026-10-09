import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBFBF9",
          elevated: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#121210",
          muted: "#54565A",
          faint: "#8A8D91",
        },
        hairline: "rgba(18, 18, 16, 0.12)",
        amber: {
          DEFAULT: "#D97706",
          ink: "#121210",
          tint: "#FBEEDC",
        },
        success: {
          DEFAULT: "#15803D",
          surface: "#E9F2EC",
        },
        error: {
          DEFAULT: "#B3261E",
          surface: "#FAEAE9",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Source Serif 4", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        stampLand: {
          "0%": {
            transform: "scale(1.15) rotate(0deg)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1) rotate(-4deg)",
            opacity: "1",
          },
        },
      },
      animation: {
        "stamp-land": "stampLand 120ms cubic-bezier(0, 0, 0.2, 1) forwards",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "8px",
      },
      spacing: {
        touch: "44px",
        sidebar: "240px",
        topbar: "64px",
      },
      maxWidth: { editorial: "1320px" },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        "@media (prefers-reduced-motion: reduce)": {
          ".animate-stamp-land": {
            animation: "none",
            transform: "rotate(-4deg)",
            opacity: "1",
          },
        },
      });
    },
  ],
};

export default config;
