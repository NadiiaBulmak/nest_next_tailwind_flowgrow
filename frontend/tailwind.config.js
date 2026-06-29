/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },

      fontSize: {
        display: ["96px", { lineHeight: "1" }],
        h1: ["64px", { lineHeight: "1.1" }],
        h2: ["48px", { lineHeight: "1.1" }],
        h3: ["36px", { lineHeight: "1.1" }],
        h4: ["28px", { lineHeight: "1.1" }],

        xl: ["24px", { lineHeight: "1.5" }],
        lg: ["20px", { lineHeight: "1.5" }],
        md: ["18px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        xs: ["12px", { lineHeight: "1.5" }],
      },

      maxWidth: {
        container: "1440px",
        content: "1280px",
      },

      letterSpacing: {
        tight: "-0.02em",
      },

      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "400ms",
      },
    },
  },

  plugins: [],
};

export default config;