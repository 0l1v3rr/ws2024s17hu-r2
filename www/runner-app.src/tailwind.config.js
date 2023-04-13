/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#0057ff",
        "blue-secondary": "#2a73ff",
        "black-primary": "#303437",
        "black-secondary": "#404446",
        "white-primary": "#f2f4f5",
        "white-secondary": "#e7e7ff",
        purple: "#6b4eff",
        pink: "#ff0077",
      },
    },
  },
  plugins: [],
};
