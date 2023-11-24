import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

export default function WeekFlipper() {
  return (
    <ul className="flex items-center gap-5">
      <li className="flex items-center">
        <button aria-label="Go 1 week back">
          <LeftArrowIcon className="h-35 w-35 fill-cool_grey" />
        </button>
      </li>
      <li className="flex items-center">
        <button>
          <h3>Week 37</h3>
        </button>
      </li>
      <li className="flex items-center">
        <button aria-label="Go 1 week forward">
          <RightArrowIcon className="h-35 w-35 fill-cool_grey" />
        </button>
      </li>
    </ul>
  );
}
