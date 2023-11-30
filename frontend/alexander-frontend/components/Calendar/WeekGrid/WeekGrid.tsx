"use client";
import React from "react";
import weekSettings from "@/data/weekSettings";
import HourCell from "./child-components/HourCell";
import DateCell from "./child-components/DateCell";
import AttendantsCell from "./child-components/AttendantsCell";

const WeekGrid = ({
  currentDate,
  generateTimeSlots,
  getWeekDates,
  settings,
}) => {
  const locale = navigator.language || "da-DK";
  const timeSlots = generateTimeSlots(settings.timeFormat);
  const weekDates = getWeekDates();

  const today = new Date();
  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <ul className="grid grid-cols-8 gap-week_grid_borders bg-davys_grey">
        {Object.entries(settings.weekDays).map(([day, dayName], index) => {
          const date = weekDates[index];
          const isCurrentDay = isToday(date);

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
                        className="flex h-week_grid_hours w-full items-start justify-center"
                      >
                        <p>{slot.fullHour}</p>
                      </li>
                    ))}
                  </ul>
                </li>
                <li key={day} className="overflow-hidden">
                  <ul className="flex flex-col gap-week_grid_borders">
                    <li className="flex flex-col gap-week_grid_borders">
                      <DateCell dayName={dayName} dayDate={date.getDate()} isCurrentDay={isCurrentDay} />
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
                    <DateCell dayName={dayName} dayDate={date.getDate()} isCurrentDay={isCurrentDay} />
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
    </>
  );
};

export default WeekGrid;
