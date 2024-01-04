import React from "react";

interface UploadIconProps {
  className?: string;
}

const UploadIcon: React.FC<UploadIconProps> = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        className={className}
      >
        <path d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z" />
      </svg>
    </>
  );
};

export default UploadIcon;
