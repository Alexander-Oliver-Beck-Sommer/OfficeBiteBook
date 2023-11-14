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
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      lineHeight: {
        0: "0",
      },
    },
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    spacing: {
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      16: "1rem",
      20: "1.25rem",
      24: "1.5rem",
      28: "1.75rem",
      32: "2rem",
      36: "2.25rem",
      40: "2.5rem",
      44: "2.75rem",
      48: "3rem",
      52: "3.25rem",
      56: "3.5rem",
      60: "3.75rem",
      64: "4rem",
      68: "4.25rem",
      72: "4.5rem",
      76: "4.75rem",
      80: "5rem",
      84: "5.25rem",
      88: "5.5rem",
      92: "5.75rem",
      96: "6rem",
      100: "6.25rem",
    },
  },
  plugins: [],
};
