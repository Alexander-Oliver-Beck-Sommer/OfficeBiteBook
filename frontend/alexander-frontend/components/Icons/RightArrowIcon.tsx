import React from "react";

interface RightArrowIconProps {
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        className={className}
      >
        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
      </svg>
    </>
  );
};

export default RightArrowIcon;
