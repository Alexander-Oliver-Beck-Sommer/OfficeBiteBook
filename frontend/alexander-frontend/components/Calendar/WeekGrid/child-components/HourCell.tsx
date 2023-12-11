type HourCellProps = {
  dateValue: string;
  fullValue: string;
  fullLabel: string;
  halfValue: string;
  halfLabel: string;
  fullToggle: () => void;
  halfToggle: () => void;
};

const HourCell = ({
  isVisible,
  dateValue,
  fullValue,
  fullLabel,
  halfValue,
  halfLabel,
  fullToggle,
  halfToggle,
}: HourCellProps) => {
  return (
    <li className={`${isVisible ? "bg-dark_charcoal" : "bg-raisin_black"}`}>
      <section className="grid h-24 grid-rows-2">
        <button
          value={fullValue}
          data-date={dateValue}
          aria-label={fullLabel}
          onClick={fullToggle}
          className="border-b border-dashed border-arsenic outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
        ></button>
        <button
          value={halfValue}
          data-date={dateValue}
          aria-label={halfLabel}
          onClick={halfToggle}
          className="outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-arsenic focus-visible:bg-arsenic focus-visible:outline-true_blue"
        ></button>
      </section>
    </li>
  );
};

export default HourCell;
