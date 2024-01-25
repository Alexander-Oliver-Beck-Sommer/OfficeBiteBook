import ActionButton from "../Buttons/ActionButton";

type HeaderItemProps = {
  subtitle?: string;
  weekNumber?: number;
  toggle?: () => void;
};

const HeaderItem = ({
  subtitle = "",
  weekNumber = 0,
  toggle = () => {},
}: HeaderItemProps) => {
  return (
    <header className="flex w-full justify-center border-b-2 border-apple bg-strange_black p-4 md:px-12">
      <section className="flex w-full max-w-screen-lg items-center justify-between">
        <div>
          <p className="text-cool_grey">{subtitle}</p>
          <h2>WEEK {weekNumber}</h2>
        </div>
        <div>
          <ActionButton
            label="Learn more"
            title="Learn more"
            toggle={toggle}
            variant="icon-border"
            icon="info"
          />
        </div>
      </section>
    </header>
  );
};

export default HeaderItem;
