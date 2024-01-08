import BowlIcon from "../Icons/BowlIcon";

type CardButtonProps = {
  cardButtonTitle?: string;
  cardButtonStartTime?: string;
  cardButtonEndTime?: string;
  cardButtonLocation?: string;
  cardButtonStyle?: string;
  cardButtonLabel?: string;
  cardButtonDishes?: number;
  cardButtonToggleMenu?: () => void;
};

const CardButton = ({
  cardButtonTitle = "",
  cardButtonStartTime = "",
  cardButtonEndTime = "",
  cardButtonLocation = "",
  cardButtonStyle = "",
  cardButtonLabel = "",
  cardButtonDishes,
  cardButtonToggleMenu = () => {},
}: CardButtonProps) => {
  return (
    <button
      className="group absolute left-0 block w-11/12 p-1 text-left"
      style={cardButtonStyle}
      aria-label={cardButtonLabel}
      onClick={cardButtonToggleMenu}
    >
      <section className="flex h-full w-full flex-col justify-between overflow-auto rounded border-l-4 border-l-apple bg-eerie_black px-2 py-3 transition-all duration-300 ease-in-out group-hover:bg-raisin_black">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-medium">{cardButtonTitle}</h5>
          {/* FUTURE SELF: This just displays the menu's start & end time. */}
          {/* {cardButtonTitle.length <= 16 && (
            <h6 className="font-normal text-cool_grey">
              {cardButtonStartTime} - {cardButtonEndTime}
            </h6>
          )} */}
        </div>

        <div className="flex items-center justify-between">
          <h6 className="font-normal">{cardButtonLocation}</h6>
          {cardButtonDishes !== 0 && (
            <div className="flex items-center justify-between gap-1">
              <h6 className="font-medium">{cardButtonDishes}</h6>
              <BowlIcon className="h-5 fill-apple" />
            </div>
          )}
        </div>
      </section>
    </button>
  );
};

export default CardButton;
