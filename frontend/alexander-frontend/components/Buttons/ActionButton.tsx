import AddIcon from "@/components/Icons/AddIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import CycleIcon from "@/components/Icons/CycleIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import UploadIcon from "@/components/Icons/UploadIcon";

const icons = (icon) => {
  switch (icon) {
    case "cancel":
      return <CancelIcon variant="disabled" />;
    case "check":
      return <CheckIcon variant="disabled" />;
    case "add":
      return <AddIcon />;
    case "cycle":
      return <CycleIcon />;
    case "delete":
      return <DeleteIcon />;
    case "upload":
      return <UploadIcon />;
    default:
      return null;
  }
};

const variants = (variant) => {
  switch (variant) {
    case "filled":
      return "bg-davys_grey border-transparent border-2 px-20 py-12 fill-ghost_white";
    case "outlined":
      return "border-davys_grey border-2 px-20 py-12 fill-ghost_white";
    default:
      return "fill-cool_grey";
  }
};

type ActionButtonsProps = {
  icon: string; // Choose which icon to display.
  variant: string; // Choose which variant of the button to display.
  label: string; // Describe what the button does.
  name: string; // Provide a name for the button.
  toggle: () => void; // Provide a function to toggle the button.
};

const ActionButton = ({
  icon,
  variant,
  label,
  name,
  toggle,
}: ActionButtonsProps) => {
  if (!label) {
    throw new Error("Provide a label for the button.");
  }
  if (!name) {
    throw new Error("Provide a name for the button.");
  }

  const iconValue = icons(icon);
  const variantValue = variants(variant);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className={`flex items-center justify-center gap-8 rounded text-ghost_white ${variantValue}`}
    >
      <h4>{name}</h4>
      {iconValue}
    </button>
  );
};

export default ActionButton;
