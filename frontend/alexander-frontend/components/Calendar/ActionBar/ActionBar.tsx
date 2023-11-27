import VisibilityFlipper from "./child-components/VisibilityFlipper"; // Mass-action component for flipping the visibility on all days in the calendar between "visible" and "hidden"
import WeekLocker from "./child-components/WeekLocker"; // Mass-action component that locks/unlocks the current week, switching all of the days to "locked" or "unlocked"
import WeekClearer from "./child-components/WeekClearer"; // Mass-action component that clears the current week, removing all added menu items from the calendar

export default function ActionBar() {
  return (
    <section className="flex">
      <section className="w-sidebar_width bg-dark_gunmetal"></section>
      <section
        role="toolbar"
        aria-label="Calendar Mass Actions"
        className="flex items-center justify-start gap-25 border-b border-davys_grey px-35 py-20"
      >
        <VisibilityFlipper />
        <WeekLocker />
        <WeekClearer />
      </section>
    </section>
  );
}
