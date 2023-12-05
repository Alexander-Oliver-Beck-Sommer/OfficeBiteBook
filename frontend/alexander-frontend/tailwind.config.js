/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      translate: {
        "center-middle": "(-50%, 0)",
      },
      borderRadius: {
        DEFAULT: "5px",
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
      },
      borderWidth: {
        currentDay: "5px",
        dashboardBorder: "3px",
        menuModalBorder: "3px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      maxWidth: {
        menu: "90rem",
      },
      maxHeight: {
        menu: "46.875rem",
      },
      lineHeight: {
        100: "100%",
        150: "150%",
      },
      gridTemplateColumns: {
        autoX1: "auto 1fr;",
        7: "repeat(7, 1fr)",
        8: "auto repeat(7, 1fr)",
      },
      gridTemplateRows: {
        2: "auto 1fr;",
      },
    },
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    transitionDuration: {
      300: "300ms",
      400: "400ms",
    },
    spacing: {
      header_height: "5rem",
      calendar_bar_height: "4.688rem",
      nav_closed: "0px",
      nav_open: "80%",
      sidebar_width: "4.688rem",
      week_grid_borders: "1px",
      week_grid_date: "4.063rem",
      week_grid_details: "6.25rem",
      week_grid_hours: "6.25rem",
      week_grid_cells: "3.125rem",
      0: "0rem",
      4: "0.25rem",
      5: "0.313rem",
      8: "0.5rem",
      10: "0.625rem",
      12: "0.75rem",
      15: "0.938rem",
      16: "1rem",
      20: "1.25rem",
      24: "1.5rem",
      25: "1.563rem",
      28: "1.75rem",
      30: "1.875rem",
      32: "2rem",
      35: "2.188rem",
      36: "2.25rem",
      40: "2.5rem",
      44: "2.75rem",
      45: "2.813rem",
      48: "3rem",
      50: "3.125rem",
      52: "3.25rem",
      55: "3.438rem",
      56: "3.5rem",
      60: "3.75rem",
      64: "4rem",
      65: "4.063rem",
      68: "4.25rem",
      70: "4.375rem",
      72: "4.5rem",
      75: "4.688rem",
      76: "4.75rem",
      80: "5rem",
      84: "5.25rem",
      85: "5.313rem",
      88: "5.5rem",
      90: "5.625rem",
      92: "5.75rem",
      95: "5.938rem",
      96: "6rem",
      100: "6.25rem",
    },
  },
  plugins: [],
};
