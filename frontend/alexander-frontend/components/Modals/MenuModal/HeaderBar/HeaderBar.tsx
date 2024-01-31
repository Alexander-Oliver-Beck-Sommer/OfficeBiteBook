import { useEffect, useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";

type HeaderBarProps = {
  title?: string;
  createDishToggle?: () => void;
  createDish?: () => void;
  headerBarImport?: () => void;
  eraseDishes?: () => void;
  deleteToggle?: () => void;
  removeMenu?: () => void;
  eraseDishesFromMenu?: () => void;
};

const HeaderBar = ({
  title = "",
  createDishToggle = () => {},
  createDish = () => {},
  headerBarImport = () => {},
  eraseDishes = () => {},
  deleteToggle = () => {},
  removeMenu = () => {},
  eraseDishesFromMenu = () => {},
}: HeaderBarProps) => {
  const [emptyTitle, setEmptyTitle] = useState(title);

  useEffect(() => {
    setEmptyTitle(title);
  }, [title]);

  return (
    <header className="flex items-center justify-between bg-dark-300 px-6 py-4">
      {emptyTitle === "" ? (
        <h2 className="text-grey">Unnamed Menu</h2>
      ) : (
        <h2>{emptyTitle}</h2>
      )}
      <ul className="flex gap-5">
        <li>
          <ActionButton
            icon="add"
            variant="icon-border"
            title="Add a new dish"
            name="Add"
            label="Add a new dish"
            toggle={createDishToggle}
          />
        </li>
        <li>
          <ActionButton
            icon="inventory"
            variant="icon-border"
            title="Import a dish from the archive"
            name="Import"
            label="Import a dish from the archive"
            toggle={headerBarImport}
          />
        </li>
        <li>
          <ActionButton
            icon="erase"
            variant="icon-border"
            title="Erase all dishes from the menu"
            name="erase"
            label="Erase all dishes from the menu"
            toggle={eraseDishesFromMenu}
          />
        </li>
        <li>
          <ActionButton
            icon="delete"
            variant="icon-border"
            title="Delete the menu and all its dishes"
            name="Delete"
            label="Delete the menu and all its dishes"
            toggle={removeMenu}
          />
        </li>
      </ul>
    </header>
  );
};

export default HeaderBar;
