import data from "@/data/MenuModal.js";
import DishButton from "@/components/Buttons/DishButton";

type CreateImportProps = {
  createDish: () => void;
  importDish: () => void;
};

const CreateImport = ({ createDish, importDish }: CreateImportProps) => {
  return (
    <li className="grid grid-cols-2 gap-6">
      <DishButton
        icon="add"
        name={data.dish_buttons.create.name}
        desc={data.dish_buttons.create.desc}
        label={data.dish_buttons.create.label}
        toggle={createDish}
      />
      <DishButton
        icon="inventory"
        name={data.dish_buttons.import.name}
        desc={data.dish_buttons.import.desc}
        label={data.dish_buttons.import.label}
        toggle={importDish}
      />
    </li>
  );
};

export default CreateImport;
