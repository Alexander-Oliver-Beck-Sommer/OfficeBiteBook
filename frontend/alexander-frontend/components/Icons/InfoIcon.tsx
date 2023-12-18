import React from "react";

interface InfoIconProps {
  className?: string;
  variant?: "outlined" | "filled";
}

const InfoIcon: React.FC<InfoIconProps> = ({
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
          <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className={className}
        >
          <path d="M480-680q-33 0-56.5-23.5T400-760q0-33 23.5-56.5T480-840q33 0 56.5 23.5T560-760q0 33-23.5 56.5T480-680Zm0 560q-25 0-42.5-17.5T420-180v-360q0-25 17.5-42.5T480-600q25 0 42.5 17.5T540-540v360q0 25-17.5 42.5T480-120Z" />
        </svg>
      )}
    </>
  );
};

export default InfoIcon;
