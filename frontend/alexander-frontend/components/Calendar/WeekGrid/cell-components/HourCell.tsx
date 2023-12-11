type HourCellProps = {
  fullValue: string;
  fullLabel: string;
  fullToggle: () => void;
  halfValue: string;
  halfLabel: string;
  halfToggle: () => void;
  dateValue: string;
};

const HourCell = ({
  fullValue,
  fullLabel,
  fullToggle,
  halfValue,
  halfLabel,
  halfToggle,
  dateValue,
}: HourCellProps) => {
  return (
    <li className="bg-dark_charcoal">
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
