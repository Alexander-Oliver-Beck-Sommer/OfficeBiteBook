import VisibilityFlipper from "./child-components/VisibilityFlipper";
import WeekLocker from "./child-components/WeekLocker";
import WeekClearer from "./child-components/WeekClearer";

export default function ActionBar() {
  return (
    <section className="grid grid-cols-autoX1">
      <section className="w-sidebar_width bg-dark_gunmetal"></section>
      <section
        role="toolbar"
        aria-label="Calendar Mass Actions"
        className="flex w-full items-center justify-start gap-6 border-b border-davys_grey px-9 py-5"
      >
        <VisibilityFlipper />
        <WeekLocker />
        <WeekClearer />
      </section>
    </section>
  );
}
