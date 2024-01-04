import ActionButton from "@/components/Buttons/ActionButton";

const SettingsCell = () => {
  return (
    <section className="flex h-12 w-full items-center justify-center border-b border-t border-b-arsenic border-t-arsenic bg-raisin_black fill-ghost_white px-4">
      <ActionButton
        icon="settingsList"
        style="w-full justify-between"
        label="Click to open settings"
        name="Settings"
      />
    </section>
  );
};

export default SettingsCell;
