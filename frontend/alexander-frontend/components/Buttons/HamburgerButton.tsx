import React from "react";

const visibilityClasses = (showOn) => {
  // Apply appropriate styling in terms of applied value to the button element.
  switch (showOn) {
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
        `Unknown value: ${showOn}. Please use one of the already defined states, or add a new one manually.`
      );
  }
};

const HamburgerButton = ({ ariaLabel, showOn = "all" }) => {
  if (!ariaLabel) {
    throw new Error(
      "Please describe what the hamburger button does: ariaLabel={'Open and close navigation'}"
    );
  }

  const showValue = visibilityClasses(showOn);

  return (
    <button
      className={`h-48 w-48 border-2 border-ghost_white relative ${showValue}`}
      aria-label={ariaLabel}
    >
      <div className="absolute w-full h-4 rounded top-20 bg-ghost_white before:content[''] before:bg-ghost_white before:h-4 before:w-full before:rounded before:top-1/4 before:absolute"></div>
    </button>
  );
};

export default HamburgerButton;
