import React from "react";

// Full = 1 hour
// Half = 30 minutes

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
    <li className="bg-onyx">
      <section className="flex h-week_grid_hours flex-col">
        <button
          value={fullValue}
          data-date={dateValue}
          aria-label={fullLabel}
          onClick={fullToggle}
          className="text-co h-week_grid_cells border-b border-dashed border-davys_grey outline-1 outline-transparent transition duration-400 ease-in-out hover:bg-davys_grey focus-visible:bg-davys_grey focus-visible:outline-rajah"
        ></button>
        <button
          value={halfValue}
          data-date={dateValue}
          aria-label={halfLabel}
          onClick={halfToggle}
          className="h-week_grid_cells outline-1 outline-transparent transition duration-400 ease-in-out hover:bg-davys_grey focus-visible:bg-davys_grey focus-visible:outline-rajah"
        ></button>
      </section>
    </li>
  );
};

export default HourCell;
