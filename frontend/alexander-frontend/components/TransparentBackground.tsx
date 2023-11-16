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

const visibility = (visible) => {
  return visible ? "opacity-75 visible" : "opacity-0 invisible";
};

type HamburgerButtonProps = {
  visible: boolean; // Optional. Choose when the TransparentBackground component should fade in/out in terms of executed code.
  screen: string; // Optional. Choose which screens the button should appear on.
  toggle: () => void; // Optional. Toggle that makes the component able to run and execute onClick-related events.
};

const TransparentBackground = ({ visible = false, toggle, screen }) => {
  const visibleValue = visibility(visible);
  const screenValue = screens(screen);

  return (
    <div
      className={`fixed inset-0 z-20 bg-dark_gunmetal transition-all duration-400 ease-in-out ${visibleValue} ${screenValue}`}
      aria-hidden={!visible}
      onClick={toggle}
    ></div>
  );
};

export default TransparentBackground;
