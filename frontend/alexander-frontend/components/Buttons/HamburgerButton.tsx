const screens = (screen) => {
  switch (screen) {
    case "mobile":
      return "md:hidden";
    case "tablet":
      return "hidden md:block lg:hidden";
    case "mobile-tablet":
      return "lg:hidden";
    case "desktop":
      return "hidden lg:block xl:hidden";
    case "xl":
      return "hidden xl:block";
    case "desktop-xl":
      return "hidden lg:block";
    default:
      return "";
  }
};

type HamburgerButtonProps = {
  label: string;
  screen?: string;
  toggle: () => void;
};

const HamburgerButton = ({ label, screen, toggle }: HamburgerButtonProps) => {
  if (!label) {
    throw new Error("Provide a label for the button.");
  }

  const screenValue = screens(screen);

  return (
    <button
      className={`flex h-12 w-12 items-center justify-center ${screenValue}`}
      aria-label={label}
      onClick={toggle}
    >
      <div className="flex h-6 w-10 flex-col justify-between">
        <div className="h-1 rounded bg-ghost_white"></div>
        <div className="h-1 w-full rounded bg-ghost_white"></div>
        <div className="h-1 w-full rounded bg-ghost_white"></div>
      </div>
    </button>
  );
};

export default HamburgerButton;
