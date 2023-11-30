type EditableTitleProps = {
  ariaLabel: string; // Required. Write what purpose/role the component serves.
};

const EditableTitle = ({ ariaLabel }: EditableTitleProps) => {
  if (!ariaLabel) {
    throw new Error(
      "Please provide information what the EditableTitle component does: ariaLabel={'Click here to change title!'}",
    );
  }
  return (
    <input
      type="text"
      placeholder="Click to change menu title!"
      aria-label={ariaLabel}
      className="w-fit bg-transparent text-3xl font-semibold text-ghost_white placeholder:text-cool_grey placeholder:underline focus:outline-none"
    />
  );
};

export default EditableTitle;
