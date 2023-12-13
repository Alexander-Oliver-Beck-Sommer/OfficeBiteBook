import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type FooterBarProps = {
  cancelMenu: () => void;
  acceptMenu: () => void;
  createDish: () => void;
  importDish: () => void;
};

const FooterBar = ({
  cancelMenu,
  acceptMenu,
  createDish,
  importDish,
}: FooterBarProps) => {
  return (
    <footer className="flex items-center justify-between bg-raisin_black px-6 py-4">
      <ul className="flex gap-5">
        <li>
          <ActionButton
            icon="add"
            name="Add"
            variant="icon"
            name="Add"
            label={data.menu_buttons.accept.label}
            toggle={createDish}
          />
        </li>
        <li>
          <ActionButton
            icon="inventory"
            name="Import"
            variant="icon"
            name="Import"
            label={data.menu_buttons.cancel.label}
            toggle={importDish}
          />
        </li>
      </ul>
      <ul className="flex gap-5">
        <li>
          <ActionButton
            variant="outlined"
            icon="cancel"
            name={data.menu_buttons.cancel.name}
            label={data.menu_buttons.cancel.label}
            toggle={cancelMenu}
          />
        </li>
        <li>
          <ActionButton
            variant="outlined"
            icon="check"
            name={data.menu_buttons.accept.name}
            label={data.menu_buttons.accept.label}
            toggle={acceptMenu}
          />
        </li>
      </ul>
    </footer>
  );
};

export default FooterBar;
