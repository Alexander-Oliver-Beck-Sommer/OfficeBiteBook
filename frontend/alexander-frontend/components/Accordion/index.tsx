import React, { ReactNode, useMemo } from "react";
import IconButton from "../IconButton";

type Variant = "guest";

interface VariantConfig {
  container: string;
  icon_sizes: string;
  control_bar: string;
  text: string;
  content_panel: string;
  show_count: boolean;
  show_delete: boolean;
}

interface AccordionProps {
  /** The text to display in the accordion’s control bar. */
  text?: string;
  /** Attach a function to the delete button. */
  deleteToggle?: () => void;
  /** Disable the delete button. */
  deleteDisabled?: boolean;
  /** The count to display in the accordion’s control bar. */
  count?: number;
  /** Used to identify the accordion, aswell for aria-controls */
  id?: string;
  children?: ReactNode;
  /** Choose which variant the accordion should be shown in. */
  variant?: Variant;
  /** False = Closed | True = Expanded */
  accordionState?: boolean;
  /** Attach a function to the accordion’s control bar. */
  setAccordionState?: (state: boolean) => void;
}

const variants = (variant: string): VariantConfig => {
  switch (variant) {
    case "guest":
      return {
        container: "rounded border-2 border-dark-500 bg-dark-200",
        icon_sizes: "small",
        control_bar:
          "grid-cols-auto1Xauto py-1 pl-3 pr-1 grid items-center gap-2",
        content_panel: "bg-dark-300",
        show_count: true,
        show_delete: true,
      };
    case "add-guest": {
      return {
        container: "",
        icon_sizes: "small",
        control_bar: "bg-dark-300 p-4 items-center flex justify-between",
        text: "",
        content_panel: "bg-dark-200",
        show_count: false,
        show_delete: false,
      };
    }
    default:
      return {
        container: "",
        icon_sizes: "",
        control_bar: "",
        content_panel: "",
        show_count: false,
        show_delete: false,
      };
  }
};

const Accordion: React.FC<AccordionProps> = ({
  text = "",
  deleteToggle = () => {},
  deleteDisabled = false,
  count = 0,
  id = "",
  children = null,
  variant = "",
  accordionState = false,
  setAccordionState = () => {},
}) => {
  const accordionClass = accordionState
    ? "grid-rows-[1fr] visible opacity-100"
    : "grid-rows-[0fr] invisible opacity-0";
  const variantValue = useMemo(() => variants(variant), [variant]);

  return (
    <div className={variantValue.container}>
      <div className={variantValue.control_bar}>
        {variantValue.show_count && count !== undefined && (
          <h4 className="text-white">#{count}</h4>
        )}
        <p className={`truncate text-grey ${variantValue.text}`}>{text}</p>
        <div className="flex items-center">
          {variantValue.show_delete && (
            <IconButton
              icon="delete"
              size={variantValue.icon_sizes}
              variant="icon"
              label="Delete"
              title="Delete"
              toggle={deleteToggle}
              disabled={deleteDisabled}
            />
          )}
          <IconButton
            controls={id}
            icon="arrow-down"
            size={variantValue.icon_sizes}
            variant="icon"
            label={accordionState ? "Expanded" : "Closed"}
            title={accordionState ? "Expanded" : "Closed"}
            toggle={() => setAccordionState?.(!accordionState)}
            className={accordionState ? "-rotate-180 fill-white" : ""}
          />
        </div>
      </div>
      <div
        id={id}
        className={`grid transition-all duration-300 ease-in-out ${accordionClass} ${variantValue.content_panel}`}
        aria-hidden={!accordionState}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
