import ToggleInput from "@/components/Inputs/ToggleInput";

type SettingsCellProps = {
  publishToggle?: () => void;
  publishedValue?: boolean;
};

const SettingsCell = ({
  publishToggle = () => {},
  publishedValue = false,
}: SettingsCellProps) => {
  return (
    <section className="flex h-12 w-full items-center justify-between border-t border-t-dark-500 bg-dark-300 px-4">
      <ToggleInput
        label="Toggle the day to be either visible, or private."
        onChange={publishToggle}
        initialValue={publishedValue}
      />
    </section>
  );
};

export default SettingsCell;
