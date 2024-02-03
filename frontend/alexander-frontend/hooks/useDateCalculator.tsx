import { useCallback } from "react";

const useDateCalculator = () => {
  const getDayNameFromDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return dayName;
  }, []);
  // Usage:
  // getDayNameFromDate("2024-02-03") => "Sunday"

  const formatDateToDDMMYYYY = useCallback((dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }, []);
  // Usage:
  // formatDateToDDMMYYYY("2024-02-03") => "03-02-2024"

  const getWeekNumberFromDate = useCallback((dateString: string): number => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  }, []);
  // Usage:
  // getWeekNumberFromDate("2024-02-03") => 5

  const getCurrentWeekNumber = useCallback(
    (weekAdjustment: number = 0): number => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Adjust for the specified number of weeks
      today.setDate(today.getDate() + weekAdjustment * 7);
      today.setDate(today.getDate() + 3 - ((today.getDay() + 6) % 7));
      const week1 = new Date(today.getFullYear(), 0, 4);
      return (
        1 +
        Math.round(
          ((today.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7,
        )
      );
    },
    [],
  );

  // Usage:
  // Right now the date is 2024-02-03, so getCurrentWeekNumber() => 5

  return {
    getDayNameFromDate,
    formatDateToDDMMYYYY,
    getWeekNumberFromDate,
    getCurrentWeekNumber,
  };
};

export default useDateCalculator;
