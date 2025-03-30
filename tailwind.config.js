/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(209, 23%, 22%)", // Dark Mode Elements
        veryDarkBlue: "hsl(207, 26%, 17%)", // Dark Mode Background
        veryDarkBlueText: "hsl(200, 15%, 8%)", // Light Mode Text
        darkGray: "hsl(0, 0%, 52%)", // Light Mode Input
        veryLightGray: "hsl(0, 0%, 98%)", // Light Mode Background
        white: "hsl(0, 0%, 100%)", // Dark Mode Text & Light Mode Elements
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      fontSize: {
        base: "14px", // Homepage Items
        lg: "16px", // Detail Page
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};