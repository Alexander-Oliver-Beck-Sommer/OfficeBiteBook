import React from "react";

interface VisibilityIconProps {
  className?: string;
  variant?: "outlined" | "filled";
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({
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
          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className={className}
        >
          <path d="M792-56 624-222q-35 11-71 16.5t-73 5.5q-134 0-245-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q22-39 47-76t58-66L56-792l56-56 736 736-56 56ZM480-320q11 0 21-1t20-4L305-541q-3 10-4 20t-1 21q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-35t4-37q0-75-52.5-127.5T480-680q-19 0-37 4t-35 12L306-766q42-17 85.5-25.5T480-800q134 0 245.5 72.5T900-537q5 8 7.5 17.5T910-500q0 10-2 19.5t-7 17.5q-24 47-55.5 88T772-302ZM587-486 467-606q26-5 50.5 4t41.5 28q17 18 24.5 41t3.5 47Z" />
        </svg>
      )}
    </>
  );
};

export default VisibilityIcon;
