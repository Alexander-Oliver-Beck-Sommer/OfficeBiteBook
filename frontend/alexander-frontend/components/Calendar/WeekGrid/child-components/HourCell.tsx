type HourCellProps = {
  hourCellDate?: string;
  hourCellFullValue?: string;
  hourCellFullLabel?: string;
  hourCellHalfValue?: string;
  hourCellHalfLabel?: string;
  hourCellFullToggle?: () => void;
  hourCellHalfToggle?: () => void;
};

const HourCell = ({
  hourCellDate = "",
  hourCellFullValue = "",
  hourCellFullLabel = "",
  hourCellHalfValue = "",
  hourCellHalfLabel = "",
  hourCellFullToggle = () => {},
  hourCellHalfToggle = () => {},
}: HourCellProps) => {
  return (
    <>
      <button
        value={hourCellFullValue}
        data-date={hourCellDate}
        aria-label={hourCellFullLabel}
        onClick={hourCellFullToggle}
        className="h-12 cursor-default border-b border-dashed border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-apple"
      ></button>
      <button
        value={hourCellHalfValue}
        data-date={hourCellDate}
        aria-label={hourCellHalfLabel}
        onClick={hourCellHalfToggle}
        className="h-12 cursor-default border-b border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-apple"
      ></button>
    </>
  );
};

export default HourCell;
