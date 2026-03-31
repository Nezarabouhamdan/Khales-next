/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#66a109", // Your exact brand green
        olive: "#5a8f08", // Slightly darker green for hover states/accents
        background: "#0a0a0a", // Dark luxury background
        foreground: "#f8f6f0", // Off-white text
      },
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
        price: ["DM Serif Display", "serif"],
      },
    },
  },
  plugins: [],
};
