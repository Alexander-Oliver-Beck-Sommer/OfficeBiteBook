import LockIcon from "@/components/Icons/LockIcon";

type DayCellProps = {
  day?: string;
  date?: number;
  toggle?: () => void;
  isCurrentDay: boolean;
};

const DayCell = ({
  day = "",
  date,
  toggle = () => {},
  isCurrentDay,
}: DayCellProps) => {
  const style = isCurrentDay ? "border-apple" : "border-transparent";

  return (
    <section
      className={`flex h-20 w-full items-center justify-between border-t-4 bg-raisin_black px-4 ${style}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="leading-none">{date}</h2>
        <h5>{day}</h5>
      </div>
      <button onClick={toggle}>
        <LockIcon className="h-6 w-6 fill-ghost_white" variant="outlined" />
      </button>
    </section>
  );
};

export default DayCell;
