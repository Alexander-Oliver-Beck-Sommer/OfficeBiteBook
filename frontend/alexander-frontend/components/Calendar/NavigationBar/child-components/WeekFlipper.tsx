import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

type WeekFlipperProps = {
  weekFlipperBackward: () => void;
  weekFlipperCurrentWeek: number;
  weekFlipperForward: () => void;
};

export default function WeekFlipper({
  weekFlipperBackward,
  weekFlipperCurrentWeek,
  weekFlipperForward,
}: WeekFlipperProps) {
  return (
    <ul className="flex items-center gap-1">
      <li className="flex items-center">
        <button aria-label="Go 1 week back" onClick={weekFlipperBackward}>
          <LeftArrowIcon className="h-6 w-6 fill-apple" />
        </button>
      </li>
      <li className="flex items-center justify-center gap-1">
        <p className="font-normal">Week</p>
        <h4 className="w-5 text-center font-semibold">
          {weekFlipperCurrentWeek}
        </h4>
      </li>
      <li className="flex items-center">
        <button aria-label="Go 1 week forward" onClick={weekFlipperForward}>
          <RightArrowIcon className="h-6 w-6 fill-apple" />
        </button>
      </li>
    </ul>
  );
}
