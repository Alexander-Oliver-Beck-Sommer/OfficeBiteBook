type CardButtonProps = {
  cardButtonTitle?: string;
  cardButtonStartTime?: string;
  cardButtonEndTime?: string;
  cardButtonLocation?: string;
  cardButtonStyle?: string;
  cardButtonLabel?: string;
  cardButtonToggleMenu?: () => void;
};

const CardButton = ({
  cardButtonTitle = "",
  cardButtonStartTime = "",
  cardButtonEndTime = "",
  cardButtonLocation = "",
  cardButtonStyle = "",
  cardButtonLabel = "",
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
        <div>
          <h5 className="font-medium">{cardButtonTitle}</h5>
          <h6 className="pt-2 font-normal">
            {cardButtonStartTime} - {cardButtonEndTime}
          </h6>
        </div>

        <div>
          <h6 className="font-normal">{cardButtonLocation}</h6>
        </div>
      </section>
    </button>
  );
};

export default CardButton;
