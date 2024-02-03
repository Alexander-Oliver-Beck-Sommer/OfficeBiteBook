"use client";
import useHome from "@/hooks/useHome";
import CheckboxInput from "../Inputs/CheckboxInput";
import IconButton from "../Buttons/IconButton";
import UnderlineButton from "../Buttons/UnderlineButton";
import TextIcon from "../Icons/TextIcon";
import LocationIcon from "../Icons/LocationIcon";
import TimeIcon from "../Icons/TimeIcon";
import RestaurantIcon from "../Icons/RestaurantIcon";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const {
    menus,
    organizedMenus,
    loading,
    decreaseWeek,
    increaseWeek,
    resetWeek,
    weekNumber,
  } = useHome(userId, userEmail);

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
      <section className="flex w-full justify-center px-4 pt-6 md:px-12">
        <div className="flex w-full max-w-screen-xl gap-4">
          <li className="flex w-full gap-4">
            <CheckboxInput />
            <div className="grid flex-1 grid-cols-1Xauto items-center gap-4 fill-grey uppercase sm:grid-cols-3 md:grid-cols-5 md:gap-8">
              <div className="flex items-center gap-2">
                <TextIcon className="h-5 w-5" />
                <h4 class="truncate">Title</h4>
              </div>
              <div className="flex items-center gap-2">
                <LocationIcon className="h-5 w-5" />
                <h4 class="truncate">Location</h4>
              </div>
              <div className="flex items-center gap-2">
                <TimeIcon className="h-5 w-5" />
                <h4 class="truncate">Hours</h4>
              </div>
              <div className="flex items-center gap-2">
                <RestaurantIcon className="h-5 w-5" />
                <h4 class="truncate">Hours</h4>
              </div>
            </div>
          </li>
        </div>
      </section>
      <section className=" flex flex-1 justify-center px-4 pb-4 md:px-12">
        <ul className="flex w-full max-w-screen-xl flex-col gap-14">
          {menus.length > 0 ? (
            Object.entries(organizedMenus).map(
              ([dayName, { menus, date }]) =>
                menus.length > 0 && (
                  <li
                    key={dayName}
                    className="group flex flex-col items-end gap-4"
                  >
                    <h5 className="font-semibold uppercase text-grey">
                      {dayName} | {date}
                    </h5>
                    <div className="h-0.5 w-full rounded-full bg-dark-400"></div>
                    <ul className="flex w-full max-w-screen-xl flex-col gap-8">
                      {menus.map((menu) => (
                        <li key={menu.menu_id} className="flex gap-4">
                          <CheckboxInput />
                          <div className="grid flex-1 grid-cols-1Xauto items-center gap-4 text-grey sm:grid-cols-3 md:grid-cols-5 md:gap-8">
                            <p class="truncate">{menu.menu_title}</p>
                            <p class="hidden truncate sm:block">
                              {menu.menu_location}
                            </p>
                            <p class="hidden truncate md:block">
                              {menu.menu_start_time} - {menu.menu_end_time}
                            </p>
                            <p class="hidden truncate md:block">
                              {menu.menu_dishes_amount} Dishes
                            </p>
                            <div className="flex justify-end">
                              <UnderlineButton
                                icon="arrow-right"
                                label="Details"
                                direction="right"
                              />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
            )
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
    </section>
  );
};

export default HomeComponent;
