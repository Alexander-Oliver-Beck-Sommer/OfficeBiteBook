import React from "react";

type TransparentBackgroundProps = {
  visible?: boolean;
  toggle?: () => void;
};

const visibilities = (visible: boolean) => {
  return visible ? "opacity-90 visible" : "opacity-0 invisible";
};

const TransparentBackground = ({
  visible = false,
  toggle = () => {},
}: TransparentBackgroundProps) => {
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
