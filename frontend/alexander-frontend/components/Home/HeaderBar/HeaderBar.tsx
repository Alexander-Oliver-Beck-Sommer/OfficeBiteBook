type HeaderBarProps = {
  weekNumber?: number;
};

const HeaderBar = ({ weekNumber = 0 }: HeaderBarProps) => {
  return (
    <header className="flex justify-center border-b-2 border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
      <section className="flex w-full max-w-screen-xl">
        <div className="flex items-center gap-1">
          <h2 className="font-normal text-grey">PRESENTING:</h2>
          <h2>WEEK {weekNumber}</h2>
        </div>
      </section>
    </header>
  );
};

export default HeaderBar;
