type HourProps = {
  date?: string;
  fullHour?: string;
  fullHourToggle?: () => void;
  halfHour?: string;
  halfHourToggle?: () => void;
  locked?: boolean;
};

const Hour = ({
  date = "",
  fullHour = "",
  fullHourToggle = () => {},
  halfHour = "",
  halfHourToggle = () => {},
  locked = false,
}: HourProps) => {
  return (
    <>
      <button
        value={fullHour}
        data-date={date}
        data-locked={locked}
        aria-label={`Create a menu at ${fullHour}`}
        onClick={fullHourToggle}
        className="h-10 cursor-default border-b border-dashed border-dark-500 outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-dark-500 focus-visible:bg-dark-500 focus-visible:outline-primary"
      ></button>
      <button
        value={halfHour}
        data-date={date}
        data-locked={locked}
        aria-label={`Create a menu at ${halfHour}`}
        onClick={halfHourToggle}
        className="h-10 cursor-default border-b border-dark-500 outline-1 outline-transparent transition duration-300 ease-in-out hover:bg-dark-500 focus-visible:bg-dark-500 focus-visible:outline-primary"
      ></button>
    </>
  );
};

export default Hour;
