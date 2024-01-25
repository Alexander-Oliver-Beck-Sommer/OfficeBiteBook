import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import ReplaceIcon from "@/components/Icons/ReplaceIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import DownArrowIcon from "@/components/Icons/DownArrowIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import InventoryIcon from "@/components/Icons/InventoryIcon";
import EraseIcon from "@/components/Icons/EraseIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import SaveIcon from "../Icons/SaveIcon";

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
    case "upload":
      return <UploadIcon />;
    case "info":
      return <InfoIcon className="h-6 w-6" />;
    case "save":
      return <SaveIcon />;
    default:
      return null;
  }
};

const variants = (variant: string, isDisabled: boolean) => {
  const outlinedDisabled = isDisabled
    ? "fill-arsenic text-arsenic border-dark_charcoal"
    : "fill-ghost_white text-ghost_white border-arsenic hover:bg-arsenic";
  const iconBorderDisabled = isDisabled
    ? "fill-arsenic border-dark_charcoal"
    : "fill-apple border-arsenic hover:bg-arsenic";

  switch (variant) {
    case "filled":
      return "bg-arsenic border-transparent border-2 px-5 py-4 fill-ghost_white rounded";
    case "outlined":
      return `bg-eerie_black border-2 px-5 py-4 rounded ${outlinedDisabled}`;
    case "outlined-small":
      return "bg-eerie_black outline-arsenic outline outline-2 outline-offset-0 hover:outline-offset-[3px] focus:outline-offset-[3px] hover:outline-apple focus:outline-apple md:px-5 md:py-3 transition-all ease-in-out duration-300 hover:text-eerie_black focus:text-eerie_black hover:bg-apple focus:bg-apple hover:fill-eerie_black active:outline-offset-0 focus:fill-eerie_black text-cool_grey fill-cool_grey px-4 py-2 rounded flex items-center justify-center";
    case "icon-border":
      return `bg-eerie_black border-2 px-3 py-3 rounded ${iconBorderDisabled}`;
    case "icon-border-small":
      return "h-12 w-12 bg-eerie_black fill-apple border border-arsenic rounded flex items-center justify-center";
    case "icon":
      return "px-3 py-3 fill-ghost_white rounded hover:bg-arsenic";
    case "icon-small":
      return "fill-ghost_white";
    case "close":
      return "rounded-full fill-sunset_orange border-2 border-sunset_orange h-10 w-10";
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
      className={`flex items-center justify-center gap-2 ${variantValue} ${style}`}
    >
      {variant !== "icon" &&
        variant !== "icon-border" &&
        variant !== "icon-border-small" &&
        variant !== "close" && <h4>{name}</h4>}
      {iconValue}
    </button>
  );
};

export default ActionButton;
