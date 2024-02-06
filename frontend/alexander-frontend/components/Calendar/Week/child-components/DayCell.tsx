import LockIcon from "@/components/Icons/LockIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";

type DayCellProps = {
  day?: string;
  date?: number;
  dayCellLock?: () => void;
  dayCellSettings?: () => void;
  currentDay: boolean;
};

const DayCell = ({
  day = "",
  date = 0,
  dayCellLock = () => {},
  dayCellSettings = () => {},
  currentDay = false,
}: DayCellProps) => {
  const currentDateStyling = currentDay
    ? "border-primary"
    : "border-transparent";

  return (
    <section
      className={`flex h-[70px] w-full items-center justify-between border-t-4 bg-dark-300 px-4 ${currentDateStyling}`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-bold">{date}</h3>
        <h5 className="text-grey">{day}</h5>
      </div>
      <div className="flex items-center gap-4 fill-white">
        <button onClick={dayCellLock}>
          <LockIcon />
        </button>
      </div>
    </section>
  );
};

export default DayCell;
