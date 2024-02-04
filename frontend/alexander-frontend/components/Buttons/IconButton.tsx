import ArrowIcon from "../Icons/ArrowIcon";
import ResetIcon from "../Icons/ResetIcon";
import UserAddIcon from "../Icons/UserAddIcon";
import CloseIcon from "../Icons/CloseIcon";

type IconButtonProps = {
  toggle?: boolean;
  label?: string;
  title?: string;
  size?: string;
  color?: string;
  icon?: string;
  variant?: string;
  className?: string;
};

const sizes = (size) => {
  switch (size) {
    case "normal":
      return { button: "h-10 w-10", icon: "h-5 w-5" };
    case "small":
      return { button: "h-8 w-8", icon: "h-4 w-4" };
  }
};

const colors = (color) => {
  switch (color) {
    case "primary":
      return "hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-primary focus-visible:bg-primary hover:border-primary hover:bg-primary";
    case "red":
      return "hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-red focus-visible:bg-red hover:border-red hover:bg-red";
    case "orange":
      return "hover:fill-dark-100 focus-visible:fill-dark-100 focus-visible:border-orange focus-visible:bg-orange hover:border-orange hover:bg-orange";
  }
};

const icons = (icon, size) => {
  const sizeClasses = sizes(size);
  switch (icon) {
    case "arrow-up":
      return <ArrowIcon variant="up" className={sizeClasses.icon} />;
    case "arrow-right":
      return <ArrowIcon variant="right" className={sizeClasses.icon} />;
    case "arrow-down":
      return <ArrowIcon variant="down" className={sizeClasses.icon} />;
    case "arrow-left":
      return <ArrowIcon variant="left" className={sizeClasses.icon} />;
    case "reset":
      return <ResetIcon className={sizeClasses.icon} />;
    case "user-add":
      return <UserAddIcon className={sizeClasses.icon} />;
    case "close":
      return <CloseIcon className={sizeClasses.icon} />;
  }
};

const variants = (variant) => {
  switch (variant) {
    case "filled":
      return "border-dark-500 bg-dark-100";
    case "icon":
      return "border-transparent";
  }
};

const IconButton = ({
  toggle = () => {},
  label = "",
  title = "",
  size = "normal",
  color = "primary",
  icon = "arrow",
  variant = "filled",
  className = "",
}: IconButtonProps) => {
  const sizeValue = sizes(size);
  const colorValue = variant !== "icon" ? colors(color) : "";
  const iconValue = icons(icon, size);
  const variantValue = variants(variant);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={title}
      className={`flex items-center justify-center rounded border-2 fill-grey outline-0 transition-all duration-300 ease-in-out ${colorValue} ${sizeValue.button} ${variantValue} ${className}`}
    >
      {iconValue}
    </button>
  );
};

export default IconButton;
