import React from "react";
import ArchiveIcon from "../Icons/ArchiveIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import GroupIcon from "../Icons/GroupIcon";
import StatisticsIcon from "../Icons/StatisticsIcon";
import FinancesIcon from "../Icons/FinancesIcon";
import FeedbackIcon from "../Icons/FeedbackIcon";
import CelebrationsIcon from "../Icons/CelebrationsIcon";
import NotificationIcon from "../Icons/NotificationIcon";
import RobotIcon from "../Icons/RobotIcon";

type Icon =
  | "archive"
  | "settings"
  | "group"
  | "statistics"
  | "finances"
  | "feedback"
  | "celebrations"
  | "notification"
  | "robot";

interface GridItemProps {
  /** Define the icon to display. */
  icon?: Icon;
  /** Define the title of the grid item. */
  title?: string;
  /** Define the description of the grid item. */
  description?: string;
  /** Attach a function for the component to trigger. */
  toggle?: () => void;
  /** Defines a string value that labels the current element. */
  label?: string;
  /** Define if the button should be disabled. */
  disabled?: boolean;
}

const icons = (icon: Icon): JSX.Element | null => {
  switch (icon) {
    case "archive":
      return <ArchiveIcon />;
    case "settings":
      return <SettingsIcon />;
    case "group":
      return <GroupIcon />;
    case "statistics":
      return <StatisticsIcon />;
    case "finances":
      return <FinancesIcon />;
    case "feedback":
      return <FeedbackIcon />;
    case "celebrations":
      return <CelebrationsIcon />;
    case "notification":
      return <NotificationIcon />;
    case "robot":
      return <RobotIcon />;
    default:
      return null;
  }
};

const GridItem: React.FC<GridItemProps> = ({
  icon = "",
  title,
  description,
  toggle = () => {},
  label,
  disabled = false,
}) => {
  const iconValue = icons(icon);

  return (
    <li>
      <button
        {...(disabled && { disabled: true })}
        onClick={toggle}
        className={`group/grid-item grid grid-cols-autoX1 gap-5 outline-0 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label={disabled ? "Disabled" : label}
        title={disabled ? "Disabled" : label}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded border-2 bg-dark-100 transition-all duration-300 ease-in-out  ${
            disabled
              ? "border-dark-300 fill-dark-500"
              : "border-dark-500 fill-grey group-hover/grid-item:border-primary group-hover/grid-item:bg-primary group-hover/grid-item:fill-dark-100 group-focus-visible/grid-item:border-primary group-focus-visible/grid-item:bg-primary group-focus-visible/grid-item:fill-dark-100"
          }`}
        >
          {iconValue}
        </div>
        <div className="text-left">
          <h4 className={disabled ? "text-dark-500" : "text-white"}>{title}</h4>
          <p className={`text-sm ${disabled ? "text-dark-500" : "text-grey"}`}>
            {description}
          </p>
        </div>
      </button>
    </li>
  );
};

export default GridItem;
