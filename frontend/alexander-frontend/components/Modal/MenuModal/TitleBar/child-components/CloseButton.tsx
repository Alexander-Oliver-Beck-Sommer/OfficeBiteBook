import CancelIcon from "@/components/Icons/CancelIcon";

type CloseButtonProps = {
  toggle: () => void;
  ariaLabel: string;
};

const CloseButton = ({ toggle, ariaLabel }: CloseButtonProps) => {
  if (!ariaLabel) {
    throw new Error(
      "Please provide information what the CloseButton component does: ariaLabel={'Click here to close the menu!'}",
    );
  }
  return (
    <button aria-label={ariaLabel} onClick={toggle}>
      <CancelIcon className="h-50 w-50 fill-ghost_white" />
    </button>
  );
};

export default CloseButton;
