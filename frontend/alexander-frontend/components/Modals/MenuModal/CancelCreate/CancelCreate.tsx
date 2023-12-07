import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type CancelCreateProps = {
  cancelMenu: () => void;
  acceptMenu: () => void;
};

const CancelCreate = ({ cancelMenu, acceptMenu }: CancelCreateProps) => {
  return (
    <li className="flex items-center justify-end gap-3">
      <ActionButton
        variant="outlined"
        icon="cancel"
        name={data.menu_buttons.cancel.name}
        label={data.menu_buttons.cancel.label}
        toggle={cancelMenu}
      />
      <ActionButton
        variant="filled"
        icon="check"
        name={data.menu_buttons.accept.name}
        label={data.menu_buttons.accept.label}
        toggle={acceptMenu}
      />
    </li>
  );
};

export default CancelCreate;
