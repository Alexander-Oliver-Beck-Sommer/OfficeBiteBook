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

  const getDishesFromMenu = async (menuId: string) => {
    const { data: dishes, error } = await supabase
      .from("dishes")
      .select("*")
      .contains("menus_id", `["${menuId}"]`);

    if (error) {
      throw new Error("Error fetching dishes");
    }

    return dishes;
  };

  return {
    getMenusFromGivenWeek,
    getDishesFromMenu,
  };
};

export default useMenus;
