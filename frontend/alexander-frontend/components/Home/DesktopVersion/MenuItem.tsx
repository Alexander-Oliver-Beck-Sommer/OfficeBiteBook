import ListIconItem from "@/components/Home/DesktopVersion/ListIconItem";
import CheckboxInput from "@/components/Inputs/CheckboxInput";

type MenuItemProps = {
  checkboxToggle?: (checked: boolean) => void;
};

const MenuItem = ({ checkboxToggle }: MenuItemProps) => {
  return (
    <section className="grid grid-cols-autoX1 items-center gap-3">
      <div className="grid grid-cols-2 gap-3">
        <CheckboxInput
          label="Select All"
          initialChecked={false}
          onChange={checkboxToggle}
          className="h-5 w-5"
        />
        <div className="hidden h-8 w-8 xl:block"></div>
      </div>
      <ul className="grid grid-cols-5 gap-3">
        <ListIconItem text="Title" icon="title" />
        <ListIconItem text="Location" icon="location" />
        <ListIconItem text="Date" icon="date" />
        <ListIconItem text="Hours" icon="time" />
        <ListIconItem text="Dishes" icon="restaurant" />
      </ul>
    </section>
  );
};

export default MenuItem;
