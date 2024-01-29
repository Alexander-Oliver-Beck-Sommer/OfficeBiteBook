import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type FooterBarProps = {
  footerBarCancelMenu?: () => void;
  footerBarAcceptMenu?: () => void;
};

const FooterBar = ({
  footerBarCancelMenu = () => {},
  footerBarAcceptMenu = () => {},
}: FooterBarProps) => {
  return (
    <footer className="bg-dark-300 flex items-center justify-end px-6 py-4">
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
