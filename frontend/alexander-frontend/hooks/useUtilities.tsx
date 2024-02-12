import { useEffect, useState } from "react";

const useUtilities = () => {
  const [accordionId, setAccordionId] = useState<string | null>(null);

  // Boolean-based function that can disable scroll on the body - primarily used with modals.
  const disableBodyScroll = (isDisabled: boolean) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = isDisabled ? "hidden" : "";
      }

      return () => {
        if (typeof window !== "undefined") {
          document.body.style.overflow = "";
        }
      };
    }, [isDisabled]);
  };

  // Simple function used to maintain accordions and keep only one accordion open at a time.
  const handleAccordion = (id: string) => {
    if (accordionId == id) {
      setAccordionId(null);
    } else {
      setAccordionId(id);
    }
  };

  return { disableBodyScroll, handleAccordion, accordionId };
};

export default useUtilities;
