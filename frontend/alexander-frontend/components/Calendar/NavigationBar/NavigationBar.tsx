import { useState } from "react";
import WeekFlipper from "@/components/Calendar/NavigationBar/child-components/WeekFlipper";
import MonthFlipper from "@/components/Calendar/NavigationBar/child-components/MonthFlipper";
import WeekHighlighter from "@/components/Calendar/NavigationBar/child-components/WeekHighlighter";
import DownArrowIcon from "@/components/Icons/DownArrowIcon";
import WeekTypeSwitcher from "./child-components/WeekTypeSwitcher";
import { Turn as Hamburger } from "hamburger-react";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";

type NavigationBarProps = {
  navigationBarWeekBackward: () => void;
  navigationBarWeekNumber: number;
  navigationBarWeekForward: () => void;
  navigationBarWeekHighlighter?: number;
  navigationBarWeekHighlighterReset?: () => void;
  navigationBarWeekTypeSwitcherToggle?: () => void;
};

const NavigationBar = ({
  navigationBarWeekBackward = () => {},
  navigationBarWeekNumber = 0,
  navigationBarWeekForward = () => {},
  navigationBarWeekHighlighterValue = 0,
  navigationBarWeekHighlighterReset = () => {},
  navigationBarWeekTypeSwitcherToggle,
}: NavigationBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const adminDashboardToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <section className="grid h-14 grid-cols-autoX1">
        <section className="relative flex w-sidebar_width items-center justify-center bg-dark-100">
          <div className="absolute z-50">
            <Hamburger
              label="Open admin dashboard"
              direction="right"
              toggled={menuOpen}
              toggle={adminDashboardToggle}
            />
          </div>
        </section>
        <section className="border-dark-500 flex items-center justify-between border-b px-4">
          <ul className="flex items-center gap-4">
            <li>
              <WeekFlipper
                weekFlipperBackward={navigationBarWeekBackward}
                weekFlipperCurrentWeek={navigationBarWeekNumber}
                weekFlipperForward={navigationBarWeekForward}
              />
            </li>
            <li>
              <MonthFlipper />
            </li>
            {/* <li>
              <button
                className="flex items-center gap-1"
                aria-label="Click and choose inbetween months and weeks"
              >
                <h4>Actions</h4>
                <DownArrowIcon className="h-6 w-6 fill-primary" />
              </button>
            </li> */}
          </ul>
          <ul className="flex items-center gap-6">
            <li>
              <WeekTypeSwitcher
                weekTypeSwitcherToggle={navigationBarWeekTypeSwitcherToggle}
              />
            </li>
            <li>
              <WeekHighlighter
                weekHighlighterValue={navigationBarWeekHighlighterValue}
                weekHighlighterReset={navigationBarWeekHighlighterReset}
              />
            </li>
          </ul>
        </section>
      </section>
      <AdminDashboard
        adminDashboardVisibility={menuOpen}
        adminDashboardClose={adminDashboardToggle}
      />
    </>
  );
};
export default NavigationBar;
