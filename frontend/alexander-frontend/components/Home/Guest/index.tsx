import IconButton from "@/components/Buttons/IconButton";
import LocationIcon from "@/components/Icons/LocationIcon";
import InputField from "@/components/InputField";
import TextInput from "@/components/Inputs/TextInput";
import UserIcon from "@/components/Icons/UserIcon";
import OfficeIcon from "@/components/Icons/OfficeIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import UserAddIcon from "@/components/Icons/UserAddIcon";
import useGuests from "@/hooks/useGuests.tsx";
import { useState, useEffect } from "react";

type GuestProps = {
  isVisible?: boolean;
  toggle?: () => void;
  userId?: string;
  weekNumber?: number;
};

const Guest = ({
  isVisible = false,
  toggle = () => {},
  userId = "",
  weekNumber = 0,
}: GuestProps) => {
  const [guests, setGuests] = useState([]);
  const { addGuest, getGuestsFromWeek } = useGuests();

  useEffect(() => {
    const fetchGuests = async () => {
      const retrievedGuests = await getGuestsFromWeek(weekNumber);
      setGuests(retrievedGuests);
    };
    fetchGuests();
  }, [guests]);

  const submitForm = (form) => {
    form.preventDefault();
    const name = form.target.guestName.value.trim();
    const department = form.target.guestDepartment.value.trim();

    if (!name || !department) {
      console.log("(ㆆ_ㆆ) fill the damn form.");
    } else {
      console.log("(•_•) Nice, you filled the form.");
      addGuest(userId, name, department, weekNumber);
      const newGuest = {
        user_id: userId,
        name: name,
        department: department,
        week_number: weekNumber,
      };
      setGuests([...guests, newGuest]);
    }
  };

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
          className={`pattern relative z-50 flex h-full w-full max-w-screen-xl flex-col overflow-y-auto rounded border-2 border-dark-500 ${
            isVisible
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <header className="flex items-center justify-between bg-dark-300 p-4">
            <h3>Guestlist</h3>
            <IconButton icon="close" toggle={toggle} />
          </header>
          <ul className="flex-1 overflow-auto p-4">
            {guests.length > 0 ? (
              guests.map((guest, index) => (
                <li key={index}>{`${guest.name} - ${guest.department}`}</li>
              ))
            ) : (
              <p>No guests</p>
            )}
          </ul>
          <form
            className="flex flex-col gap-6 bg-dark-300 px-4 py-6"
            onSubmit={submitForm}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="guestName"
                className="flex items-center justify-between fill-grey text-grey"
              >
                <p>Name</p>
                <UserIcon />
              </label>
              <input
                autoComplete="off"
                placeholder="Enter name"
                required
                aria-label="Enter the guest's name"
                id="guestName"
                type="text"
                className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="guestDepartment"
                className="flex items-center justify-between fill-grey text-grey"
              >
                <p>Department</p>
                <OfficeIcon />
              </label>
              <input
                autoComplete="off"
                placeholder="Enter department"
                required
                aria-label="Enter the guest's department"
                id="guestDepartment"
                type="text"
                className="rounded border-2 border-dark-500 bg-dark-100 p-3 outline-none placeholder:opacity-100 placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out focus:placeholder:opacity-0"
              />
            </div>
            <button
              type="submit"
              value="Submit"
              className="flex items-center justify-center gap-2 rounded border-2 border-dark-500 bg-dark-100 fill-white p-3 transition-all duration-300 ease-in-out hover:bg-dark-500 focus-visible:bg-dark-500"
            >
              <h4>Add Guest</h4>
              <UserAddIcon className="h-5 w-5" />
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Guest;
