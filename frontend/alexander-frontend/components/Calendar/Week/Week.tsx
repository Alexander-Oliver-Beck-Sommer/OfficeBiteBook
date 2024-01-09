import DayCell from "@/components/Calendar/WeekGrid/child-components/DayCell";
import SettingsCell from "@/components/Calendar/WeekGrid/child-components/SettingsCell";
import HourCell from "@/components/Calendar/WeekGrid/child-components/HourCell";
import MenuModal from "@/components/Modals/MenuModal/MenuModal";
import CardButton from "@/components/Buttons/CardButton";
import useCalendar from "@/hooks/useCalendar";

type WeekProps = {
  weekDays: string[];
  weekType: boolean;
  weekHourCells: string[];
};

const Week = ({ weekDays = [], weekType, weekHourCells }: WeekProps) => {
  const weekTypeGrid = weekType ? "grid-cols-autoX6" : "grid-cols-autoX8";
  console.log(weekDays);

  return (
    <ul className={`grid ${weekTypeGrid}`}>
      <li className="w-sidebar_width bg-eerie_black">
        <ul className="flex flex-col">
          <li className="flex flex-col">
            <section className="h-[70px]"></section>
          </li>
          {weekHourCells.map((cell, cellIndex) => (
            <li
              key={`sidebar-slots-${cellIndex}`}
              className="flex h-20 w-full items-start justify-center"
            >
              <h5>{cell.fullHour}</h5>
            </li>
          ))}
        </ul>
      </li>
      {weekDays.map((day, dayIndex) => {
        const dayCellDate = day.date.split("-")[2];
        return (
          <li key={dayIndex} className="border-r border-r-arsenic">
            <DayCell dayCellDate={dayCellDate} dayCellDay={day.name} />
            <ul className="relative flex flex-col bg-dark_charcoal">
              {weekHourCells.map((cell, cellIndex) => (
                <li
                  className="relative flex flex-col  bg-dark_charcoal"
                  key={`${day}-hourCell-${cellIndex}`}
                >
                  <HourCell
                    hourCellDate={day.date}
                    hourCellFullValue={cell.fullHour}
                    hourCellHalfValue={cell.halfHour}
                  />
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Week;
