import CloseButton from "./child-components/CloseButton";
import EditableTitle from "./child-components/EditableTitle";

const TitleBar = () => {
  return (
    <header className="flex items-center justify-between gap-25">
      <EditableTitle ariaLabel={"Click to change the menu's title!"} />
      <CloseButton ariaLabel={"Click to close the menu modal"} />
    </header>
  );
};

export default TitleBar;
