/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00BDA7",

          secondary: "#265C55",

          accent: "#008474",

          neutral: "#3eb8a9",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#56f5ba",

          warning: "#facf64",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
