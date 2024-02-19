import React from "react";
import useUtilities from "@/hooks/useUtilities";
import GridItem from "./GridItem";
import IconButton from "../IconButton";

interface AdminDashboardProps {
  /** Visibility of the admin dashboard. TRUE = OPEN | FALSE = CLOSED */
  visibility?: boolean;
  /** Function to close/open the admin dashboard */
  toggle?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  visibility = false,
  toggle = () => {},
}) => {
  // Styling that gets applied depending on the visibility boolean.
  const modalStyling = visibility
    ? "visible opacity-100"
    : "invisible opacity-0";
  const dashboardStyling = visibility
    ? "visible opacity-100 animate-fade-right animate-ease-in-out"
    : "invisible opacity-0";
  const { disableBodyScroll } = useUtilities();
  disableBodyScroll(visibility);

  return (
    <section
      id="admin-dashboard"
      aria-modal="true"
      aria-hidden={visibility ? "false" : "true"}
      className={`absolute inset-0 z-40 flex w-full overflow-hidden transition-all duration-300 ease-in-out ${modalStyling}`}
    >
      <div className="relative flex-1">
        <div
          className="absolute inset-0 z-40 bg-dark-100 opacity-95"
          onClick={toggle}
        ></div>
        <section
          className={`pattern relative z-50 grid h-full max-w-screen-xl grid-rows-autoX1 border-r-2 border-dark-500 transition-all duration-300 ease-in-out ${dashboardStyling}`}
        >
          <header className="grid grid-cols-1Xauto items-center gap-2.5 bg-dark-300 px-10 py-5">
            <h3 className="truncate font-semibold">Admin Dashboard</h3>
            <nav className="flex gap-5">
              <IconButton icon="arrow-right" label="Search" title="Search" />
              <IconButton
                icon="close"
                controls="admin-dashboard"
                label="Close Admin Dashboard"
                title="Close Admin Dashboard"
                toggle={toggle}
              />
            </nav>
          </header>
          <div className="flex flex-col gap-10 overflow-y-auto p-10">
            <div className="flex flex-col gap-5">
              <h3>Ready and Available</h3>
              <ul className="grid grid-cols-3 gap-10">
                <GridItem
                  icon="settings"
                  label="Inspect General Settings"
                  title="General Settings"
                  description="View and update your department details"
                />
                <GridItem
                  icon="group"
                  label="Inspect User Management"
                  title="User Management"
                  description="View and manage current users in your department, including roles & registrations"
                />
                <GridItem
                  icon="archive"
                  label="Inspect Archive"
                  title="Archive"
                  description="Manage and access your department’s archive, containing menus and dishes"
                />
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h3>Under Development</h3>
              <ul className="grid grid-cols-3 gap-10">
                <GridItem
                  disabled
                  icon="statistics"
                  title="Statistics"
                  label="Inspect Statistics"
                  description="Read and get an oversight of your departments in an variety of forms"
                />
                <GridItem
                  disabled
                  icon="finances"
                  title="Finances"
                  label="Inspect Finances"
                  description="Handle and maintain billing for dishes and menus in terms of costs"
                />
                <GridItem
                  disabled
                  icon="feedback"
                  title="Feedback"
                  label="Inspect Feedback"
                  description="Read what users in your department has to say about your dishes & menus"
                />
                <GridItem
                  disabled
                  icon="celebrations"
                  title="Celebrations"
                  label="Inspect Celebrations"
                  description="Get an oversight of current, or upcoming, user anniversaries or birthdays"
                />
                <GridItem
                  disabled
                  icon="notification"
                  title="Notifications"
                  label="Inspect Notifications"
                  description="Manage notifications sent to you and your department’s users"
                />
                <GridItem
                  disabled
                  icon="robot"
                  title="Robot"
                  label="Inspect Robot"
                  description="Manage and customize your department’s bot and when, and what, it sends and alerts"
                />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
