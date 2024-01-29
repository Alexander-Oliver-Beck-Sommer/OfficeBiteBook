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
      <section className="group-hover:bg-dark-300 border-l-primary flex h-full w-full flex-col justify-between overflow-auto rounded border-l-4 bg-dark-100 px-2 py-3 transition-all duration-300 ease-in-out">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-medium">{cardButtonTitle}</h5>
          {/* FUTURE SELF: This just displays the menu's start & end time. */}
          {/* {cardButtonTitle.length <= 16 && (
            <h6 className="font-normal text-grey">
              {cardButtonStartTime} - {cardButtonEndTime}
            </h6>
          )} */}
        </div>

        <div className="flex items-center justify-between">
          <h6 className="font-normal">{cardButtonLocation}</h6>
          {cardButtonDishes !== 0 && (
            <div className="flex items-center justify-between gap-1">
              <h6 className="font-medium">{cardButtonDishes}</h6>
              <BowlIcon className="fill-primary h-5" />
            </div>
          )}
        </div>
      </section>
    </button>
  );
};

export default CardButton;
