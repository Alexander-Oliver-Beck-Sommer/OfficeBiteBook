import React, { useState } from "react";
import WeekFlipper from "./child-components/WeekFlipper";
import MonthFlipper from "./child-components/MonthFlipper";
import WeekHighlighter from "./child-components/WeekHighlighter";
import HamburgerButton from "@/components/Buttons/HamburgerButton";
import Dashboard from "@/components/Calendar/Dashboard/Dashboard";
import TransparentBackground from "@/components/TransparentBackground";

const NavigationBar = ({
  currentDate,
  setCurrentDate,
  getCurrentWeekNumber,
}) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const currentWeekNumber = getCurrentWeekNumber();

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const sidebarStyling = `${
    isDashboardOpen
      ? "bg-raisin_black border-y-arsenic border-l-arsenic border-r-transparent"
      : "border-transparent"
  }`;

  const dashboardStyling = `${
    isDashboardOpen ? "opacity-100 visible" : " opacity-0 invisible"
  }`;

  return (
    <>
      <section className="relative grid h-20 grid-cols-autoX1">
        <section
          className={`bg-eerie_black relative z-30 flex w-sidebar_width items-center justify-center rounded-bl rounded-tl border-y-2 border-l-2 border-r-0 transition-all duration-300 ease-in-out ${sidebarStyling}`}
        >
          <HamburgerButton
            label={"Open and close the dashboard"}
            toggle={toggleDashboard}
          />
        </section>
        <section
          role="toolbar"
          aria-label="Week and Month View Actions"
          className="border-arsenic flex w-full items-center justify-start border-b px-4"
        >
          <ul className="gap-6 flex items-center justify-start">
            <li>
              <WeekFlipper
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                currentWeek={currentWeekNumber}
              />
            </li>
            <li>
              <MonthFlipper />
            </li>
            <li>
              <WeekHighlighter />
            </li>
          </ul>
        </section>
      </section>
      <Dashboard style={`${dashboardStyling}`} />
      <TransparentBackground
        visible={isDashboardOpen}
        toggle={() => setIsDashboardOpen(false)}
      />
    </>
  );
};
export default NavigationBar;
