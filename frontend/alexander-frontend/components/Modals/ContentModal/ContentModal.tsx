import ActionButton from "@/components/Buttons/ActionButton";
import { useEffect } from "react";

type ContentModalProps = {
  children?: React.ReactNode;
  visible?: boolean;
  label?: string;
  title?: string;
  toggle?: () => void;
};

const ContentModal = ({
  children,
  visible = false,
  label = "",
  title = "",
  toggle = () => {},
}: ContentModalProps) => {
  const modalStyling = visible ? "visible opacity-100" : "invisible opacity-0";
  const animateUp = visible
    ? "animate-fade-up animate-ease-in-out"
    : "opacity-0 invisible";

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (visible) {
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [visible]);

  return (
    <section
      aria-label={label}
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${modalStyling}`}
    >
      <div className="relative flex w-full items-center justify-center p-4">
        <section
          className="hover:bg-dark-200 absolute inset-0 z-40 cursor-pointer bg-dark-100 opacity-95 transition-all duration-300 ease-in-out"
          onClick={toggle}
        ></section>
        <section
          className={`border-dark-500 relative z-50 grid w-full grid-rows-autoX1 overflow-auto rounded border  transition-all duration-300 ease-in-out ${animateUp}`}
        >
          <div className="flex items-center justify-between bg-dark-100 p-4">
            <h3>{title}</h3>
            <ActionButton toggle={toggle} variant="close" icon="cancel" />
          </div>
          <ul className="overflow-auto">{children}</ul>
        </section>
      </div>
    </section>
  );
};

export default ContentModal;
