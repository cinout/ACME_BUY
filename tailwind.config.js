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

        // // Green
        // "theme-green-1": "#b6f4eb",
        // "theme-green-2": "#7eeada",
        // "theme-green-3": "#3ddac3",
        // "theme-green-4": "#00c1a5",
        // "theme-green-5": "#15a38e",
        // "theme-green-6": "#08927e",
        // "theme-green-7": "#248072",
        // "theme-green-8": "#346960",
        // "theme-green-9": "#304743",

        // Blue
        "theme-blue-50": "#f1f9fe",
        "theme-blue-100": "#e3f2fb",
        "theme-blue-200": "#c1e5f6",
        "theme-blue-300": "#7dccee",
        "theme-blue-400": "#4bb9e5",
        "theme-blue-500": "#23a1d4",
        "theme-blue-600": "#1581b4",
        "theme-blue-700": "#126892",
        "theme-blue-800": "#135779",
        "theme-blue-900": "#164964",
        "theme-blue-950": "#0e2f43",
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
