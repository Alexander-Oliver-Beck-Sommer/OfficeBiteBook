import EditableTitle from "@/components/Inputs/EditableTitle";
import CloseButton from "./child-components/CloseButton";

const TitleBar = () => {
  return (
    <header className="flex items-center justify-between gap-25">
      <EditableTitle
        heading="h1"
        placeholder="Edit Menu Title"
        label="Edit Menu Title"
      />
      <CloseButton ariaLabel={"Click to close the menu modal"} />
    </header>
  );
};

export default TitleBar;
