/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        publicSans: ["Public Sans", "sans-serif"]
      },
      colors: {
        grey: "rgba(65, 74, 83, 1)",
        lightGrey: "rgba(133, 144, 155, 1)",
        green: "rgba(49, 160, 93, 1)",
        slate: "rgba(226, 227, 232, 1)",
        smokeWhite: "rgba(242, 244, 248, 1)",
      }
    },
  },
  plugins: [],
}

