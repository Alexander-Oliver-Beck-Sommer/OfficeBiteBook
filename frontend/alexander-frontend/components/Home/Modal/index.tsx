import IconButton from "@/components/Buttons/IconButton";
import { useEffect, useState } from "react";
import useDateCalculator from "@/hooks/useDateCalculator";
import ImageButton from "@/components/Buttons/ImageButton";
import Dish from "./Dish";
import Details from "./Details";
import Header from "./Header";

type ModalProps = {
  isVisible: boolean;
  menu: any;
  onClose: () => void;
};

const Modal = ({ isVisible, menu, onClose }: ModalProps) => {
  const [openDishId, setOpenDishId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { formatDate } = useDateCalculator();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isVisible]);

  const detailsExpand = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const toggleDish = (dishId: string) => {
    if (openDishId === dishId) {
      setOpenDishId(null);
    } else {
      setOpenDishId(dishId);
    }
  };

  return (
    <section
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        isVisible ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center p-4 md:px-12 md:py-8 lg:p-12">
        <div
          className="absolute inset-0 z-40 bg-dark-100 opacity-95 transition-all duration-300 ease-in-out hover:bg-dark-200"
          onClick={onClose}
        ></div>
        <section
          className={`pattern relative z-50 flex h-full w-full max-w-screen-xl flex-col overflow-y-auto rounded border-2 border-dark-500 ${
            isVisible
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <Header title={menu && menu.menu_title} toggle={onClose} />
          <Details
            location={menu && menu.menu_location}
            date={menu && formatDate(menu.menu_date)}
            startTime={menu && menu.menu_start_time}
            endTime={menu && menu.menu_end_time}
            isDetailsOpen={isDetailsOpen}
            toggle={detailsExpand}
          />
          <ul className="grid flex-1 auto-rows-max gap-12 overflow-auto px-4 py-8 md:p-8 lg:grid-cols-2 lg:gap-8">
            {menu &&
              menu.dishes.length > 0 &&
              menu.dishes.map((dish, index) => (
                <Dish
                  key={dish.dish_id}
                  count={index + 1}
                  title={dish.dish_title}
                  subtitle={dish.dish_subtitle}
                  description={dish.dish_description}
                  thumbnailUrl={dish.dish_thumbnail_url}
                  accordionOpen={openDishId === dish.dish_id}
                  accordionToggle={() => toggleDish(dish.dish_id)}
                />
              ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
export default Modal;
