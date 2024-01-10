import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

type WeekFlipperProps = {
  weekFlipperBackward: () => void;
  weekFlipperCurrentWeek: number;
  weekFlipperForward: () => void;
};

export default function WeekFlipper({
  weekFlipperBackward = () => {},
  weekFlipperCurrentWeek = 0,
  weekFlipperForward = () => {},
}: WeekFlipperProps) {
  const weekNumber = weekFlipperCurrentWeek.toString().padStart(2, "0");

  return (
    <ul className="flex items-center gap-1">
      <li className="flex items-center">
        <button
          aria-label="Regress 1 week"
          title="Regress 1 week"
          onClick={weekFlipperBackward}
        >
          <LeftArrowIcon className="h-6 fill-apple" />
        </button>
      </li>
      <li className="flex items-center justify-center gap-1">
        <p className="font-normal uppercase text-cool_grey">Week</p>
        <p className="w-5 font-semibold text-ghost_white">{weekNumber}</p>
      </li>
      <li className="flex items-center">
        <button
          aria-label="Forward 1 week"
          title="Forward 1 week"
          onClick={weekFlipperForward}
        >
          <RightArrowIcon className="h-6 fill-apple" />
        </button>
      </li>
    </ul>
  );
}
