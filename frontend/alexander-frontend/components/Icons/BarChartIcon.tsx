import React from "react";

interface BarChartIconProps {
  className?: string;
}

const BarChartIcon: React.FC<BarChartIconProps> = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        className={className}
      >
        <path d="M720-160q-33 0-56.5-23.5T640-240v-120q0-33 23.5-56.5T720-440q33 0 56.5 23.5T800-360v120q0 33-23.5 56.5T720-160Zm-240 0q-33 0-56.5-23.5T400-240v-480q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720v480q0 33-23.5 56.5T480-160Zm-240 0q-33 0-56.5-23.5T160-240v-280q0-33 23.5-56.5T240-600q33 0 56.5 23.5T320-520v280q0 33-23.5 56.5T240-160Z" />
      </svg>
    </>
  );
};

export default BarChartIcon;
