import CreateDish from "./child-components/CreateDish";
import ImportDish from "./child-components/ImportDish";

const CreateImportDish = () => {
  return (
    <section className="grid grid-cols-2 gap-25">
      <CreateDish label="Click to create a new dish from scratch" />
      <ImportDish label="Click to import a dish from the archive" />
    </section>
  );
};

export default CreateImportDish;
