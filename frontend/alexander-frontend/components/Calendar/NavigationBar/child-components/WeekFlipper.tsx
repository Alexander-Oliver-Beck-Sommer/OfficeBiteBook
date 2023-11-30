import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

export default function WeekFlipper({
  setCurrentDate,
  currentDate,
  currentWeek,
}) {
  const goBackOneWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const goForwardOneWeek = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  return (
    <ul className="flex items-center gap-5">
      <li className="flex items-center">
        <button aria-label="Go 1 week back" onClick={goBackOneWeek}>
          <LeftArrowIcon className="h-35 w-35 fill-rajah" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h3 className="font-normal">Week</h3>
          <h3>{currentWeek}</h3>
        </button>
      </li>
      <li className="flex items-center">
        <button aria-label="Go 1 week forward" onClick={goForwardOneWeek}>
          <RightArrowIcon className="h-35 w-35 fill-rajah" />
        </button>
      </li>
    </ul>
  );
}
