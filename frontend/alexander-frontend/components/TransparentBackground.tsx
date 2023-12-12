import React from "react";

const visibilities = (visible) => {
  return visible ? "opacity-90 visible blur" : "opacity-0 invisible blur-0";
};

const TransparentBackground = ({ visible = false, toggle }) => {
  const visibleValue = visibilities(visible);

  return (
    <div
      className={`fixed inset-0 z-20 bg-eerie_black transition-all duration-300 ease-in-out ${visibleValue}`}
      aria-hidden={!visible}
      onClick={toggle}
    ></div>
  );
};

export default TransparentBackground;
