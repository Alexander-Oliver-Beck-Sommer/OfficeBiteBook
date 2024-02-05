import CheckboxThree from "../CheckboxThree";
import UnderlineButton from "../Buttons/UnderlineButton";

type MenuProps = {
  title?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  dishesAmount?: number;
  modalToggle?: () => void;
  checkboxToggle?: () => void;
  checkboxState?: boolean;
};

const Menu = ({
  title = "",
  location = "",
  startTime = "",
  endTime = "",
  dishesAmount = 0,
  modalToggle = () => {},
  checkboxToggle = () => {},
  checkboxState = null,
}: MenuProps) => {
  return (
    <li className="group/menu flex items-center gap-4">
      <CheckboxThree
        initialValue={checkboxState}
        onChange={checkboxToggle}
        label={checkboxState ? "Accepted" : "Declined"}
      />
      <div className="grid h-full flex-1 grid-cols-1Xauto items-center gap-4 border-dark-500 bg-dark-100 text-grey group-first/menu:border-t-2 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
        <p className="truncate text-sm">{title}</p>
        <p className="hidden truncate text-sm sm:block">{location}</p>
        <p className="hidden truncate text-sm md:block">
          {startTime} - {endTime}
        </p>
        <p className="hidden truncate text-sm md:block">
          {dishesAmount} Dishes
        </p>
        <div className="flex justify-end">
          <UnderlineButton
            toggle={modalToggle}
            icon="arrow-right"
            label="More"
            direction="right"
            className="text-sm"
          />
        </div>
      </div>
    </li>
  );
};

export default Menu;
