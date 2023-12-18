import ActionButton from "@/components/Buttons/ActionButton";

const SettingsCell = () => {
  return (
    <section className="flex h-12 w-full items-center justify-center bg-raisin_black fill-ghost_white px-4 border-t border-t-arsenic border-b border-b-arsenic">
      <ActionButton
        icon="settings"
        style="w-full justify-between"
        label="Click to open settings"
        name="Settings"
      />
    </section>
  );
};

export default SettingsCell;
