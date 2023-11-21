import React from "react";

type ShortContentProps = {
  ariaLabel: string; // Required. Write what purpose/role the component serves.
  children: React.ReactNode; // Allows content to be inserted into the component.
};

const ShortContent = ({ ariaLabel, children }: ShortContentProps) => {
  if (!ariaLabel) {
    throw new Error(
      "Please declare a landmark for the ShortContent component in terms of accessibility for screen readers: ariaLabel='Landmark Name Here'",
    );
  }

  return (
    <section
      aria-label={ariaLabel}
      className="flex w-full items-center justify-center"
    >
      <section className="w-full max-w-screen-xl">{children}</section>
    </section>
  );
};

export default ShortContent;
