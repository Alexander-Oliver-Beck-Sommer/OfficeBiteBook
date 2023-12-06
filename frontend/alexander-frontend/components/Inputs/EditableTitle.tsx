const headings = (heading) => {
  switch (heading) {
    case "h1":
      return "text-3xl font-semibold";
    case "h2":
      return "text-2xl font-semibold";
    case "h3":
      return "text-xl font-medium";
    case "h4":
      return "text-base font-medium";
    case "h5":
      return "text-sm font-normal leading-none";
    case "h6":
      return "text-xs font-medium leading-none";
    default:
      return null;
  }
};

type EditableTitleProps = {
  label: string;
  placeholder: string;
  heading: string;
};

const EditableTitle = ({ label, placeholder, heading }: EditableTitleProps) => {
  const headingValue = headings(heading);

  return (
    <input
      type="text"
      placeholder={placeholder}
      aria-label={label}
      className={`w-fit bg-transparent text-ghost_white placeholder-opacity-100 placeholder:text-cool_grey placeholder:underline placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:outline-none focus-visible:placeholder:opacity-0 ${headingValue}`}
    />
  );
};

export default EditableTitle;
