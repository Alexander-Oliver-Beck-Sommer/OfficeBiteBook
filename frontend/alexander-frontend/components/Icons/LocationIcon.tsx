import React from "react";

interface LocationIconProps {
  className?: string;
  variant?: "outlined" | "filled";
}

const LocationIcon: React.FC<LocationIconProps> = ({
  className,
  variant = "filled",
}) => {
  return (
    <>
      {variant === "filled" ? (
        <svg
          width="24"
          height="24"
          viewBox="0 -960 960 960"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className={className}
        >
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
        </svg>
      )}
    </>
  );
};

export default LocationIcon;
