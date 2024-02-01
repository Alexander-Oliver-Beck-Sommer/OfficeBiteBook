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
};

const UnderlineButton = ({
  toggle = () => {},
  label = "",
  icon = "",
  direction = "left",
}: UnderlineButtonProps) => {
  const iconType = icons(icon);
  const iconPosition = direction === "right" ? "flex-row" : "flex-row-reverse";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={`group relative flex items-center gap-2 fill-grey text-grey transition-all duration-300 ease-in-out hover:fill-primary hover:text-white ${iconPosition}`}
    >
      <h4>{label}</h4>
      {iconType}
      <div className="pointer-events-none absolute -bottom-2 h-[3px] w-0 rounded bg-grey opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-primary group-hover:opacity-100"></div>
    </button>
  );
};

export default UnderlineButton;