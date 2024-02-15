import React from "react";
import SaveIcon from "../Icons/SaveIcon";
import CloseIcon from "../Icons/CloseIcon";
import ArrowIcon from "../Icons/ArrowIcon";

type Icon =
  | "save"
  | "close"
  | "arrow-up"
  | "arrow-right"
  | "arrow-down"
  | "arrow-left";
type Color = "primary" | "red" | "orange";
type Type = "button" | "submit" | "reset";

interface TextButtonProps {
  /** Declare styling for the component if necessary */
  className?: string;
  /** Declare a string that will serve as text inside the button. */
  text?: string;
  /** Defines a string value that labels the current element. */
  label?: string;
  /**  Defines a string value that specifies the title of the current element, which typically appears as a tooltip. */
  title?: string;
  /** Defines which icon to display. */
  icon?: Icon;
  /** Supported: primary, red, orange. */
  color?: Color;
  /** Define if the button should be disabled. */
  disabled?: boolean;
  /** Attach functionality to the button. */
  toggle?: () => void;
  type?: Type;
}

const icons = (icon: Icon): JSX.Element | null => {
  switch (icon) {
    case "save":
      return <SaveIcon />;
    case "close":
      return <CloseIcon />;
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return <ArrowIcon variant={icon.split("-")[1]} />;
    default:
      return null;
  }
};

const colors = (color: Color): string => {
  switch (color) {
    case "primary":
    case "red":
    case "orange":
      return `focus-visible:border-${color} focus-visible:bg-${color} hover:border-${color} hover:bg-${color}`;
    default:
      return null;
  }
};

const TextButton: React.FC<TextButtonProps> = ({
  className = "",
  text = "",
  label = "",
  title = "",
  icon = "save",
  color = "primary",
  disabled = false,
  toggle = () => {},
  type = "button",
}) => {
  const colorValue = colors(color);
  const iconValue = icons(icon);
  const disabledValue = disabled
    ? "fill-dark-500 text-dark-500"
    : "fill-grey text-grey";

  return (
    <button
      onClick={disabled ? undefined : toggle}
      type={type}
      {...(label ? { "aria-label": label } : {})}
      {...(title ? { title: title } : {})}
      {...(disabled ? { disabled: true } : {})}
      className={`flex items-center justify-center gap-2 rounded border-2 border-dark-500 bg-dark-100 px-5 py-2.5 outline-0 transition-all duration-300 ease-in-out hover:fill-dark-100 hover:text-dark-100 focus-visible:fill-dark-100 focus-visible:text-dark-100 ${colorValue} ${disabledValue} ${className}`}
    >
      <h4>{text}</h4>
      {iconValue}
    </button>
  );
};

export default TextButton;
