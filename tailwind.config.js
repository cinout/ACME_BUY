/** @type {import('tailwindcss').Config} */
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
      },
      screens: {
        stn: "360px", // super tiny
        tn: "480px", // tiny
      },
      spacing: {
        "dashbord-width": "15rem",
        "header-height": "4.375rem",
      },
      backgroundImage: {
        conic: "conic-gradient(from 0deg, var(--tw-gradient-stops))",
        radial: "radial-gradient(circle, var(--tw-gradient-stops))",
        "radial-ellipse": "radial-gradient(ellipse, var(--tw-gradient-stops))",
      },
      animation: {
        // winnerJump: "winnerJump infinite 1s",
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
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("not-disabled", "&:not(:disabled)");
    },
  ],
};
