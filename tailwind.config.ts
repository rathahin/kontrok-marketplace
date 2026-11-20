import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Kontrok brand palette — same tokens as the mobile app (mobile/src/theme.js)
      colors: {
        brand: { DEFAULT: "#0285C9", 50: "#E1F1FA", 100: "#C7E5F6", 600: "#0275B1", 700: "#0A5D8A" },
        navy: { DEFAULT: "#0A5D8A", 700: "#084E74", 900: "#073F5E" },
        gold: { DEFAULT: "#F5C556", 50: "#FEF8E8", 100: "#FBEFCF", 600: "#D9A21F", 700: "#9A6B00" },
        jade: {
          DEFAULT: "#57C79E", 50: "#EEF9F4", 100: "#DEF3EB", 200: "#BDE7D6", 300: "#95D9BE", 400: "#57C79E",
          500: "#3FB389", 600: "#2F9670", 700: "#257858", 800: "#1C5B43",
        },
        lotus: { DEFAULT: "#F58FB0", 50: "#FDEEF3", 100: "#FDE5ED", 600: "#D8668C", 700: "#C2456F", 800: "#8F2E50" },
        saffron: { DEFAULT: "#F0A24E", 50: "#FEF5EA", 100: "#FDEBD5", 600: "#D9852A", 700: "#B86A14" },
        danger: "#B0473C",
        // warm neutrals (ink / ink2 / muted / faint / line) replace Tailwind's cool grays
        gray: {
          50: "#F6F5F1", 100: "#F0EEE8", 200: "#ECEAE3", 300: "#D6D2C8", 400: "#A9A49A",
          500: "#8C887E", 600: "#6E6A61", 700: "#56544D", 800: "#3A3833", 900: "#1C1B18",
        },
        canvas: "#F6F5F1",
        line: "#ECEAE3",
      },
      fontFamily: {
        sans: ["Manrope", "Noto Sans Khmer", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      // softer, rounder corners, as in the app
      borderRadius: { sm: "6px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "20px", "2xl": "26px" },
      maxWidth: { site: "1188px" },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "pop-in": { from: { opacity: "0", transform: "translateY(12px) scale(.98)" }, to: { opacity: "1", transform: "none" } },
        "toast-in": { from: { opacity: "0", transform: "translate(-50%, 8px)" }, to: { opacity: "1", transform: "translate(-50%, 0)" } },
      },
      animation: {
        "fade-in": "fade-in .18s ease-out",
        "pop-in": "pop-in .22s cubic-bezier(.2,.8,.2,1)",
        "toast-in": "toast-in .2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
