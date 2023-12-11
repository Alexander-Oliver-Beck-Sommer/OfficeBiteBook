import ToggleInput from "@/components/Inputs/ToggleInput";

type VisibilityCellProps = {
  toggle: () => void;
};

const VisibilityCell = ({ toggle }: VisibilityCellProps) => {
  return (
    <section className="flex h-14 w-full items-center justify-between bg-raisin_black px-4">
      <ToggleInput
        label="Toggle the day to be either visible, or private."
        toggle={toggle}
        trueValue="Visible"
        falseValue="Private"
      />
    </section>
  );
};

export default VisibilityCell;
