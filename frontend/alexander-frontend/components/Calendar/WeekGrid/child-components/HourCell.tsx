type HourCellProps = {
  hourCellDateValue?: string;
  hourCellFullValue?: string;
  hourCellFullLabel?: string;
  hourCellHalfValue?: string;
  hourCellHalfLabel?: string;
  hourCellFullToggle?: () => void;
  hourCellHalfToggle?: () => void;
};

const HourCell = ({
  hourCellDateValue = "",
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
        data-date={hourCellDateValue}
        aria-label={hourCellFullLabel}
        onClick={hourCellFullToggle}
        className="h-12 border-b border-dashed border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      ></button>
      <button
        value={hourCellHalfValue}
        data-date={hourCellDateValue}
        aria-label={hourCellHalfLabel}
        onClick={hourCellHalfToggle}
        className="h-12 border-b border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      ></button>
    </>
  );
};

export default HourCell;
