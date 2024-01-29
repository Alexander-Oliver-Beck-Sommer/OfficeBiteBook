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
    <header className="bg-dark-200 border-primary flex w-full justify-center border-b-2 p-4 md:px-12 lg:hidden lg:border-0 lg:bg-transparent">
      <section className="flex w-full max-w-screen-lg items-center justify-between">
        <div>
          <p className="text-grey">{subtitle}</p>
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
