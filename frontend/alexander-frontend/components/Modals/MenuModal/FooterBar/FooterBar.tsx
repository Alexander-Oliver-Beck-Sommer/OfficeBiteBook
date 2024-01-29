import ActionButton from "@/components/Buttons/ActionButton";

type FooterBarProps = {
  cancelToggle?: () => void;
  createToggle?: () => void;
};

const FooterBar = ({
  cancelToggle = () => {},
  createToggle = () => {},
}: FooterBarProps) => {
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
            toggle={cancelToggle}
          />
        </li>
        <li>
          <ActionButton
            variant="outlined"
            icon="check"
            title="Accept and save menu"
            name="Accept"
            label="Accept and save menu"
            toggle={createToggle}
          />
        </li>
      </ul>
    </footer>
  );
};

export default FooterBar;
