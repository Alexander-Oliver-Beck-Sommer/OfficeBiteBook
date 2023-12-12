import data from "@/data/MenuModal.js";
import DishButton from "@/components/Buttons/DishButton";
import ActionButton from "@/components/Buttons/ActionButton";

type CreateImportProps = {
  createDish: () => void;
  importDish: () => void;
};

const CreateImport = ({ createDish, importDish }: CreateImportProps) => {
  return (
    <>
      <ActionButton
        icon="add"
        name="Add"
        variant="icon"
        name="Add"
        label={data.menu_buttons.accept.label}
        toggle={createDish}
      />
      <ActionButton
        icon="inventory"
        name="Import"
        variant="icon"
        name="Import"
        label={data.menu_buttons.cancel.label}
        toggle={importDish}
      />
    </>
  );
};

export default CreateImport;
