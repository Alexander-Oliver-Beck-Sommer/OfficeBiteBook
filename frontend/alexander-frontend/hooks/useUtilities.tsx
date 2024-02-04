import { useEffect, useState } from "react";

const useUtilities = () => {
  const disableBodyScroll = (isDisabled) => {
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

  return { disableBodyScroll };
};

export default useUtilities;
