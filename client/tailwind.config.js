const flowbite = require("flowbite-react/tailwind");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton SC", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],

        bebas: ["Bebas Neue", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
