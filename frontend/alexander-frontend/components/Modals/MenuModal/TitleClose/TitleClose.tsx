import { useEffect, useState } from "react";
import EditableTitle from "@/components/Inputs/EditableTitle";
import CloseButton from "@/components/Buttons/CloseButton";
import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type TitleCloseProps = {
  titleMenu?: string;
  closeMenu: () => void;
  onTitleChange?: (newTitle: string) => void;
};

const TitleClose = ({
  titleMenu = "",
  closeMenu,
  onTitleChange,
}: TitleCloseProps) => {
  const [titleMenuInput, setTitleMenuInput] = useState(titleMenu);

  const handleTitleMenuChange = (newValue: string) => {
    setTitleMenuInput(newValue);
    if (onTitleChange) {
      onTitleChange(newValue);
    }
  };

  useEffect(() => {
    setTitleMenuInput(titleMenu);
  }, [titleMenu]);

  return (
    <>
      <EditableTitle
        heading="h2"
        placeholder={data.header_section.title.placeholder}
        label={data.header_section.title.label}
        onValueChange={handleTitleMenuChange}
        value={titleMenuInput}
      />
      <div className="flex gap-5">
        <ActionButton
          icon="menu"
          variant="icon"
          name="Add"
          label={data.menu_buttons.accept.label}
          toggle={closeMenu}
        />
        <ActionButton
          icon="template"
          variant="icon"
          name="Menu Templates"
          label={data.menu_buttons.accept.label}
          toggle={closeMenu}
        />
        <ActionButton
          icon="clean"
          variant="icon"
          name="Clean"
          label={data.menu_buttons.accept.label}
          toggle={closeMenu}
        />
        <ActionButton
          icon="delete"
          variant="icon"
          name="Delete"
          label={data.menu_buttons.cancel.label}
          toggle={closeMenu}
        />
      </div>
    </>
  );
};

export default TitleClose;
