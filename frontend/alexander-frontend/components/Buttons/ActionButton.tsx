import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import ReplaceIcon from "@/components/Icons/ReplaceIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import InventoryIcon from "../Icons/InventoryIcon";
import EraseIcon from "../Icons/EraseIcon";

const icons = (icon: string) => {
  switch (icon) {
    case "cancel":
      return <CloseIcon />;
    case "check":
      return <CheckIcon />;
    case "add":
      return <AddIcon />;
    case "replace":
      return <ReplaceIcon />;
    case "delete":
      return <DeleteIcon />;
    case "downArrow":
      return <DownArrowIcon />;
    case "settings":
      return <SettingsIcon />;
    case "inventory":
      return <InventoryIcon />;
    case "erase":
      return <EraseIcon />;
    default:
      return null;
  }
};

const variants = (variant: string, isDisabled: boolean) => {
  const iconBorderDisabled = isDisabled
    ? "fill-arsenic border-dark_charcoal"
    : "fill-ghost_white border-arsenic hover:bg-arsenic";

  switch (variant) {
    case "filled":
      return "bg-arsenic border-transparent border-2 px-5 py-3 fill-ghost_white rounded";
    case "outlined":
      return "border-arsenic bg-eerie_black border-2 px-5 py-3 fill-ghost_white rounded hover:bg-arsenic";
    case "icon-border":
      return `bg-eerie_black border-2 px-3 py-3 rounded ${iconBorderDisabled}`;
    case "icon":
      return "px-3 py-3 fill-ghost_white rounded hover:bg-arsenic";
    default:
      return "fill-cool_grey outline-offset-4";
  }
};

type ActionButtonsProps = {
  style?: string;
  icon?: string;
  variant?: string;
  label?: string;
  name?: string;
  title?: string;
  disabled?: boolean;
  toggle?: () => void;
};

const ActionButton = ({
  style = "",
  icon = "",
  variant = "",
  label = "",
  name = "",
  title = "",
  disabled = false,
  toggle = () => {},
}: ActionButtonsProps) => {
  const iconValue = icons(icon);
  const variantValue = variants(variant, disabled);

  return (
    <button
      title={title}
      onClick={toggle}
      aria-label={label}
      {...(disabled ? { disabled: true } : {})}
      className={`flex items-center justify-center gap-2 text-ghost_white ${variantValue} ${style}`}
    >
      {variant !== "icon" && variant !== "icon-border" && <h4>{name}</h4>}
      {iconValue}
    </button>
  );
};

export default ActionButton;
