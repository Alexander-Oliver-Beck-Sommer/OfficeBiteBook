import React from "react";
import IconButton from "../IconButton";

interface DepartmentProps {
  /** Count of how many departments the user is apart of. */
  amountOfDepartments?: number;
  /** Function to toggle the filter. */
  filterToggle?: () => void;
  /** Function to toggle the sort. */
  sortToggle?: () => void;
}

const Header: React.FC<DepartmentProps> = ({
  amountOfDepartments = 0,
  filterToggle = () => {},
  sortToggle = () => {},
}) => {
  return (
    <header className="flex rounded-full border-dark-500 md:border-2 md:bg-dark-100 md:px-5 md:py-1.5 lg:py-0">
      <div className="flex w-full items-center justify-between">
        <h4>
          Showing:{" "}
          <span className="font-normal text-grey">
            {amountOfDepartments} departments
          </span>
        </h4>
        <div className="flex gap-2.5 md:gap-1">
          <IconButton
            className="md:rounded-full md:border-0 md:hover:bg-transparent md:hover:fill-white md:focus-visible:bg-transparent md:focus-visible:fill-white"
            title="Filter departments"
            icon="filter"
            label="Filter departments"
            size="responsive"
            toggle={filterToggle}
          />
          <IconButton
            className="md:rounded-full md:border-0 md:hover:bg-transparent md:hover:fill-white md:focus-visible:bg-transparent md:focus-visible:fill-white"
            title="Sort by alphabetical order"
            icon="alphabet-ascending"
            label="Sort by alphabetical order"
            size="responsive"
            toggle={sortToggle}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
