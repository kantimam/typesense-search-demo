/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#fc0",
        seondary: "#141419"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}