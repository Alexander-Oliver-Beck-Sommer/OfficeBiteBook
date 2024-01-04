import React from "react";

interface TextIconProps {
  className?: string;
}

const TextIcon: React.FC<TextIconProps> = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        className={className}
      >
        <path d="M13 6V21H11V6H5V4H19V6H13Z" />
      </svg>
    </>
  );
};

export default TextIcon;
