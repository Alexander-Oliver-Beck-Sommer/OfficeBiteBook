"use client";
import React, { useState, useEffect } from "react";
import WeekFlipper from "./child-components/WeekFlipper"; // Component for flipping between weeks
import MonthFlipper from "./child-components/MonthFlipper"; // Component for flipping between months
import WeekHighlighter from "./child-components/WeekHighlighter"; // Component for showcasing the current IRL week
import HamburgerButton from "@/components/Buttons/HamburgerButton";
import Dashboard from "../Dashboard/Dashboard";
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
      ? "bg-gunmetal border-y-davys_grey border-l-davys_grey border-r-transparent"
      : "border-transparent"
  }`;

  const dashboardStyling = `${
    isDashboardOpen ? "opacity-100 visible" : " opacity-0 invisible"
  }`;

  return (
    <>
      <section className="grid-cols-autoX1 relative grid h-calendar_bar_height">
        <section
          className={`relative z-30 flex w-sidebar_width items-center justify-center border-y-[3px] border-l-[3px] border-r-0 bg-dark_gunmetal transition-all duration-400 ease-in-out ${sidebarStyling}`}
        >
          <HamburgerButton
            label={"Open and close the dashboard"}
            toggle={toggleDashboard}
          />
        </section>
        <section
          role="toolbar"
          aria-label="Week and Month View Actions"
          className="flex w-full items-center justify-start border-b border-davys_grey px-16"
        >
          <ul className="flex items-center justify-start gap-25">
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
