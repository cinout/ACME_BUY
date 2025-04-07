/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      colors: {
        // // Blue
        // "theme-blue-1": "#ccecf8",
        // "theme-blue-2": "#b1dff1",
        // "theme-blue-3": "#9dd7ef",
        // "theme-blue-4": "#7dccee",
        // "theme-blue-5": "#77c1df",
        // "theme-blue-6": "#5aa9cb",
        // "theme-blue-7": "#4b9bbe",
        // "theme-blue-8": "#3d89aa",
        // "theme-blue-9": "#2c6d8a",
        "aqua-forest": {
          50: "#f0f9f4",
          100: "#dbf0e3",
          200: "#b9e1cb",
          300: "#8bcaaa",
          400: "#50a27b",
          500: "#38916a",
          600: "#277453",
          700: "#1f5d44",
          800: "#1b4a38",
          900: "#173d2f",
          950: "#0c221b",
        },
        "olive-green": {
          50: "#f8f7ed",
          100: "#f0eed7",
          200: "#e2dfb4",
          300: "#cfcc87",
          400: "#b2af4f",
          500: "#9f9d43",
          600: "#7e7e32",
          700: "#5f612a",
          800: "#4d4e26",
          900: "#424324",
          950: "#23240f",
        },
        active: colors.green,
        pending: colors.violet,
        deactivated: colors.rose,
      },
      screens: {
        stn: "360px", // super tiny
        tn: "480px", // tiny
        // sm: 640px
        // md: 768px
        // lg: 1024px
        // xl: 1280px
        // 2xl: 1536px
      },
      spacing: {
        "dashbord-width": "15rem",
        "header-height": "4.375rem",
        "navbar-top-height": "88px",
      },
      backgroundImage: {
        conic: "conic-gradient(from 0deg, var(--tw-gradient-stops))",
        radial: "radial-gradient(circle, var(--tw-gradient-stops))",
        "radial-ellipse": "radial-gradient(ellipse, var(--tw-gradient-stops))",
      },
      animation: {
        // winnerJump: "winnerJump infinite 1s",
        rollRightIn: "rollRightIn 1500ms ease-out",
      },
      keyframes: {
        // winnerJump: {
        //   "0%, 100%": {
        //     transform: "translateY(-20%)",
        //     "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
        //   },
        //   "50%": {
        //     transform: "translateY(0)",
        //     "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
        //   },
        // },
        rollRightIn: {
          "0%": {
            transform: "rotate(-300deg)",
          },
          "100%": {
            transform: "rotate(0)" /* move left + rotate */,
          },
        },
      },
      fontFamily: {
        arsenal: ["Arsenal", "serif"], // Add the Arsenal font
        lato: ["Lato", "serif"], // Add the Lato font
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("not-disabled", "&:not(:disabled)");
    },
  ],
};
