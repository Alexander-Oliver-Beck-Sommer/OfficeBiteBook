import React from "react";
import IconButton from "../IconButton";

interface DepartmentProps {
  /** Count of how many departments the user is apart of. */
  amountOfDepartments?: number;
}

const Header: React.FC<DepartmentProps> = ({ amountOfDepartments = 0 }) => {
  return (
    <header className="flex rounded-full border border-dark-200">
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <h4>
            Showing:{" "}
            <span className="font-normal text-grey">
              {amountOfDepartments} departments
            </span>
          </h4>
          <div className="flex gap-2.5">
            <IconButton
              title="Filter departments"
              icon="filter"
              label="Filter departments"
              size="small"
            />
            <IconButton
              title="Sort by alphabetical order"
              icon="alphabet-ascending"
              label="Sort by alphabetical order"
              size="small"
            />
          </div>
        </div>

        <input
          type="search"
          className="w-full rounded border-2 border-dark-500 bg-dark-100"
        />
      </div>
    </header>
  );
};

export default Header;
