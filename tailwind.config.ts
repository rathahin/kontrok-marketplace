import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#F85606", 600: "#E04D05", 700: "#C44304", 50: "#FFF3EC", 100: "#FFE4D4" },
        navy: { DEFAULT: "#0F136D", 900: "#1A1A2E", 700: "#1E2490" },
        canvas: "#F5F5F5",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Khmer", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
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
