type GuestProps = {
  isVisible?: boolean;
  toggle: () => void;
};

const Guest = ({ isVisible = false, toggle = () => {} }: GuestProps) => {
  return (
    <section
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        isVisible
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center p-4 md:px-12 md:py-8 lg:p-12">
        <div
          className="absolute inset-0 z-40 bg-dark-100 opacity-95 transition-all duration-300 ease-in-out hover:bg-dark-200"
          onClick={toggle}
        ></div>
        <section
          className={`pattern relative z-50 grid h-full w-full max-w-screen-xl grid-cols-autoX1 overflow-y-auto rounded border-2 border-dark-500 ${
            isVisible
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <div className="border border-orange p-12"></div>
          <div className="border"></div>
        </section>
      </div>
    </section>
  );
};

export default Guest;
