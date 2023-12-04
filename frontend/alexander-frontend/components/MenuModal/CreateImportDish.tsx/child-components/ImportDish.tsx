import HamburgerButton from "@/components/Buttons/HamburgerButton";
import InventoryIcon from "@/components/Icons/InventoryIcon";

type ImportDishProps = {
  label: string; // Required. Write what purpose/role the component serves.
  toggle: () => void; // Optional. Toggle that makes the component able to run and execute onClick-related events.
};

const ImportDish = ({ label, toggle }: ImportDishProps) => {
  if (!label) {
    throw new Error(
      "Please describe what the HamburgerButton component does: label={'Open and close navigation'}",
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="flex flex-col items-center justify-center gap-5 rounded border-2 border-davys_grey bg-dark_gunmetal fill-cool_grey px-20 py-35 text-cool_grey"
    >
      <h2>Import Dish</h2>
      <p>Import a pre-existing dish from the archive</p>
      <InventoryIcon className="h-50 w-50" />
    </button>
  );
};

export default ImportDish;
