type HourCellProps = {
  dateValue?: string;
  fullValue?: string;
  fullLabel?: string;
  fullCard?: boolean;
  halfValue?: string;
  halfLabel?: string;
  halfCard?: boolean;
  fullToggle?: () => void;
  halfToggle?: () => void;
};

const HourCell = ({
  dateValue = "",
  fullValue = "",
  fullLabel = "",
  fullCard = false,
  halfValue = "",
  halfLabel = "",
  halfCard = false,
  fullToggle = () => {},
  halfToggle = () => {},
}: HourCellProps) => {
  return (
    <li className="grid h-24 grid-rows-2 border-t border-t-arsenic bg-dark_charcoal">
      <button
        value={fullValue}
        data-date={dateValue}
        aria-label={fullLabel}
        onClick={fullToggle}
        className="relative h-12 border-b border-dashed border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      >
        {fullCard && (
          <div className="absolute bottom-[-1px] left-0 top-[-1px] w-11/12 border-l-4 border-l-true_blue bg-eerie_black" />
        )}
      </button>
      <button
        value={halfValue}
        data-date={dateValue}
        aria-label={halfLabel}
        onClick={halfToggle}
        className="relative h-12 outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
      >
        {halfCard && (
          <div className="absolute bottom-[-1px] left-0 top-[-1px] w-11/12 border-l-4 border-l-true_blue bg-eerie_black" />
        )}
      </button>
    </li>
  );
};

export default HourCell;
