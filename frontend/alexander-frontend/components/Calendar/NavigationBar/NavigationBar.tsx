import React, { useState } from "react";
import WeekFlipper from "@/components/Calendar/NavigationBar/child-components/WeekFlipper";
import MonthFlipper from "@/components/Calendar/NavigationBar/child-components/MonthFlipper";
import WeekHighlighter from "@/components/Calendar/NavigationBar/child-components/WeekHighlighter";
import HamburgerButton from "@/components/Buttons/HamburgerButton";
import Dashboard from "@/components/Calendar/Dashboard/Dashboard";
import TransparentBackground from "@/components/TransparentBackground";
import DownArrowIcon from "@/components/Icons/DownArrowIcon";

type NavigationBarProps = {
  setCurrentDate: (updateFunction: (prevDate: Date) => Date) => void;
  getCurrentWeekNumber: () => number;
};

const NavigationBar = ({
  setCurrentDate,
  getCurrentWeekNumber,
}: NavigationBarProps) => {
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
      <section className="relative grid h-16 grid-cols-autoX1">
        <section
          className={`relative z-30 flex w-sidebar_width items-center justify-center rounded-bl rounded-tl border-y-2 border-l-2 border-r-0 bg-eerie_black transition-all duration-300 ease-in-out ${sidebarStyling}`}
        >
          <HamburgerButton
            screen="all"
            label={"Open and close the dashboard"}
            toggle={toggleDashboard}
          />
        </section>
        <section className="flex items-center justify-between border-b border-arsenic px-4">
          <ul className="flex items-center gap-4">
            <li>
              <WeekFlipper
                setCurrentDate={setCurrentDate}
                currentWeek={currentWeekNumber}
              />
            </li>
            <li>
              <MonthFlipper />
            </li>
            <li>
              <button
                className="flex items-center gap-1"
                aria-label="Click and choose inbetween months and weeks"
              >
                <h4>Actions</h4>
                <DownArrowIcon className="h-6 w-6 fill-apple" />
              </button>
            </li>
          </ul>
          <ul className="flex items-center gap-4">
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
