import LockIcon from "@/components/Icons/LockIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";

type DayCellProps = {
  dayCellDay?: string;
  dayCellDate?: number;
  toggle?: () => void;
  dayCellCurrent: boolean;
};

const DayCell = ({
  dayCellDay = "",
  dayCellDate,
  toggle = () => {},
  dayCellCurrent,
}: DayCellProps) => {
  const style = dayCellCurrent ? "border-apple" : "border-transparent";

  return (
    <section
      className={`flex h-20 w-full items-center justify-between border-t-4 bg-raisin_black px-4 ${style}`}
    >
      <div className="flex flex-col gap-2 ">
        <h2 className="leading-none">{dayCellDate}</h2>
        <h5>{dayCellDay}</h5>
      </div>
      <div className="flex gap-4">
        <button onClick={toggle}>
          <LockIcon className="h-6 w-6 fill-ghost_white" />
        </button>
        <button onClick={toggle}>
          <SettingsIcon className="h-6 w-6 fill-ghost_white" />
        </button>
      </div>
    </section>
  );
};

export default DayCell;
