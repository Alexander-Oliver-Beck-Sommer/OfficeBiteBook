import AddIcon from "@/components/Icons/AddIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import CycleIcon from "@/components/Icons/CycleIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import SettingsIcon from "../Icons/SettingsIcon";

const icons = (icon) => {
  switch (icon) {
    case "cancel":
      return <CancelIcon variant="disabled" />;
    case "check":
      return <CheckIcon variant="disabled" />;
    case "add":
      return <AddIcon variant="disabled" />;
    case "cycle":
      return <CycleIcon />;
    case "delete":
      return <DeleteIcon />;
    case "downArrow":
      return <DownArrowIcon />;
    case "upload":
      return <UploadIcon />;
      case "settings":
        return <SettingsIcon />;
    default:
      return null;
  }
};

const variants = (variant) => {
  switch (variant) {
    case "filled":
      return "bg-arsenic border-transparent border-2 px-5 py-3 fill-ghost_white rounded";
    case "outlined":
      return "border-arsenic border-2 px-5 py-3 fill-ghost_white rounded";
    default:
      return "fill-cool_grey outline-offset-4";
  }
};

type ActionButtonsProps = {
  style: string;
  icon: string;
  variant: string;
  label: string;
  name: string;
  toggle: () => void;
};

const ActionButton = ({
  style,
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
      className={`flex items-center justify-center gap-2 text-ghost_white ${variantValue} ${style}`}
    >
      <h4>{name}</h4>
      {iconValue}
    </button>
  );
};

export default ActionButton;
