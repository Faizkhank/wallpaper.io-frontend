/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "765px",
      lg: "1440px",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
