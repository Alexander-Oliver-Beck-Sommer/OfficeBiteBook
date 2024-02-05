import IconButton from "@/components/Buttons/IconButton";
import LocationIcon from "@/components/Icons/LocationIcon";
import InputField from "@/components/InputField";

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
          className={`pattern relative z-50 flex h-full w-full max-w-screen-md flex-col overflow-y-auto rounded border-2 border-dark-500 ${
            isVisible
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <header className="flex items-center justify-between bg-dark-300 p-4">
            <h3>Guestlist</h3>
            <IconButton icon="close" onClick={toggle} />
          </header>
          <div className="flex-1 px-4"></div>
          <form className="flex flex-col gap-4 bg-dark-300 p-4">
            <div className="grid grid-cols-1Xauto">
              <input className="" />
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Guest;
