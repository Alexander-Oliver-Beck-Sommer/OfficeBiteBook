import AddIcon from "../Icons/AddIcon";
import CancelIcon from "../Icons/CancelIcon";
import CheckIcon from "../Icons/CheckIcon";
import CycleIcon from "../Icons/CycleIcon";
import DeleteIcon from "../Icons/DeleteIcon";

const selectIcon = (icon) => {
  switch (icon) {
    case "cancel":
      return <CancelIcon variant="disabled" className="h-24 w-24" />;
    case "check":
      return <CheckIcon variant="disabled" className="h-24 w-24" />;
    case "add":
      return <AddIcon className="h-24 w-24" />;
    case "cycle":
      return <CycleIcon className="h-24 w-24" />;
    case "delete":
      return <DeleteIcon className="h-24 w-24" />;
    default:
      return null;
  }
};

const selectVariant = (variant) => {
  switch (variant) {
    case "filled":
      return "bg-davys_grey border-transparent border-[3px] px-25 py-15 fill-ghost_white";
    case "outlined":
      return "border-davys_grey border-[3px] px-25 py-15 fill-ghost_white";
    default:
      return "fill-cool_grey";
  }
};

type ActionButtonsProps = {
  icon: string;
  variant: string;
  label: string;
  name: string;
  toggle: () => void;
};

const ActionButton = ({
  icon,
  variant,
  label,
  name,
  toggle,
}: ActionButtonsProps) => {
  const iconComponent = selectIcon(icon);
  const variantStyle = selectVariant(variant);

  return (
    <button
      aria-label={label}
      className={`flex items-center justify-center gap-8 rounded text-ghost_white ${variantStyle}`}
    >
      <h4>{name}</h4>
      {iconComponent}
    </button>
  );
};

export default ActionButton;
