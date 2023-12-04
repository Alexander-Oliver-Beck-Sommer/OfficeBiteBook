import CancelIcon from "../Icons/CancelIcon";
import CheckIcon from "../Icons/CheckIcon";

const selectIcon = (icon) => {
  switch (icon) {
    case "cancel":
      return <CancelIcon variant="disabled" className="h-24 w-24" />;
    case "check":
      return <CheckIcon variant="disabled" className="h-24 w-24" />;
    default:
      return null;
  }
};

const selectVariant = (variant) => {
  switch (variant) {
    case "filled":
      return "bg-davys_grey border-transparent";
    case "outlined":
      return "border-davys_grey";
    default:
      return "bg-davys_grey border-transparent";
  }
};

type ActionButtonsProps = {
  icon: string; // Optional. Choose which type of icon you want to use.
  variant: string; // Optional. Choose which type of styling the button should have.
  label: string; // Required. Write what purpose/role the component serves.
  name: string; // Required. Write a name that will be displayed on the button.
  toggle: () => void; // Optional. Toggle that makes the component able to run and execute onClick-related events.
};

const ActionButton = ({
  icon,
  variant,
  label,
  name,
  toggle,
}: ActionButtonsProps) => {
  const iconComponent = selectIcon(icon);
  const variantStyle = selectVariant(variant);

  return (
    <button
      aria-label={label}
      className={`flex items-center justify-center gap-8 rounded border-[3px] fill-ghost_white px-25 py-15 text-ghost_white ${variantStyle}`}
    >
      <h4>{name}</h4>
      {iconComponent}
    </button>
  );
};

export default ActionButton;
