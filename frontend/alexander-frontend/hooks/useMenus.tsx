import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { MenuProps } from "@/types/MenuProps";

const useMenus = () => {
  const getMenusFromGivenWeek = async (weekNumber: number) => {
    const { data: menus, error } = await supabase
      .from("menus")
      .select("*")
      .eq("week", weekNumber);

    if (error) {
      throw new Error("Error fetching menus");
    }

    return menus;
  };

  const getDishesFromMenu = async (menuId: string) => {
    const { data: dishes, error } = await supabase
      .from("dishes")
      .select("*")
      .contains("menu_id", `["${menuId}"]`);

    if (error) {
      throw new Error("Error fetching dishes");
    }

    return dishes;
  };

  const uploadMenu = async (menu: MenuProps) => {
    const { error } = await supabase.from("menus").insert(menu);

    if (error) {
      throw new Error("Error uploading menu");
      console.log("Error uploading menu:", error);
    }
  };

  const getMenusFromUser = async (userId: string) => {
    try {
      const { data: menusData, error: menusError } = await supabase
        .from("menus")
        .select("*")
        .eq("user_id", userId);

      if (menusError) {
        throw new Error("Error fetching menus");
        console.error("Error fetching menus:", menusError);
      }

      if (menusData) {
        menusData.forEach((menu) => {
          console.log(menu);
        });
      }

      return menusData;
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const updateMenu = async (menuId: string, menu: MenuProps) => {
    const { error } = await supabase
      .from("menus")
      .update({
        title: menu.title,
        location: menu.location,
        date: menu.date,
        start_time: menu.start_time,
        end_time: menu.end_time,
        week: menu.week,
        dishes: menu.dishes,
      })
      .eq("menu_id", menuId);
  };

  return {
    getMenusFromGivenWeek,
    getDishesFromMenu,
    uploadMenu,
    getMenusFromUser,
    updateMenu,
  };
};

export default useMenus;
