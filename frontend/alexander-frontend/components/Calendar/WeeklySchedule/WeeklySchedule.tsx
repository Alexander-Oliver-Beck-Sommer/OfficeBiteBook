import Sidebar from "./child-components/Sidebar";
import WeekGrid from "./child-components/WeekGrid";

export default function WeeklySchedule() {
  return (
    <section className="grid grid-cols-2">
      <Sidebar />
      <WeekGrid />
    </section>
  );
}
