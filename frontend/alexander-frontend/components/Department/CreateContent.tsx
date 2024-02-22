import React from "react";
import InputField from "../InputField";
import TextButton from "../TextButton";

interface CreateContentProps {
  /** Function to submit the department. */
  submitToggle?: () => void;
  /** UUID for the department. */
  departmentId?: string;
}

const CreateContent: React.FC<CreateContentProps> = ({
  submitToggle = () => {},
  departmentId,
}) => {
  return (
    <form
      className="grid flex-1 grid-rows-1xauto overflow-hidden"
      data-department-id={departmentId}
    >
      <ul className="flex flex-col gap-5 overflow-y-auto p-5 md:px-10">
        <li>
          <InputField
            minLength={5}
            maxLength={50}
            required
            id="department-name"
            name="Name"
            label="Provide a name for the Department"
            placeholder="E.g. Frank's Diner"
          />
        </li>
        <li>
          <InputField
            minLength={10}
            maxLength={100}
            required
            id="department-description"
            name="Description"
            label="Provide a description for the Department"
            placeholder="E.g. A place to share menus."
            type="textarea"
          />
        </li>
        <li className="flex flex-col gap-3">
          <label htmlFor="department-status">
            <p className="text-sm text-grey md:text-base">Initial Status</p>
          </label>
          <select
            id="department-status"
            className="block w-full rounded border-2 border-dark-500 bg-dark-100 p-3 text-sm text-white outline-0 md:text-base"
          >
            <option defaultValue value="online">
              Online
            </option>
            <option value="paused">Paused</option>
            <option value="offline">Offline</option>
          </select>
        </li>
      </ul>
      <section className="flex justify-end bg-dark-300 p-5 md:px-10">
        <TextButton
          className="w-full md:w-fit"
          toggle={submitToggle}
          type="submit"
          label="Submit and create department"
          title="Submit and create department"
          text="Submit"
          icon="upload"
        >
          <h4>Create Department</h4>
        </TextButton>
      </section>
    </form>
  );
};

export default CreateContent;
