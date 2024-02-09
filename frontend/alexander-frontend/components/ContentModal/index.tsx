"use client";
import React from "react";
import useUtilities from "@/hooks/useUtilities";
import IconButton from "../IconButton";

type Size =
  | "max-w-screen-sm"
  | "max-w-screen-md"
  | "max-w-screen-lg"
  | "max-w-screen-xl";

interface ContentModalProps {
  /** The visibility of the modal. FALSE = hidden | TRUE = visible. */
  visibility?: boolean;
  /** Provide functionality that can switch the modal’s visibility to false. */
  toggle?: () => void;
  /** Specify the max-width of which the modal should restricted to. */
  size?: Size;
  /** Declare a title that represents the modal - will be shown in the header. */
  title?: string;
  /** Show or hide the close button. */
  showDeleteButton?: boolean;
  /** Attach a function to the close button. */
  deleteToggle?: () => void;
  /** Show or hide the erase button. */
  showEraseButton?: boolean;
  /** Attach a function to the erase button. */
  eraseToggle?: () => void;
  /** Show or hide the archive button. */
  showArchiveButton?: boolean;
  /** Attach a function to the archive button. */
  archiveToggle?: () => void;
  /** Show or hide the add dish button. */
  showAddDishButton?: boolean;
  /** Attach a function to the add dish button. */
  addDishToggle?: () => void;
  children?: React.ReactNode;
}

const ContentModal: React.FC<ContentModalProps> = ({
  visibility = false,
  toggle = () => {},
  size = "max-w-screen-xl",
  title = "No title specified",
  showDeleteButton = false,
  deleteToggle = () => {},
  showEraseButton = false,
  eraseToggle = () => {},
  showArchiveButton = false,
  archiveToggle = () => {},
  showAddDishButton = false,
  addDishToggle = () => {},
  children = null,
}) => {
  const { disableBodyScroll } = useUtilities();
  disableBodyScroll(visibility);
  const modalStyles = visibility
    ? "pointer-events-auto visible opacity-100"
    : "pointer-events-none invisible opacity-0";
  const containerStyles = visibility
    ? "animate-fade-up animate-ease-in-out"
    : "invisible opacity-0";

  return (
    <section
      aria-modal="true"
      aria-hidden={!visibility}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${modalStyles}`}
    >
      <div className="relative flex flex-1 items-center justify-center px-5 py-10 md:p-10">
        <div
          role="button"
          aria-label="Close modal"
          className="absolute inset-0 z-40 bg-dark-100 opacity-95"
          onClick={toggle}
        ></div>
        <div
          className={`pattern relative z-50 flex h-full w-full flex-col overflow-auto rounded border-2 border-dark-500 ${size} ${containerStyles}`}
        >
          <header className="relative z-50 grid grid-cols-1Xauto items-center gap-5 bg-dark-300 p-5 md:px-10">
            <h3 className="truncate font-semibold">{title}</h3>
            <ul className="flex gap-5" aria-label="Function buttons">
              {showDeleteButton && (
                <li>
                  <IconButton
                    icon="delete"
                    toggle={deleteToggle}
                    label="Delete menu"
                    title="Delete menu"
                  />
                </li>
              )}
              {showEraseButton && (
                <li>
                  <IconButton
                    icon="erase"
                    toggle={eraseToggle}
                    label="Erase menu"
                    title="Erase menu"
                  />
                </li>
              )}
              {showArchiveButton && (
                <li>
                  <IconButton
                    icon="archive"
                    toggle={archiveToggle}
                    label="Archive menu"
                    title="Archive menu"
                  />
                </li>
              )}
              {showAddDishButton && (
                <li>
                  <IconButton
                    icon="add"
                    toggle={addDishToggle}
                    label="Add dish"
                    title="Add dish"
                  />
                </li>
              )}
              <li>
                <IconButton
                  icon="close"
                  toggle={toggle}
                  label="Close modal"
                  title="Close modal"
                />
              </li>
            </ul>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentModal;
