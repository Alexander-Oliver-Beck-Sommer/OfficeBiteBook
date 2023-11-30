import DeleteIcon from "@/components/Icons/DeleteIcon";
import MinusIcon from "@/components/Icons/MinusIcon";

const RemoveOptions = () => {
  return (
    <section className="flex items-center gap-25">
      <button className="flex items-center gap-8">
        <p className="text-cool_grey">
          Clear <span className="font-semibold text-ghost_white">Menu</span>
        </p>
        <MinusIcon className="fill-sunset_orange" variant="disabled" />
      </button>
      <button className="flex items-center gap-8">
        <p className="text-cool_grey">
          Delete <span className="font-semibold text-ghost_white">Menu</span>
        </p>
        <DeleteIcon className="fill-sunset_orange" />
      </button>
    </section>
  );
};

export default RemoveOptions;
