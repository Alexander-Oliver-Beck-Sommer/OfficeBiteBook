import { useEffect, useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import data from "@/data/MenuModal.js";

type HeaderBarProps = {
  headerBarTitle?: string;
  headerBarDish?: () => void;
  headerBarImport?: () => void;
  headerBarErase?: () => void;
  headerBarEraseDisabled?: boolean;
  headerBarDelete?: () => void;
  headerBarDeleteDisabled?: boolean;
};

const HeaderBar = ({
  headerBarTitle = "",
  headerBarDish = () => {},
  headerBarImport = () => {},
  headerBarErase = () => {},
  headerBarEraseDisabled = true,
  headerBarDelete = () => {},
  headerBarDeleteDisabled = true,
}: HeaderBarProps) => {
  const [title, setTitle] = useState(headerBarTitle);

  useEffect(() => {
    setTitle(headerBarTitle);
  }, [headerBarTitle]);

  return (
    <header className="bg-dark-300 flex items-center justify-between px-6 py-4">
      {title === "" ? (
        <h2 className="text-grey">Unnamed Menu</h2>
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
            disabled={headerBarEraseDisabled}
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
            disabled={headerBarDeleteDisabled}
          />
        </li>
      </ul>
    </header>
  );
};

export default HeaderBar;
