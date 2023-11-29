import React from "react";

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
    case "all":
      return "";
    default:
      throw new Error(
        `Unknown value: ${screen}. Please use one of the already defined states, or add a new one manually.`,
      );
  }
};

type HamburgerButtonProps = {
  ariaLabel: string; // Required. Write what purpose/role the component serves.
  screen?: string; // Optional. Choose which screens the button should appear on.
  toggle: () => void; // Optional. Toggle that makes the component able to run and execute onClick-related events.
};

const HamburgerButton = ({
  ariaLabel,
  screen = "all",
  toggle,
}: HamburgerButtonProps) => {
  if (!ariaLabel) {
    throw new Error(
      "Please describe what the HamburgerButton component does: ariaLabel={'Open and close navigation'}",
    );
  }

  const screenValue = screens(screen);

  return (
    <button
      className={`flex h-48 w-48 items-center justify-center ${screenValue}`}
      aria-label={ariaLabel}
      onClick={toggle}
    >
      <div className="flex h-25  w-40 flex-col justify-between">
        <div className="h-4 rounded bg-ghost_white"></div>
        <div className="h-4 w-full rounded bg-ghost_white"></div>
        <div className="h-4 w-full rounded bg-ghost_white"></div>
      </div>
    </button>
  );
};

export default HamburgerButton;
