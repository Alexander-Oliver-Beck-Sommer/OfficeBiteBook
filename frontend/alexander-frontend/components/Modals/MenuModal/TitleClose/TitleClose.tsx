import { useEffect, useState } from "react";
import EditableTitle from "@/components/Inputs/EditableTitle";
import CloseButton from "@/components/Buttons/CloseButton";
import data from "@/data/MenuModal.js";

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
    <header className="flex items-center justify-between gap-6">
      <EditableTitle
        heading="h1"
        placeholder={data.header_section.title.placeholder}
        label={data.header_section.title.label}
        onValueChange={handleTitleMenuChange}
        value={titleMenuInput}
      />
      <CloseButton label={data.header_section.close.label} toggle={closeMenu} />
    </header>
  );
};

export default TitleClose;
