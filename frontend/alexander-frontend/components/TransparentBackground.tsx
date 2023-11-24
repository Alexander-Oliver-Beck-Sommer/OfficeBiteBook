import React from "react";

const visibility = (visible) => {
  return visible ? "opacity-75 visible" : "opacity-0 invisible";
};

const TransparentBackground = ({ visible = false, toggle }) => {
  const visibleValue = visibility(visible);

  return (
    <div
      className={`fixed inset-0 z-20 bg-dark_gunmetal transition-all duration-400 ease-in-out ${visibleValue}`}
      aria-hidden={!visible}
      onClick={toggle}
    ></div>
  );
};

export default TransparentBackground;
