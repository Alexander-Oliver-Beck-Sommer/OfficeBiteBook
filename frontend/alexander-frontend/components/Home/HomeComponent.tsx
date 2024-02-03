"use client";
import useHome from "@/hooks/useHome";
import HeaderBar from "@/components/Home/HeaderBar/HeaderBar";
import MobileVersion from "@/components/Home/MobileVersion/MobileVersion";
import DesktopVersion from "@/components/Home/DesktopVersion/DesktopVersion";
import CheckboxInput from "../Inputs/CheckboxInput";
import UserAddIcon from "../Icons/UserAddIcon";
import ArrowIcon from "../Icons/ArrowIcon";
import ResetIcon from "../Icons/ResetIcon";
import IconButton from "../Buttons/IconButton";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const { menus, loading, decreaseWeek, increaseWeek, resetWeek, weekNumber } =
    useHome(userId, userEmail);

  return (
    <section className="fill-body pattern flex flex-col">
      <section className="flex justify-center border-b border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
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
      </section>
      <section className="flex justify-center px-4 pt-4 md:px-12">
        <div className="flex w-full max-w-screen-xl gap-4">
          <CheckboxInput />
          <IconButton
            icon="user-add"
            size="small"
            title="Add guests"
            label="Add guests"
          />
        </div>
      </section>
      <section className=" flex flex-1 justify-center px-4 py-6 md:px-12">
        <ul className="flex w-full max-w-screen-xl flex-col">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <li
                className="animate-fade-up border animate-ease-in-out"
                key={menu.menu_id}
              >
                {menu.menu_title}
              </li>
            ))
          ) : (
            <li className="flex flex-1 animate-fade flex-col items-center justify-center gap-4 animate-ease-in-out">
              <svg
                aria-hidden="true"
                className="h-12 w-12 animate-spin fill-primary text-dark-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h3 className="animate-fade">Fetching menus</h3>
            </li>
          )}
        </ul>
      </section>
      <section className="border border-red px-4 py-6 md:px-12"></section>
    </section>
  );
};

export default HomeComponent;
