import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type CancelCreateProps = {
  cancel: () => void;
  accept: () => void;
};

const CancelCreate = ({ cancel, accept }: CancelCreateProps) => {
  return (
    <>
      <ActionButton
        variant="outlined"
        icon="cancel"
        name={data.menu_buttons.cancel.name}
        label={data.menu_buttons.cancel.label}
        toggle={cancel}
      />
      <ActionButton
        variant="outlined"
        icon="check"
        name={data.menu_buttons.accept.name}
        label={data.menu_buttons.accept.label}
        toggle={accept}
      />
    </>
  );
};

export default CancelCreate;
