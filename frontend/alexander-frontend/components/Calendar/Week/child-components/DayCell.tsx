import LockIcon from "@/components/Icons/LockIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";

type DayCellProps = {
  dayCellDay?: string;
  dayCellDate?: number;
  dayCellLock?: () => void;
  dayCellSettings?: () => void;
  dayCellCurrent: boolean;
};

const DayCell = ({
  dayCellDay = "",
  dayCellDate = 0,
  dayCellLock = () => {},
  dayCellSettings = () => {},
  dayCellCurrent = false,
}: DayCellProps) => {
  const currentDateStyling = dayCellCurrent
    ? "border-apple"
    : "border-transparent";

  return (
    <section
      className={`flex h-[70px] w-full items-center justify-between border-t-4 bg-raisin_black px-4 ${currentDateStyling}`}
    >
      <div className="flex flex-col gap-[6px]">
        <h3 className="font-semibold leading-none">{dayCellDate}</h3>
        <h5 className="font-normal">{dayCellDay}</h5>
      </div>
      <div className="flex gap-4">
        <button onClick={dayCellLock}>
          <LockIcon className="h-6 w-6 fill-ghost_white" />
        </button>
        <button onClick={dayCellSettings}>
          <SettingsIcon className="h-6 w-6 fill-ghost_white" />
        </button>
      </div>
    </section>
  );
};

export default DayCell;
