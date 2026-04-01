import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kampus: {
          yellow: "#FBBF24",
          orange: "#F97316",
          blue: "#3B82F6",
          blueDark: "#1E3A8A",
          emerald: "#10B981",
          rose: "#F43F5E",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#1e293b",
          textMuted: "#64748b"
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
