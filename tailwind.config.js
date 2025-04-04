/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        secondary: "#EDEDED",
        "validated-green": "#52CC6D",
      },
      maxWidth: {
        site: "1280px",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        monospace: ["monospace", "Space Mono"],
      },
      animation: {
        dominos: "dominos 1s ease infinite",
        slideUp: "slideUp 1.4s ease-out forwards",
        slideDown: "slideDown 1.4s ease-out",
        slideLeft: "slideLeft 1.4s ease-out forwards",
        slideRight: "slideRight 1.4s ease-out",
      },
      keyframes: {
        dominos: {
          "50%": { opacity: "0.7" },
          "75%": { transform: "rotate(90deg)" },
          "80%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {},
      borderRadius: {},
      boxShadow: {},
    },
  },
  plugins: [],
};
