import VisibilityFlipper from "./child-components/VisibilityFlipper";
import WeekLocker from "./child-components/WeekLocker";
import WeekClearer from "./child-components/WeekClearer";

export default function ActionBar() {
  return (
    <section className="grid grid-cols-autoX1">
      <section className="bg-eerie_black w-sidebar_width"></section>
      <section
        role="toolbar"
        aria-label="Calendar Mass Actions"
        className="gap-6 px-9 border-arsenic flex w-full items-center justify-start border-b py-5"
      >
        <VisibilityFlipper />
        <WeekLocker />
        <WeekClearer />
      </section>
    </section>
  );
}
