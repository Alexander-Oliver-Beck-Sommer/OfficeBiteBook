import DayCell from "@/components/Calendar/Week/child-components/DayCell";
import SettingsCell from "@/components/Calendar/Week/child-components/SettingsCell";
import HourCell from "@/components/Calendar/Week/child-components/HourCell";
import MenuEditor from "../MenuEditor";
import CardButton from "@/components/Buttons/CardButton";
import useMenuCreator from "@/hooks/useMenuCreator";

type WeekProps = {
  userId?: string;
  days?: string[];
  type?: boolean;
  hours?: string[];
  lockDay?: (date: string, locked: boolean) => void;
  togglePublished?: () => void;
};

const Week = ({
  userId = "",
  days = [],
  type = true,
  hours = [],
  lockDay = () => {},
  togglePublished = () => {},
}: WeekProps) => {
  const {
    createMenu,
    createDish,
    editMenu,
    saveMenu,
    closeMenu,
    visibility,
    loading,
    menus,
    dishes,
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    calculateCardButtonPosition,
    calculateCardButtonHeight,
    deleteMenu,
    deleteDish,
  } = useMenuCreator(userId);

  return (
    <>
      <ul className="flex">
        <li className="w-sidebar_width bg-dark-100">
          <ul className="flex flex-col">
            <li className="flex flex-col">
              <section className="h-[70px]"></section>
              <section className="h-12"></section>
            </li>
            {hours.map((hour) => (
              <li
                key={`sidebar-${hour.fullHour}`}
                className="flex h-20 w-full items-start justify-center"
              >
                <h5>{hour.fullHour}</h5>
              </li>
            ))}
          </ul>
        </li>
        {days.map((day) => {
          const getTodaysDate = new Date();
          const todaysDate = getTodaysDate.toISOString().split("T")[0];
          const dayDate = day.date;
          const isCurrentDay = todaysDate === dayDate;
          const date = day.date.split("-")[2];
          const cardButtons = menus.filter((menu) =>
            menu.date.startsWith(day.date),
          );
          return (
            <li
              key={`${day.name}-${day.date}`}
              className="flex-1 border-r border-r-dark-500 last:border-r-0"
            >
              <DayCell
                date={date}
                day={day.name}
                currentDay={isCurrentDay}
                lockToggle={() => lockDay(day.date, day.locked)} // Pass the date to toggle the correct day
                lockedValue={day.locked}
              />
              <SettingsCell
                publishToggle={() => togglePublished(day.date, day.published)} // Pass the date to toggle the correct day
                publishedValue={day.published}
              />
              <ul className="relative flex flex-col bg-dark-400">
                <li className="relative flex flex-col  bg-dark-400">
                  {hours.map((hour) => (
                    <HourCell
                      key={`${day.name}-${hour.fullHour}`}
                      locked={day.locked}
                      date={day.date}
                      halfHour={hour.halfHour}
                      halfHourToggle={() =>
                        createMenu(day.date, hour.halfHour, day.locked)
                      }
                      fullHour={hour.fullHour}
                      fullHourToggle={() =>
                        createMenu(day.date, hour.fullHour, day.locked)
                      }
                    />
                  ))}
                  {cardButtons.map((cardButton) => (
                    <CardButton
                      key={`cardButton-${cardButton.menu_id}`}
                      title={cardButton.title}
                      location={cardButton.location}
                      acceptedParticipants={
                        cardButton.accepted_participants?.length
                      }
                      declinedParticipants={
                        cardButton.declined_participants?.length
                      }
                      toggle={() => editMenu(cardButton)}
                      className={{
                        top: `${calculateCardButtonPosition(
                          cardButton.start_time,
                        )}px`,
                        height: `${calculateCardButtonHeight(
                          cardButton.start_time,
                          cardButton.end_time,
                        )}px`,
                      }}
                    />
                  ))}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
      <MenuEditor
        removeDishFromMenu={deleteDish}
        removeMenu={deleteMenu}
        visibility={visibility}
        loading={loading}
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        closeToggle={closeMenu}
        saveToggle={saveMenu}
        dishes={dishes}
        addNewDishToMenu={createDish}
      />
    </>
  );
};

export default Week;
