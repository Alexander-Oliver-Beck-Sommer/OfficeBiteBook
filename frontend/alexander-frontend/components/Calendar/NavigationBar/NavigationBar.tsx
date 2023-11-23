import WeekFlipper from "./child-components/WeekFlipper"; // Component for flipping between weeks
import MonthFlipper from "./child-components/MonthFlipper"; // Component for flipping between months
import WeekHighlighter from "./child-components/WeekHighlighter"; // Component for showcasing the current IRL week

export default function NavigationBar() {
  return (
    <section
      role="toolbar"
      aria-label="Week and Month View Actions"
      className="flex items-center justify-start border-b border-davys_grey px-25 py-20"
    >
      <ul className="flex items-center justify-start gap-25">
        <li>
          <WeekFlipper />
        </li>
        <li>
          <MonthFlipper />
        </li>
        <li>
          <WeekHighlighter />
        </li>
      </ul>
    </section>
  );
}
