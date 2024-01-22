import { supabase } from "@/components/Supabase/supabaseClient";
import { useEffect, useState } from "react";

const useHome = (userId, userEmail) => {
  const [weekNumber, setWeekNumber] = useState(0);
  const [menusAndDishes, setMenusAndDishes] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDishesForMenu = async (menuId) => {
    const { data, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("menu_id", menuId);
    if (error) throw error;
    return data;
  };

  useEffect(() => {
    const calculateWeekNumber = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear = Math.floor(
        (currentDate - startOfYear) / (24 * 60 * 60 * 1000),
      );
      return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const fetchMenusData = async () => {
      try {
        const calculatedWeekNumber = calculateWeekNumber();
        const { data: menusData, error } = await supabase
          .from("menus")
          .select("*")
          .eq("menu_week", calculatedWeekNumber);

        if (error) {
          throw error;
        }

        const combinedMenusAndDishes = await Promise.all(
          menusData.map(async (menu) => {
            const dishes = await fetchDishesForMenu(menu.menu_id);
            return { ...menu, dishes };
          }),
        );

        setMenusAndDishes(combinedMenusAndDishes);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    if (userId && userEmail) {
      setWeekNumber(calculateWeekNumber());
      fetchMenusData();
    }
  }, [userId, userEmail]);

  const handleMenuSelect = (menuId) => {
    setSelectedMenuId(selectedMenuId === menuId ? null : menuId);
  };

  const handleModalOpen = (content) => {
    if (content.dishes) {
      setModalContent({ ...content, type: "menu" });
    } else {
      setModalContent({ ...content, type: "dish" });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return {
    weekNumber,
    menusAndDishes,
    handleMenuSelect,
    selectedMenuId,
    handleModalOpen,
    handleModalClose,
    modalContent,
    isModalOpen,
  };
};

export default useHome;
