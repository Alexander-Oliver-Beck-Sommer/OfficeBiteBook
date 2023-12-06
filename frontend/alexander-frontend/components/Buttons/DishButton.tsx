import AddIcon from "@/components/Icons/AddIcon";
import InventoryIcon from "../Icons/InventoryIcon";

const icons = (icon) => {
  switch (icon) {
    case "add":
      return <AddIcon className="h-12 w-12" />;
    case "inventory":
      return <InventoryIcon className="h-12 w-12" />;
    default:
      return null;
  }
};

type DishButtonProps = {
  icon: string;
  name: string;
  desc: string;
  label: string;
  toggle: () => void;
};

const DishButton = ({ icon, name, desc, label, toggle }: DishButtonProps) => {
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="gap-1 py-9 flex flex-col items-center justify-center rounded border-2 border-davys_grey bg-dark_gunmetal fill-cool_grey px-5 text-cool_grey"
    >
      <h2>{name}</h2>
      <p>{desc}</p>
      {iconValue}
    </button>
  );
};

export default DishButton;
