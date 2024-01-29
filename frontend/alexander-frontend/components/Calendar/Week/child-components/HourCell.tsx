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
        className="border-dark-500 hover:bg-dark-500 focus-visible:bg-dark-500 focus-visible:outline-primary h-10 cursor-default border-b border-dashed outline-1 outline-transparent transition duration-300 ease-in-out"
      ></button>
      <button
        value={hourCellHalfValue}
        data-date={hourCellDate}
        aria-label={hourCellHalfLabel}
        onClick={hourCellHalfToggle}
        className="border-dark-500 hover:bg-dark-500 focus-visible:bg-dark-500 focus-visible:outline-primary h-10 cursor-default border-b outline-1 outline-transparent transition duration-300 ease-in-out"
      ></button>
    </>
  );
};

export default HourCell;
