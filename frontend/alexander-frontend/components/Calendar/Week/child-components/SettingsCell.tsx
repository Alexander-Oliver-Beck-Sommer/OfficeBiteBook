import ToggleInput from "@/components/Inputs/ToggleInput";

type SettingsCellProps = {
  toggle?: () => void;
};

const SettingsCell = ({ toggle = () => {} }: SettingsCellProps) => {
  return (
    <section className="flex h-12 w-full items-center justify-between border-t border-t-arsenic bg-raisin_black px-4">
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