import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type FooterBarProps = {
  footerBarCreateDish: () => void;
  footerBarImportDish: () => void;
  footerBarCancelMenu: () => void;
  footerBarAcceptMenu: () => void;
};

const FooterBar = ({
  footerBarCreateDish,
  footerBarImportDish,
  footerBarCancelMenu,
  footerBarAcceptMenu,
}: FooterBarProps) => {
  return (
    <footer className="flex items-center justify-between bg-raisin_black px-6 py-4">
      <ul className="flex gap-5">
        <li>
          <ActionButton
            icon="add"
            name="Add"
            variant="icon"
            title="Add a new dish"
            name="Add"
            label={data.menu_buttons.accept.label}
            toggle={footerBarCreateDish}
          />
        </li>
        <li>
          <ActionButton
            icon="inventory"
            name="Import"
            variant="icon"
            title="Import a dish from the archive"
            name="Import"
            label={data.menu_buttons.cancel.label}
            toggle={footerBarImportDish}
          />
        </li>
      </ul>
      <ul className="flex gap-5">
        <li>
          <ActionButton
            variant="outlined"
            icon="cancel"
            title="Cancel the menu without saving"
            name={data.menu_buttons.cancel.name}
            label={data.menu_buttons.cancel.label}
            toggle={footerBarCancelMenu}
          />
        </li>
        <li>
          <ActionButton
            variant="outlined"
            icon="check"
            title="Accept and save menu"
            name={data.menu_buttons.accept.name}
            label={data.menu_buttons.accept.label}
            toggle={footerBarAcceptMenu}
          />
        </li>
      </ul>
    </footer>
  );
};

export default FooterBar;
