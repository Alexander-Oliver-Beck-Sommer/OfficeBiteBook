type CardButtonProps = {
  title?: string;
  location?: string;
  className?: string;
  acceptedParticipants?: number;
  declinedParticipants?: number;
  toggle?: () => void;
};

const CardButton = ({
  title = "",
  location = "",
  className = "",
  acceptedParticipants = 0,
  declinedParticipants = 0,
  toggle = () => {},
}: CardButtonProps) => {
  return (
    <button
      className="group absolute left-0 block w-11/12 animate-fade p-1 animate-ease-in-out"
      style={className}
      aria-label={`Click to open the menu for ${title}`}
      onClick={toggle}
    >
      <section className="grid h-full w-full grid-cols-1Xauto gap-4 overflow-auto rounded border-l-4 border-l-primary bg-dark-100 px-2 py-3 transition-all duration-300 ease-in-out group-hover:bg-dark-300">
        <div className="flex flex-col items-start justify-between overflow-hidden">
          <h5 className="truncate">{title}</h5>
          <h6 className="truncate text-grey">{location}</h6>
        </div>
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 items-center gap-2">
            <h6>{acceptedParticipants}</h6>
            <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <h6>0</h6>
            <span className="h-2.5 w-2.5 rounded-full bg-orange"></span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <h6>{declinedParticipants}</h6>
            <span className="h-2.5 w-2.5 rounded-full bg-red"></span>
          </div>
        </div>
      </section>
    </button>
  );
};

export default CardButton;
