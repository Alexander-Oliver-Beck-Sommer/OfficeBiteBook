type HourCellProps = {
  dateValue?: string;
  fullValue?: string;
  fullLabel?: string;
  halfValue?: string;
  halfLabel?: string;
  fullToggle?: () => void;
  halfToggle?: () => void;
};

const HourCell = ({
  dateValue = "",
  fullValue = "",
  fullLabel = "",
  halfValue = "",
  halfLabel = "",
  fullToggle = () => {},
  halfToggle = () => {},
}: HourCellProps) => {
  return (
    <>
      <button
        value={fullValue}
        data-date={dateValue}
        aria-label={fullLabel}
        onClick={fullToggle}
        className="h-12 border-b border-dashed border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      ></button>
      <button
        value={halfValue}
        data-date={dateValue}
        aria-label={halfLabel}
        onClick={halfToggle}
        className="h-12 outline-1 outline-transparent border-b border-arsenic transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      ></button>
    </>
  );
};

export default HourCell;
