import BowlIcon from "@/components/Icons/BowlIcon";
import RestaurantIcon from "../Icons/RestaurantIcon";

type CardButtonProps = {
  title?: string;
  location?: string;
  className?: string;
  dishesAmount?: number;
  toggle?: () => void;
};

const CardButton = ({
  title = "",
  location = "",
  className = "",
  dishesAmount,
  toggle = () => {},
}: CardButtonProps) => {
  return (
    <button
      className="group absolute left-0 block w-11/12 p-1"
      style={className}
      aria-label={`Click to open the menu for ${title}`}
      onClick={toggle}
    >
      <section className="flex h-full w-full flex-col items-start justify-between overflow-auto rounded border-l-4 border-l-primary bg-dark-100 px-2 py-3 transition-all duration-300 ease-in-out group-hover:bg-dark-300">
        <h5>{title}</h5>
        <div className="flex w-full items-center justify-between">
          <h6 className="text-grey">{location}</h6>
          {dishesAmount !== 0 && (
            <div className="flex items-center gap-1">
              <h6>{dishesAmount}</h6>
              <RestaurantIcon className="h-5 w-5 fill-primary" />
            </div>
          )}
        </div>
      </section>
    </button>
  );
};

export default CardButton;
