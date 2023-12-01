import CreateDish from "./child-components/CreateDish";
import ImportDish from "./child-components/ImportDish";

const CreateImportDish = () => {
  return (
    <section className="grid grid-cols-2 gap-25">
      <CreateDish />
      <ImportDish />
    </section>
  );
};

export default CreateImportDish;
