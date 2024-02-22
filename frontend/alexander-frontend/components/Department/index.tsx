"use client";
import React from "react";
import useDepartment from "./useDepartment";
import Header from "./Header";
import DepartmentCard from "./DepartmentCard";
import ContentModal from "../ContentModal";
import TextButton from "../TextButton";
import Link from "next/link";

interface DepartmentProps {
  /** Email that belongs to the logged-in user. */
  userEmail?: string;
  /** UUID that belongs to the logged-in user. */
  userId?: string;
}

const Department: React.FC<DepartmentProps> = ({ userEmail, userId }) => {
  const {
    departments,
    visibility,
    loading,
    closeModal,
    departmentId,
    title,
    createDepartment,
    editDepartment,
    description,
    departmentStatus,
    owner,
    usersAmount,
  } = useDepartment(userEmail, userId);

  const statusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-primary";
      case "offline":
        return "bg-red";
      case "paused":
        return "bg-orange";
      default:
        return "bg-grey";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "paused":
        return "Paused";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <section className="fill-body pattern flex justify-center p-5 md:px-10">
        <div className="flex w-full max-w-screen-xl flex-col gap-8">
          <Header amountOfDepartments={departments.length} />
          {departments.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {departments.map((department) => (
                <DepartmentCard
                  key={department.department_id}
                  department={department}
                  settingsToggle={() => editDepartment(department)}
                />
              ))}
            </ul>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className=" flex animate-fade-up flex-col items-center gap-5 animate-ease-in-out">
                <h1 className="text-4xl">ಥ_ಥ</h1>
                <div className="text-center">
                  <h4>No Departments Found</h4>
                  <p className="text-sm text-grey">
                    Want to change that? Feel free to create a new department or
                    ask to become apart of one 🎉
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <ContentModal
        size="medium"
        visibility={visibility}
        toggle={closeModal}
        title={title}
        loading={loading}
      >
        <section className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 md:px-10">
          <ul className="flex grid-cols-2 flex-col gap-2.5 md:grid md:gap-5">
            <li className="grid-cols-20X80 grid items-center gap-2.5">
              <h5 className="md:text-base">Name:</h5>
              <p className="truncate text-sm text-grey md:text-base">{title}</p>
            </li>
            <li className="grid-cols-20X80 grid items-center gap-2.5">
              <h5 className="md:text-base">Status:</h5>
              <div className="flex items-center gap-1.5">
                <p className="text-sm capitalize text-grey md:text-base">
                  {departmentStatus}
                </p>
                <div
                  aria-label={statusLabel(departmentStatus)}
                  title={statusLabel(departmentStatus)}
                  className={`h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${statusColor(
                    departmentStatus,
                  )}`}
                ></div>
              </div>
            </li>
            <li className="grid-cols-20X80 grid items-center gap-2.5">
              <h5 className="md:text-base">Owner:</h5>
              <p className="truncate text-sm text-grey md:text-base">{owner}</p>
            </li>
            <li className="grid-cols-20X80 grid items-center gap-2.5">
              <h5 className="md:text-base">Users:</h5>
              <p className="truncate text-sm text-grey md:text-base">
                {usersAmount} Users
              </p>
            </li>
          </ul>
          <div className="h-0.5 rounded-full bg-dark-400"></div>
          <div className="flex flex-col gap-1.5">
            <h5 className="md:text-base">Description:</h5>
            <p className="text-sm text-grey md:text-base">{description}</p>
          </div>
          <ul className="flex flex-1 grid-cols-2 flex-col justify-end gap-5 md:grid md:items-end">
            <li>
              <button
                title={`Leave ${title}`}
                aria-label={`Leave ${title}`}
                className="flex w-full items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-red hover:bg-red hover:text-dark-100 focus-visible:border-red focus-visible:bg-red focus-visible:text-dark-100"
              >
                <h4>Leave Department</h4>
              </button>
            </li>
            <li>
              <Link
                href={`/department/${departmentId}`}
                title={`View ${title}`}
                aria-label={`View ${title}`}
                className="flex items-center justify-center rounded border-2 border-dark-500 bg-dark-100 px-5 py-3 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-dark-100"
              >
                <h4>View Department</h4>
              </Link>
            </li>
          </ul>
        </section>
      </ContentModal>
    </>
  );
};

export default Department;
