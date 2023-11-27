import React from "react";
import weekSettings from "@/data/weekSettings";
import LockIcon from "@/components/Icons/LockIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import GroupIcon from "@/components/Icons/GroupIcon";

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

  return (
    // Week Container
    <ul className="grid w-full grid-cols-7 gap-week_grid_borders bg-davys_grey">
      {Object.entries(settings.weekDays).map(([day, dayName]) => (
        // Day Container
        <li key={day} className="overflow-hidden">
          <ul className="flex flex-row flex-wrap gap-week_grid_borders">
            {/* Day Name and Details Container */}
            <li className="flex w-full flex-row flex-wrap gap-week_grid_borders">
              <section className="flex w-full items-center justify-between bg-gunmetal px-15 py-20">
                <div className="flex items-end gap-8">
                  <h2 className="leading-100">23</h2>
                  <h5>{dayName}</h5>
                </div>
                <button>
                  <LockIcon
                    className="h-24 w-24 fill-ghost_white"
                    variant="outlined"
                  />
                </button>
              </section>
              <ul className="flex w-full items-center justify-between bg-gunmetal px-15 py-20">
                <li>
                  <button className="flex flex-col items-center gap-8">
                    <h3>0</h3>
                    <CheckIcon
                      className="h-30 w-30 fill-ghost_white"
                      variant="enabled"
                    />
                  </button>
                </li>
                <li>
                  <button className="flex flex-col items-center gap-8">
                    <h3>0</h3>
                    <CancelIcon
                      className="h-30 w-30 fill-ghost_white"
                      variant="enabled"
                    />
                  </button>
                </li>
                <li>
                  <button className="flex flex-col items-center gap-8">
                    <h3>0</h3>
                    <QuestionIcon
                      className="h-30 w-30 fill-ghost_white"
                      variant="enabled"
                    />
                  </button>
                </li>
                <li>
                  <button className="flex flex-col items-center gap-8">
                    <h3>0</h3>
                    <GroupIcon
                      className="h-30 w-30 fill-ghost_white"
                      variant="enabled"
                    />
                  </button>
                </li>
              </ul>
            </li>
            {timeSlots.map((slot, index) => (
              // Day Time Slot Container
              <li key={index} className="w-full bg-onyx">
                <section className="flex flex-row flex-wrap">
                  {/* Full hour container f.x 08:00 */}
                  <button
                    value={slot.fullHour}
                    aria-label={`Click and create a new menu at ${slot.fullHour}`}
                    className="h-50 w-full border-b border-dashed border-davys_grey"
                  ></button>
                  {/* Full hour container f.x 08:30 */}
                  <button
                    value={slot.halfHour}
                    aria-label={`Click and create a new menu at ${slot.halfHour}`}
                    className="h-50 w-full"
                  ></button>
                </section>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
