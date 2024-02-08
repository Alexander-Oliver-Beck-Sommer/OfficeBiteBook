import React from "react";
import ArrowIcon from "../Icons/ArrowIcon";
import ResetIcon from "../Icons/ResetIcon";
import UserAddIcon from "../Icons/UserAddIcon";
import CloseIcon from "../Icons/CloseIcon";
import DeleteIcon from "../Icons/DeleteIcon";

type Size = "normal" | "small";
type Color = "primary" | "red" | "orange";
type Icon =
  | "arrow-up"
  | "arrow-right"
  | "arrow-down"
  | "arrow-left"
  | "reset"
  | "user-add"
  | "close"
  | "delete";
type Variant = "filled" | "icon";

interface IconButtonProps {
  /** Attach a function for the component to trigger. */
  toggle?: () => void;
  /** Defines a string value that labels the current element. */
  label?: string;
  /**  Defines a string value that specifies the title of the current element, which typically appears as a tooltip. */
  title?: string;
  /** Supported sizes: small, normal. */
  size?: Size;
  /** Supported: primary, red, orange. */
  color?: Color;
  /** Defines which icon to display. */
  icon?: Icon;
  /** Normal: icon with border and background. Icon: icon with no border or background. */
  variant?: Variant;
  /** Attach optional styling if needed. */
  className?: string;
  /** Define the id of the element, the button controls. */
  controls?: string;
  /** Define if the button should be disabled. */
  disabled?: boolean;
}

const sizes = (size: Size = "normal"): { button: string; icon: string } => {
  switch (size) {
    case "normal":
      return { button: "h-10 w-10", icon: "h-5 w-5" };
    case "small":
      return { button: "h-8 w-8", icon: "h-4 w-4" };
    default:
      return { button: "", icon: "" };
  }
};

const colors = (color: Color): string => {
  switch (color) {
    case "primary":
    case "red":
    case "orange":
      return `hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-${color} focus-visible:bg-${color} hover:border-${color} hover:bg-${color}`;
    default:
      return "";
  }
};

const icons = (icon: Icon, size: Size): JSX.Element | null => {
  const sizeClasses = sizes(size);
  switch (icon) {
    case "arrow-up":
    case "arrow-right":
    case "arrow-down":
    case "arrow-left":
      return (
        <ArrowIcon variant={icon.split("-")[1]} className={sizeClasses.icon} />
      );
    case "reset":
      return <ResetIcon className={sizeClasses.icon} />;
    case "user-add":
      return <UserAddIcon className={sizeClasses.icon} />;
    case "close":
      return <CloseIcon className={sizeClasses.icon} />;
    case "delete":
      return <DeleteIcon className={sizeClasses.icon} />;
    default:
      return null;
  }
};

const variants = (variant: Variant): string => {
  switch (variant) {
    case "filled":
      return "border-dark-500 bg-dark-100";
    case "icon":
      return "border-transparent";
    default:
      return "";
  }
};

const IconButton: React.FC<IconButtonProps> = ({
  toggle = () => {},
  label = "",
  title = "",
  size = "normal",
  color = "primary",
  icon = "arrow-up",
  variant = "filled",
  className = "",
  controls = "",
  disabled = false,
}) => {
  const sizeValue = sizes(size);
  const colorValue = variant !== "icon" ? colors(color) : "";
  const iconValue = icons(icon, size);
  const variantValue = variants(variant);
  const disabledValue = disabled ? "fill-dark-500" : "fill-grey";

  return (
    <button
      {...(controls ? { "aria-controls": controls } : {})}
      onClick={disabled ? undefined : toggle}
      {...(label ? { "aria-label": label } : {})}
      {...(title ? { title: title } : {})}
      {...(disabled ? { disabled: true } : {})}
      className={`flex items-center justify-center rounded border-2 outline-0 transition-all duration-300 ease-in-out ${colorValue} ${sizeValue.button} ${variantValue} ${disabledValue} ${className}`}
    >
      {iconValue}
    </button>
  );
};

export default IconButton;
