"use client";
import { useEffect, useState } from "react";
import useTimeMachine from "@/hooks/useTimeMachine";
import NavigationBar from "@/components/Calendar/NavigationBar/NavigationBar";
import Week from "@/components/Calendar/Week";
import ErrorModal from "../ErrorModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type CalendarProps = {
  userId?: string;
};

export default function Calendar({ userId }: CalendarProps) {
  const {
    week,
    type,
    weekTypeSwitcher,
    hours,
    weekHighlighter,
    weekBackward,
    weekForward,
    weekReset,
    currentWeekNumber,
    lockDay,
    togglePublished,
  } = useTimeMachine(userId);
  const supabase = createClientComponentClient();

  // State to track if user data has been fetched
  const [userDataFetched, setUserDataFetched] = useState(false);

  const fetchUser = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("user_id", userId)
        .eq("user_role", "admin");

      if (error) {
        console.log("Error fetching user", error);
        return;
      }

      setUserDataFetched(data && data.length > 0);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      {userDataFetched ? (
        <>
          <NavigationBar
            jumpBack={weekBackward}
            weekNumber={currentWeekNumber}
            jumpForward={weekForward}
            currentDateHighlight={weekHighlighter}
            currentDateReset={weekReset}
            typeToggle={weekTypeSwitcher}
          />
          <Week
            userId={userId}
            days={week.week_days}
            type={type}
            hours={hours()}
            lockDay={lockDay}
            togglePublished={togglePublished}
          />
        </>
      ) : (
        <section className="fill-body pattern flex items-center justify-center px-5 py-10">
          <ErrorModal variant={403} />
        </section>
      )}
    </>
  );
}
