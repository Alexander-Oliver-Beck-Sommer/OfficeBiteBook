import ToggleInput from "@/components/Inputs/ToggleInput";

type SettingsCellProps = {
  toggle?: () => void;
};

const SettingsCell = ({ toggle = () => {} }: SettingsCellProps) => {
  return (
    <section className="bg-dark-300 border-t-dark-500 flex h-12 w-full items-center justify-between border-t px-4">
      <ToggleInput
        label="Toggle the day to be either visible, or private."
        toggle={toggle}
        trueValue="Published"
        falseValue="Unpublished"
      />
    </section>
  );
};

export default SettingsCell;
