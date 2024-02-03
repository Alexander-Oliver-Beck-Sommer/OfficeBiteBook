import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

const useMenus = () => {
  const getMenusFromGivenWeek = async (weekNumber: number) => {
    const { data: menus, error } = await supabase
      .from("menus")
      .select("*")
      .eq("menu_week", weekNumber);

    if (error) {
      throw new Error("Error fetching menus");
    }

    return menus;
  };

  return {
    getMenusFromGivenWeek,
  };
};

export default useMenus;
