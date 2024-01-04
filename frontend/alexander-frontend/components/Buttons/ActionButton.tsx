import AddIcon from "@/components/Icons/AddIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import ReplaceIcon from "@/components/Icons/ReplaceIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DownArrowIcon from "../Icons/DownArrowIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import SettingsListIcon from "../Icons/SettingsList";
import InventoryIcon from "../Icons/InventoryIcon";
import TemplateIcon from "../Icons/TemplateIcon";
import MenuIcon from "../Icons/MenuIcon";
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
    case "upload":
      return <UploadIcon />;
    case "settings":
      return <SettingsIcon />;
    case "settingsList":
      return <SettingsListIcon />;
    case "inventory":
      return <InventoryIcon />;
    case "template":
      return <TemplateIcon variant="outlined" />;
    case "menu":
      return <MenuIcon variant="outlined" />;
    case "erase":
      return <EraseIcon />;
    default:
      return null;
  }
};

const variants = (variant: string) => {
  switch (variant) {
    case "filled":
      return "bg-arsenic border-transparent border-2 px-5 py-3 fill-ghost_white rounded";
    case "outlined":
      return "border-arsenic bg-eerie_black border-2 px-5 py-3 fill-ghost_white rounded hover:bg-arsenic";
    case "icon-border":
      return "border-arsenic bg-eerie_black border-2 px-3 py-3 fill-ghost_white rounded hover:bg-arsenic";
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
  toggle?: () => void;
};

const ActionButton = ({
  style = "",
  icon = "",
  variant = "",
  label = "",
  name = "",
  toggle = () => {},
  title = "",
}: ActionButtonsProps) => {
  const iconValue = icons(icon);
  const variantValue = variants(variant);

  return (
    <button
      title={title}
      onClick={toggle}
      aria-label={label}
      className={`flex items-center justify-center gap-2 text-ghost_white ${variantValue} ${style}`}
    >
      {variant !== "icon" && variant !== "icon-border" && <h4>{name}</h4>}
      {iconValue}
    </button>
  );
};

export default ActionButton;
