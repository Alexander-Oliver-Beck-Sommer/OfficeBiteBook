import ActionButton from "@/components/Buttons/ActionButton";

const OptionsCell = () => {
  return (
    <section className="flex h-12 w-full items-center justify-center bg-raisin_black fill-ghost_white px-4">
      <ActionButton
        icon="settings"
        style="w-full justify-between"
        label="Click to open settings"
        name="Settings"
      />
    </section>
  );
};

export default OptionsCell;
