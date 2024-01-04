import { useEffect, useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import data from "@/data/MenuModal.js";

type HeaderBarProps = {
  headerBarTitle?: string;
  headerBarDish?: () => void;
  headerBarImport?: () => void;
  headerBarErase?: () => void;
  headerBarDelete?: () => void;
};

const HeaderBar = ({
  headerBarTitle = "",
  headerBarDish = () => {},
  headerBarImport = () => {},
  headerBarErase = () => {},
  headerBarDelete = () => {},
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
            icon="add"
            variant="icon-border"
            title="Add a new dish"
            name="Add"
            label={data.menu_buttons.accept.label}
            toggle={headerBarDish}
          />
        </li>
        <li>
          <ActionButton
            icon="inventory"
            variant="icon-border"
            title="Import a dish from the archive"
            name="Import"
            label={data.menu_buttons.cancel.label}
            toggle={headerBarImport}
          />
        </li>
        <li>
          <ActionButton
            icon="erase"
            variant="icon-border"
            title="Erase all dishes from the menu"
            name="erase"
            label={data.menu_buttons.accept.label}
            toggle={headerBarErase}
          />
        </li>
        <li>
          <ActionButton
            icon="delete"
            variant="icon-border"
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
