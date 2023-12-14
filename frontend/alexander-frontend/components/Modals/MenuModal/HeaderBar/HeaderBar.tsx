import { useEffect, useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import data from "@/data/MenuModal.js";

type HeaderBarProps = {
  headerBarTitle?: string;
  headerBarMenu?: () => void;
  headerBarTemplate?: () => void;
  headerBarClear?: () => void;
  headerBarDelete?: () => void;
};

const HeaderBar = ({
  headerBarTitle = "",
  headerBarMenu,
  headerBarTemplate,
  headerBarClear,
  headerBarDelete,
}: HeaderBarProps) => {
  const [title, setTitle] = useState(headerBarTitle);

  useEffect(() => {
    setTitle(headerBarTitle);
  }, [headerBarTitle]);

  return (
    <header className="flex items-center justify-between bg-raisin_black px-6 py-4">
      {title === "" ? (
        <h2 className="text-cool_grey">Unnamed Menu</h2>
      ) : (
        <h2>{title}</h2>
      )}
      <ul className="flex gap-5">
        <li>
          <ActionButton
            icon="menu"
            variant="icon"
            title="Save or import a menu from the archive"
            name="Add"
            label={data.menu_buttons.accept.label}
            toggle={headerBarMenu}
          />
        </li>
        <li>
          <ActionButton
            icon="template"
            variant="icon"
            title="Save or import a menu template from the archive"
            name="Menu Templates"
            label={data.menu_buttons.accept.label}
            toggle={headerBarTemplate}
          />
        </li>
        <li>
          <ActionButton
            icon="clear"
            variant="icon"
            title="Clear all dishes from the menu"
            name="clear"
            label={data.menu_buttons.accept.label}
            toggle={headerBarClear}
          />
        </li>
        <li>
          <ActionButton
            icon="delete"
            variant="icon"
            title="Delete the menu and all its dishes"
            name="Delete"
            label={data.menu_buttons.cancel.label}
            toggle={headerBarDelete}
          />
        </li>
      </ul>
    </header>
  );
};

export default HeaderBar;
