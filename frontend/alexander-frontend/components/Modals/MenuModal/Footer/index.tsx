import ActionButton from "@/components/Buttons/ActionButton";

type FooterProps = {
  hideModal?: () => void;
  saveMenuChanges?: () => void;
};

const Footer = ({
  hideModal = () => {},
  saveMenuChanges = () => {},
}: FooterProps) => {
  return (
    <footer className="flex items-center justify-end bg-dark-300 px-6 py-4">
      <ul className="flex gap-5">
        <li>
          <ActionButton
            variant="outlined"
            icon="cancel"
            title="Cancel the menu without saving"
            name="Cancel"
            label="Cancel the menu without saving"
            toggle={hideModal}
          />
        </li>
        <li>
          <ActionButton
            variant="outlined"
            icon="check"
            title="Accept and save menu"
            name="Accept"
            label="Accept and save menu"
            toggle={saveMenuChanges}
          />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
