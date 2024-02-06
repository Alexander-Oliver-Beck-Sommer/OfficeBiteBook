import { supabase } from "@/components/Supabase/supabaseClient";
import { useState, useEffect } from "react";

const useGuests = () => {
  const addGuest = async (
    userId: string,
    name: string,
    department: string,
    weekNumber: number,
  ) => {
    const { error } = await supabase.from("guests").insert([
      {
        user_id: userId,
        name: name,
        department: department,
        week_number: weekNumber,
      },
    ]);
    if (error) {
      console.log("Error adding guest", error);
    }
  };

  const getGuestsFromWeek = async (weekNumber: number) => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("week_number", weekNumber);
    return data;
  };

  return {
    addGuest,
    getGuestsFromWeek,
  };
};

export default useGuests;
