type CardButtonProps = {
  cardButtonTitle?: string;
  cardButtonStartTime?: string;
  cardButtonEndTime?: string;
  cardButtonLocation?: string;
  cardButtonStyle?: string;
  cardButtonLabel?: string;
  cardButtonToggle?: () => void;
};

const CardButton = ({
  cardButtonTitle = "",
  cardButtonStartTime = "",
  cardButtonEndTime = "",
  cardButtonLocation = "",
  cardButtonStyle = "",
  cardButtonLabel = "",
  cardButtonToggle = () => {},
}: CardButtonProps) => {
  return (
    <button
      className="group absolute left-0 block w-11/12 p-1 text-left"
      style={cardButtonStyle}
      aria-label={cardButtonLabel}
      onClick={cardButtonToggle}
    >
      <section className="flex h-full w-full flex-col justify-between overflow-auto rounded border-l-4 border-l-apple bg-eerie_black p-2 transition-all duration-300 ease-in-out group-hover:bg-raisin_black">
        <div>
          <h4>{cardButtonTitle}</h4>
          <p className="pt-1 text-sm">
            {cardButtonStartTime} - {cardButtonStartTime}
          </p>
        </div>

        <div>
          <p className="text-sm">{cardButtonLocation}</p>
        </div>
      </section>
    </button>
  );
};

export default CardButton;
