/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D9FF1F",
        black: "#0D0D0D",
        dark: "#171717",

        text: "#111111",
        "text-secondary": "#6D6D6D",

        border: "#D9D9D9",
        "border-light": "#ECECEC",

        bg: "#FFFFFF",
        "bg-secondary": "#F8F8F8",
        "bg-dark": "#0B0B08",
        
        success: "#00C853",
        warning: "#FFB800",
        error: "#FF4D4F",
      },
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
      spacing: {
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
        80: "80px",
        96: "96px",
        120: "120px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "999px",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(0,0,0,.04)",
        md: "0 8px 24px rgba(0,0,0,.06)",
        lg: "0 24px 48px rgba(0,0,0,.08)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "400ms",
      },
      maxWidth: {
        container: "1440px",
        content: "1280px",
      },
      letterSpacing: {
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
