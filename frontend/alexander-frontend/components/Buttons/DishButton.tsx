import AddIcon from "@/components/Icons/AddIcon";
import InventoryIcon from "../Icons/InventoryIcon";

const icons = (icon) => {
  switch (icon) {
    case "add":
      return <AddIcon className="h-48 w-48" />;
    case "inventory":
      return <InventoryIcon className="h-48 w-48" />;
    default:
      return null;
  }
};

type DishButtonProps = {
  icon: string; // Choose which icon to display.
  name: string; // Provide a name for the button.
  desc: string; // Provide a description for the button.
  label: string; // Describe what the button does.
  toggle: () => void; // Provide a function to toggle the button.
};

const DishButton = ({ icon, name, desc, label, toggle }: DishButtonProps) => {
  const iconValue = icons(icon);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="flex flex-col items-center justify-center gap-5 rounded border-2 border-davys_grey bg-dark_gunmetal fill-cool_grey px-20 py-35 text-cool_grey"
    >
      <h2>{name}</h2>
      <p>{desc}</p>
      {iconValue}
    </button>
  );
};

export default DishButton;
