import ArrowIcon from "@/components/Icons/ArrowIcon";

const icons = (icon: string) => {
  switch (icon) {
    case "arrow-up":
      return <ArrowIcon variant="up" />;
    case "arrow-right":
      return <ArrowIcon variant="right" />;
    case "arrow-down":
      return <ArrowIcon variant="down" />;
    case "arrow-left":
      return <ArrowIcon variant="left" />;
    default:
      return null;
  }
};

type UnderlineButtonProps = {
  toggle?: () => void;
  label?: string;
  icon?: string;
  direction?: "left" | "right";
  className?: string;
};

const UnderlineButton = ({
  toggle = () => {},
  label = "",
  icon = "",
  direction = "left",
  className = "",
}: UnderlineButtonProps) => {
  const iconType = icons(icon);
  const iconPosition = direction === "right" ? "flex-row" : "flex-row-reverse";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={`group/underline-button relative flex items-center gap-2 fill-grey text-grey transition-all duration-300 ease-in-out hover:fill-primary hover:text-white ${iconPosition}`}
    >
      <p className={className}>{label}</p>
      {iconType}
      <div className="pointer-events-none absolute -bottom-2 h-[3px] w-0 rounded bg-grey opacity-0 transition-all duration-300 ease-in-out group-hover/underline-button:w-full group-hover/underline-button:bg-primary group-hover/underline-button:opacity-100"></div>
    </button>
  );
};

export default UnderlineButton;
