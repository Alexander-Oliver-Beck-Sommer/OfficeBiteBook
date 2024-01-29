import React from "react";

type WideContentProps = {
  ariaLabel?: string;
  children: React.ReactNode;
};

const WideContent = ({ ariaLabel = "", children }: WideContentProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className="border-red flex w-full items-center justify-center border-2"
    >
      {children}
    </section>
  );
};

export default WideContent;
