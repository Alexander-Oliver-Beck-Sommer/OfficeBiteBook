import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import ReplaceIcon from "@/components/Icons/ReplaceIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import InventoryIcon from "@/components/Icons/InventoryIcon";
import EraseIcon from "@/components/Icons/EraseIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import InfoIcon from "@/components/Icons/InfoIcon";
import SaveIcon from "@/components/Icons/SaveIcon";

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
      return <ArrowIcon variant="down" />;
    case "inventory":
      return <InventoryIcon />;
    case "erase":
      return <EraseIcon />;
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
    ? "fill-dark-500 text-dark-500 border-dark-400"
    : "fill-white text-white border-dark-500 hover:bg-dark-500";
  const iconBorderDisabled = isDisabled
    ? "fill-dark-500 border-dark-400"
    : "fill-white border-dark-500 hover:bg-dark-500";

  switch (variant) {
    case "filled":
      return "bg-dark-500 border-transparent border-2 px-5 py-4 fill-white rounded";
    case "outlined":
      return `bg-dark-100 border-2 px-5 py-3 rounded ${outlinedDisabled}`;
    case "outlined-small":
      return "bg-dark-100 outline-dark-500 outline outline-2 outline-offset-0 hover:outline-offset-[3px] focus:outline-offset-[3px] hover:outline-primary focus:outline-primary md:px-5 md:py-3 transition-all ease-in-out duration-300 hover:text-dark-100 focus:text-dark-100 hover:bg-primary focus:bg-primary hover:fill-dark-100 active:outline-offset-0 focus:fill-dark-100 text-grey fill-grey px-4 py-2 rounded flex items-center justify-center";
    case "icon-border":
      return `bg-dark-100 border-2 px-3 py-3 rounded ${iconBorderDisabled}`;
    case "icon-border-small":
      return "h-12 w-12 bg-dark-100 fill-primary border border-dark-500 rounded flex items-center justify-center";
    case "icon":
      return "px-3 py-3 fill-white rounded hover:bg-dark-500";
    case "icon-small":
      return "fill-white";
    case "close":
      return "rounded-full fill-red border-2 border-red h-10 w-10";
    default:
      return "fill-grey outline-offset-4";
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
