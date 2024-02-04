import IconButton from "../Buttons/IconButton";

type HeaderProps = {
  weekNumber?: number;
  decreaseWeek?: () => void;
  increaseWeek?: () => void;
  resetWeek?: () => void;
};

const Header = ({
  weekNumber = 0,
  decreaseWeek = () => {},
  increaseWeek = () => {},
  resetWeek = () => {},
}: HeaderProps) => {
  return (
    <header className="flex justify-center border-b border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <div>
          <h2>WEEK {weekNumber}</h2>
        </div>
        <div className="flex gap-4">
          <IconButton
            size="small"
            toggle={decreaseWeek}
            icon="arrow-left"
            label="Rewind one week"
            title="Rewind one week"
          />
          <IconButton
            size="small"
            toggle={increaseWeek}
            icon="arrow-right"
            label="Fast forward one week"
            title="Fast forward one week"
          />
          <IconButton
            size="small"
            toggle={resetWeek}
            icon="reset"
            label="Reset week"
            title="Reset week"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
