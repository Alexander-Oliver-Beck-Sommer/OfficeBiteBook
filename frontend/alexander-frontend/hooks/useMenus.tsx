import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import { MenuProps } from "@/types/MenuProps";

const useMenus = () => {
  const [menusLoading, setMenusLoading] = useState<boolean>(false);
  const [fetchedMenus, setFetchedMenus] = useState<MenuProps[]>([]);

  const getMenusFromDepartment = async (departmentId: string) => {
    try {
      setMenusLoading(true);
      const { data: departmentData, error: departmentError } = await supabase
        .from("departments")
        .select("*")
        .eq("department_id", departmentId);

      if (departmentError) {
        console.error("Error fetching department:", departmentError);
        throw new Error("Error fetching department");
      }

      const department = departmentData[0];
      // Assuming menus_collection is the correct property holding menu IDs
      if (
        department.menus_collection &&
        department.menus_collection.length > 0
      ) {
        const menuFetchPromises = department.menus_collection.map(
          async (menu) => {
            const { data: menusData, error: menusError } = await supabase
              .from("menus")
              .select("*")
              .eq("menu_id", menu); // Assuming menu_id is the correct property to match against

            if (menusError) {
              console.error("Error fetching menus:", menusError);
              throw new Error("Error fetching menus");
            }

            return menusData; // Assuming menusData is an array of menu items
          },
        );

        const menusResults = await Promise.all(menuFetchPromises);
        return menusResults;
      }
    } catch (error) {
      console.error("Failed try and catch for getMenusFromDepartment", error);
      throw new Error("Failed try and catch for getMenusFromDepartment");
    } finally {
      setMenusLoading(false);
    }
  };

  const getMenusFromDepartmentByWeek = async (
    departmentId: string,
    weekNumber: number,
  ) => {
    try {
      setMenusLoading(true);
      const { data: departmentData, error: departmentError } = await supabase
        .from("departments")
        .select("menus_collection")
        .eq("department_id", departmentId);

      if (departmentError) {
        console.error("Error fetching department:", departmentError);
        throw new Error("Error fetching department");
      }

      const department = departmentData[0];
      if (
        department.menus_collection &&
        department.menus_collection.length > 0
      ) {
        // Fetch menus that are in the menus_collection and match the weekNumber
        const menusDataPromises = department.menus_collection.map(
          async (menuId) => {
            const { data: menusData, error: menusError } = await supabase
              .from("menus")
              .select("*")
              .eq("menu_id", menuId)
              .eq("week", weekNumber); // Ensure menu matches the weekNumber

            if (menusError) {
              console.error("Error fetching menus:", menusError);
              throw new Error("Error fetching menus");
            }

            return menusData;
          },
        );

        const menusResults = await Promise.all(menusDataPromises);
        const filteredMenus = menusResults.flat().filter((menu) => menu); // Filter out any undefined or null results

        return filteredMenus;
      }
    } catch (error) {
      console.error(
        "Failed try and catch for getMenusFromDepartmentByWeek",
        error,
      );
      throw new Error("Failed try and catch for getMenusFromDepartmentByWeek");
    } finally {
      setMenusLoading(false);
    }
  };

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
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw new Error("Error fetching menus");
        console.error("Error fetching menus:", error);
      }

      return data;
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
        locked: menu.locked,
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
    getMenusFromDepartment,
    menusLoading,
    fetchedMenus,
    getMenusFromDepartmentByWeek,
  };
};

export default useMenus;
