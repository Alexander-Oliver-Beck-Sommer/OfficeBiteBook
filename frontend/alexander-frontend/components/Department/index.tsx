"use client";
import React from "react";
import useDepartment from "./useDepartment";
import Header from "./Header";
import DepartmentCard from "./DepartmentCard";

interface DepartmentProps {
  /** Email that belongs to the logged-in user. */
  userEmail?: string;
  /** UUID that belongs to the logged-in user. */
  userId?: string;
}

const Department: React.FC<DepartmentProps> = ({ userEmail, userId }) => {
  const { departments } = useDepartment(userEmail, userId);

  return (
    <section className="fill-body pattern flex justify-center p-5 md:px-10">
      <div className="flex w-full max-w-screen-xl flex-col gap-5">
        <Header amountOfDepartments={departments.length} />
        {departments.length > 0 ? (
          <ul className="grid gap-5 border border-dark-300">
            {departments.map((department) => (
              <DepartmentCard
                key={department.department_id}
                department={department}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-5">
            <h1 className="text-4xl">ಥ_ಥ</h1>
            <div className="text-center">
              <h4>No Departments Found</h4>
              <p className="text-sm text-grey">
                Want to change that? Feel free to create a new department or ask
                to become apart of one 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Department;
