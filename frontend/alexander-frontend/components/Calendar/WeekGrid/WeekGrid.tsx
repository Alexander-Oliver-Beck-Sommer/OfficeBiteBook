import React from "react";
import weekSettings from "@/data/weekSettings";
import HourCell from "./child-components/HourCell";
import DateCell from "./child-components/DateCell";
import AttendantsCell from "./child-components/AttendantsCell";

export default function WeekGrid() {
  const locale = navigator.language || "da-DK";
  const settings = weekSettings[locale] || weekSettings["da-DK"];

  function generateTimeSlots(timeFormat) {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      let hourFormatted =
        timeFormat === "24-hour"
          ? hour.toString().padStart(2, "0")
          : hour % 12 === 0
            ? 12
            : hour % 12;
      let amPm = hour < 12 ? "AM" : "PM";

      const fullHour =
        `${hourFormatted}:00` + (timeFormat === "12-hour" ? ` ${amPm}` : "");
      const halfHour =
        `${hourFormatted}:30` + (timeFormat === "12-hour" ? ` ${amPm}` : "");

      slots.push({ fullHour, halfHour });
    }
    return slots;
  }

  const timeSlots = generateTimeSlots(settings.timeFormat);

  function getWeekDates() {
    const today = new Date();
    const firstDayOfWeek =
      today.getDate() -
      today.getDay() +
      (settings.country === "United States" ? 0 : 1);
    const startDate = new Date(today.setDate(firstDayOfWeek));

    const weekDates = settings.weekDays.map((_, idx) => {
      const day = new Date(startDate);
      day.setDate(day.getDate() + idx);
      return day;
    });

    return weekDates;
  }

  const weekDates = getWeekDates();

  return (
    // Week Container
    <ul className="grid grid-cols-8 gap-week_grid_borders bg-davys_grey">
      {Object.entries(settings.weekDays).map(([day, dayName], index) => {
        const date = weekDates[index];

        if (index === 0) {
          return (
            <>
              <li className="w-sidebar_width bg-dark_gunmetal">
                <ul className="flex flex-col gap-week_grid_borders">
                  <li className="flex flex-col gap-week_grid_borders">
                    <section className="h-65"></section>
                    <section className="h-100"></section>
                  </li>
                  {timeSlots.map((slot, index) => (
                    <li
                      key={index}
                      className="flex h-week_grid_hours w-full justify-center"
                    >
                      <p>{slot.fullHour}</p>
                    </li>
                  ))}
                </ul>
              </li>
              <li key={day} className="overflow-hidden">
                <ul className="flex flex-col gap-week_grid_borders">
                  <li className="flex flex-col gap-week_grid_borders">
                    <DateCell dayName={dayName} dayDate={date.getDate()} />
                    <AttendantsCell
                      acceptValue={1}
                      declineValue={1}
                      pendingValue={1}
                      guestValue={1}
                    />
                  </li>
                  {timeSlots.map((slot, index) => (
                    <HourCell
                      key={index}
                      fullValue={slot.fullHour}
                      fullLabel={`Click and create a new menu at ${slot.fullHour}`}
                      halfValue={slot.halfHour}
                      halfLabel={`Click and create a new menu at ${slot.halfHour}`}
                    />
                  ))}
                </ul>
              </li>
            </>
          );
        } else {
          return (
            <li key={day} className="overflow-hidden">
              <ul className="flex flex-col gap-week_grid_borders">
                <li className="flex w-full flex-row flex-wrap gap-week_grid_borders">
                  <DateCell dayName={dayName} dayDate={date.getDate()} />
                  <AttendantsCell
                    acceptValue={1}
                    declineValue={1}
                    pendingValue={1}
                    guestValue={1}
                  />
                </li>
                {timeSlots.map((slot, index) => (
                  <HourCell
                    key={index}
                    fullValue={slot.fullHour}
                    fullLabel={`Click and create a new menu at ${slot.fullHour}`}
                    halfValue={slot.halfHour}
                    halfLabel={`Click and create a new menu at ${slot.halfHour}`}
                  />
                ))}
              </ul>
            </li>
          );
        }
      })}
    </ul>
  );
}
