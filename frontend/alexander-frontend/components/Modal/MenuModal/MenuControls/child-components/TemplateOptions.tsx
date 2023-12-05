import AddIcon from "@/components/Icons/AddIcon";
import DownArrowIcon from "@/components/Icons/DownArrowIcon";

const TemplateOptions = () => {
  return (
    <section className="flex items-center gap-25">
      <button className="flex items-center gap-8">
        <p className="text-cool_grey">
          Select{" "}
          <span className="font-semibold text-ghost_white">Template</span>
        </p>
        <DownArrowIcon className="fill-rajah" />
      </button>
      <button className="flex items-center gap-8">
        <p className="text-cool_grey">
          Save <span className="font-semibold text-ghost_white">Template</span>
        </p>
        <AddIcon className="fill-rajah" variant="disabled" />
      </button>
    </section>
  );
};

export default TemplateOptions;
