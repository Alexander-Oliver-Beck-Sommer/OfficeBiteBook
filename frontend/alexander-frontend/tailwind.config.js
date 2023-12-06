/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        header_height: "5rem",
        sidebar_width: "5rem",
        week_grid_borders: "1px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      maxWidth: {
        menu_width: "90rem",
      },
      maxHeight: {
        menu: "50rem",
      },
      gridTemplateColumns: {
        autoX1: "auto 1fr;",
        autoX8: "auto repeat(7, 1fr)",
      },
      gridTemplateRows: {
        autoX1: "auto 1fr;",
      },
    },
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
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
      transparent: "transparent",
    },
  },
  plugins: [],
};
