"use client";
import React from "react";
import useDepartment from "./useDepartment";
import Header from "./Header";

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
      <div className="w-full max-w-screen-xl">
        <Header amountOfDepartments={departments.length} />
      </div>
    </section>
  );
};

export default Department;
