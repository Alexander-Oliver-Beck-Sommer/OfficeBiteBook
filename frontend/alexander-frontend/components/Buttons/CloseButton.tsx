import CancelIcon from "@/components/Icons/CancelIcon";

type CloseButtonProps = {
  label: string;
  toggle: () => void;
};

const CloseButton = ({ toggle, label }: CloseButtonProps) => {
  if (!label) {
    throw new Error(
      "Please provide information what the CloseButton component does: ariaLabel={'Click here to close the menu!'}",
    );
  }

  return (
    <button aria-label={label} onClick={toggle}>
      <CancelIcon className="h-12 w-12 fill-ghost_white" variant="disabled" />
    </button>
  );
};

export default CloseButton;
