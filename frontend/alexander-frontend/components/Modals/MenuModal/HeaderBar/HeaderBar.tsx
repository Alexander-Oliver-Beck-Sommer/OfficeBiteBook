import { useEffect, useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import data from "@/data/MenuModal.js";

type HeaderBarProps = {
  title?: string;
  deleteToggle: () => void;
  cleanToggle: () => void;
};

const HeaderBar = ({
  title = "",
  deleteToggle,
  cleanToggle,
}: HeaderBarProps) => {
  const [titleMenuInput, setTitleMenuInput] = useState(title);

  useEffect(() => {
    setTitleMenuInput(title);
  }, [title]);

  return (
    <>
      <div className="flex gap-5">
        {titleMenuInput === "" ? (
          <h2 className="text-cool_grey">Unnamed Menu</h2>
        ) : (
          <h2>{titleMenuInput}</h2>
        )}
      </div>
      <div className="flex gap-5">
        <ActionButton
          icon="menu"
          variant="icon"
          name="Add"
          label={data.menu_buttons.accept.label}
          toggle={deleteToggle}
        />
        <ActionButton
          icon="template"
          variant="icon"
          name="Menu Templates"
          label={data.menu_buttons.accept.label}
          toggle={deleteToggle}
        />
        <ActionButton
          title="Clear and remove all dishes"
          icon="clean"
          variant="icon"
          name="Clean"
          label={data.menu_buttons.accept.label}
          toggle={cleanToggle}
        />
        <ActionButton
          title="Delete the menu and all dishes"
          icon="delete"
          variant="icon"
          name="Delete"
          label={data.menu_buttons.cancel.label}
          toggle={deleteToggle}
        />
      </div>
    </>
  );
};

export default HeaderBar;
