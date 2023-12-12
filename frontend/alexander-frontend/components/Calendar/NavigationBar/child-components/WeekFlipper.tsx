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
    <ul className="flex items-center gap-1">
      <li className="flex items-center">
        <button aria-label="Go 1 week back" onClick={goBackOneWeek}>
          <LeftArrowIcon className="h-6 w-6 fill-true_blue" />
        </button>
      </li>
      <li className="flex items-center justify-center gap-1">
        <p className="font-normal">Week</p>
        <h4 className="w-5 text-center font-semibold">{currentWeek}</h4>
      </li>
      <li className="flex items-center">
        <button aria-label="Go 1 week forward" onClick={goForwardOneWeek}>
          <RightArrowIcon className="h-6 w-6 fill-true_blue" />
        </button>
      </li>
    </ul>
  );
}
