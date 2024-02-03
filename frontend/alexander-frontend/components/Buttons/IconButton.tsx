import ArrowIcon from "../Icons/ArrowIcon";
import ResetIcon from "../Icons/ResetIcon";
import UserAddIcon from "../Icons/UserAddIcon";

type IconButtonProps = {
  toggle?: boolean;
  label?: string;
  title?: string;
  size?: string;
  color?: string;
  icon?: string;
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
      return "focus-visible:border-primary focus-visible:bg-primary hover:border-primary hover:bg-primary";
    case "red":
      return "focus-visible:border-red focus-visible:bg-red hover:border-red hover:bg-red";
    case "orange":
      return "focus-visible:border-orange focus-visible:bg-orange hover:border-orange hover:bg-orange";
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
  }
};

const IconButton = ({
  toggle = () => {},
  label = "",
  title = "",
  size = "normal",
  color = "primary",
  icon = "arrow",
}: IconButtonProps) => {
  const sizeValue = sizes(size);
  const colorValue = colors(color);
  const iconValue = icons(icon, size);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={title}
      className={`flex items-center justify-center rounded border-2 border-dark-500 fill-grey outline-0 transition-all duration-300 ease-in-out hover:fill-dark-100 focus-visible:fill-dark-100 ${colorValue} ${sizeValue.button}`}
    >
      {iconValue}
    </button>
  );
};

export default IconButton;
