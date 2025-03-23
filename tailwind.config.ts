import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Scan all files inside /src for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007676",  // MMC Green
        gold: "#f5c907",     // Gold (CTA, Donate)
        darkText: "#333333", // Dark Text
        lightBg: "#F5F5F5",  // ✅ Light Background (Fixing your error)
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        accent: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
