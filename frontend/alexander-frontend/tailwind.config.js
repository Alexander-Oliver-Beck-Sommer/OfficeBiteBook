/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_gunmetal: "#212529",
        gunmetal: "#2B3035",
        outer_space: "#30353B",
        onyx: "#343A40",
        davys_grey: "#495057",
        cool_grey: "#D4D3D5",
        ghost_white: "#F8F9FA",
        apple: "#4CAF50",
        sunset_orange: "#FE6257",
        rajah: "#FEB157",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
};
