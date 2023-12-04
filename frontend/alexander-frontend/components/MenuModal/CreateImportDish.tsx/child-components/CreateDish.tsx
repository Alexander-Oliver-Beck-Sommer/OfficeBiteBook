import AddIcon from "@/components/Icons/AddIcon";

type CreateDishProps = {
  label: string; // Required. Write what purpose/role the component serves.
  toggle: () => void; // Optional. Toggle that makes the component able to run and execute onClick-related events.
};

const CreateDish = ({ label, toggle }: CreateDishProps) => {
  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="flex flex-col items-center justify-center gap-5 rounded border-2 border-davys_grey bg-dark_gunmetal fill-cool_grey px-20 py-35 text-cool_grey"
    >
      <h2>Create Dish</h2>
      <p>Create a new dish from scratch</p>
      <AddIcon className="h-50 w-50" />
    </button>
  );
};

export default CreateDish;
