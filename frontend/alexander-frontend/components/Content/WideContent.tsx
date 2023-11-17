import React from "react";

type WideContentProps = {
  ariaLabel: string; // Required. Write what purpose/role the component serves.
  children: React.ReactNode; // Allows content to be inserted into the component.
};

const WideContent = ({ ariaLabel, children }: WideContentProps) => {
  if (!ariaLabel) {
    throw new Error(
      "Please declare a landmark for the WideContent component in terms of accessibility for screen readers: ariaLabel='Landmark Name Here'",
    );
  }

  return (
    <section aria-label={ariaLabel} className="border-2 border-sunset_orange w-full flex justify-center items-center">
        {children}
    </section>
  );
};

export default WideContent;
