import { useEffect, useState } from "react";
import EditableTitle from "@/components/Inputs/EditableTitle";
import CloseButton from "@/components/Buttons/CloseButton";
import data from "@/data/MenuModal.js";

type TitleCloseProps = {
  titleMenu?: string;
  closeMenu: () => void;
};

const TitleClose = ({ titleMenu = "", closeMenu }: TitleCloseProps) => {
  const [titleMenuInput, setTitleMenuInput] = useState(titleMenu);

  const handleTitleMenuChange = (newValue) => {
    setTitleMenuInput(newValue);
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
        onValueChange={setTitleMenuInput}
        value={titleMenuInput}
      />
      <CloseButton label={data.header_section.close.label} toggle={closeMenu} />
    </header>
  );
};

export default TitleClose;
