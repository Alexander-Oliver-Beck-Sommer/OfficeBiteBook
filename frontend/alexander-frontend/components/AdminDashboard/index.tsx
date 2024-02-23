import React from "react";
import useUtilities from "@/hooks/useUtilities";
import GridItem from "./GridItem";
import IconButton from "../IconButton";
import useAdminDashboard from "@/hooks/useAdminDashboard";

interface AdminDashboardProps {
  /** Visibility of the admin dashboard. TRUE = OPEN | FALSE = CLOSED */
  visibility?: boolean;
  /** Function to close/open the admin dashboard */
  toggle?: () => void;
  /** Department ID - essential in retrieving the fully correct data in terms of the administration of the department. */
  departmentId: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  visibility = false,
  toggle = () => {},
  departmentId,
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
  const {
    innerModal,
    enabledItems,
    disabledItems,
    title,
    closeInnerModal,
    mode,
    users,
    isBirthdayWithinNextMonth,
  } = useAdminDashboard(departmentId, visibility);

  // Function to render content based on mode
  const renderContentBasedOnMode = () => {
    switch (mode) {
      case "celebrations":
        return (
          <section className="flex-1 flex-col px-10 py-5">
            {users.length > 0 && (
              <ul className="flex flex-col gap-5">
                {users.map((user) => (
                  <li
                    key={user.user_id}
                    className="flex items-center justify-between"
                  >
                    <h4>{user.user_name}</h4>
                    <p className="text-grey">{user.user_birthday}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      case "settings":
        return <div>Settings Content</div>;
      case "user-management":
        return <div>User Management Content</div>;
      // Add more cases as needed
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <section
      id="admin-dashboard"
      aria-modal="true"
      aria-hidden={visibility ? "false" : "true"}
      className={`absolute inset-0 z-50 flex w-full overflow-hidden transition-all duration-300 ease-in-out ${modalStyling}`}
    >
      <div className="relative flex-1">
        <div
          className="absolute inset-0 z-30 bg-dark-100 opacity-95"
          onClick={toggle}
        ></div>
        <section
          className={`pattern relative z-40 grid h-full max-w-screen-xl grid-rows-autoX1 border-r-2 border-dark-500 transition-all duration-300 ease-in-out ${dashboardStyling}`}
        >
          <header className="grid grid-cols-1Xauto items-center gap-2.5 bg-dark-300 px-10 py-5">
            <div className="flex items-center gap-1.5">
              <button aria-label="Admin Dashboard" onClick={closeInnerModal}>
                <h3
                  className={`transition-all duration-200 ease-in-out
                   ${title != "" ? "text-grey" : "text-white"}
                  `}
                >
                  Admin Dashboard
                </h3>
              </button>
              {title != "" && (
                <h3 className="animate-fade-right font-semibold text-dark-500 animate-duration-200 animate-ease-in-out">
                  /
                </h3>
              )}
              {title != "" && (
                <h3 className="animate-fade-right animate-duration-200 animate-ease-in-out">
                  {title}
                </h3>
              )}
            </div>
            <nav className="flex gap-5">
              {/* <IconButton icon="arrow-right" label="Search" title="Search" /> */}
              <IconButton
                icon="close"
                controls="admin-dashboard"
                label="Close Admin Dashboard"
                title="Close Admin Dashboard"
                toggle={toggle}
              />
            </nav>
          </header>
          <div className="relative flex flex-col gap-10 overflow-y-auto p-10">
            <div className="flex flex-col gap-5">
              <h3>Ready and Available</h3>
              <ul className="grid grid-cols-3 gap-10">
                {enabledItems.map((item) => (
                  <GridItem key={item.title} {...item} toggle={item.toggle()} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h3>Under Development</h3>
              <ul className="grid grid-cols-3 gap-10">
                {disabledItems.map((item) => (
                  <GridItem key={item.title} {...item} disabled />
                ))}
              </ul>
            </div>
            <section
              aria-hidden={innerModal ? "false" : "true"}
              className={`absolute bottom-0 right-0 top-0 flex w-full overflow-hidden bg-dark-100 transition-all duration-300 ease-in-out ${
                innerModal
                  ? "visible max-w-full opacity-100"
                  : "invisible max-w-0 opacity-0"
              }`}
            >
              {renderContentBasedOnMode()}
            </section>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
