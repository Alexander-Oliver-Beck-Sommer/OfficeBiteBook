import IconButton from "@/components/IconButton";
import useUtilities from "@/hooks/useUtilities";
import { useState } from "react";
import useDateCalculator from "@/hooks/useDateCalculator";
import ImageButton from "@/components/Buttons/ImageButton";
import Dish from "./Dish";
import Details from "./Details";
import Header from "./Header";
import ContentModal from "@/components/ContentModal";

type ModalProps = {
  visibility: boolean;
  menu: any;
  onClose: () => void;
};

const Modal = ({ visibility, menu, onClose }: ModalProps) => {
  const [openDishId, setOpenDishId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { formatDate } = useDateCalculator();
  const { disableBodyScroll } = useUtilities();
  disableBodyScroll(visibility);

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
    <ContentModal
      visibility={visibility}
      toggle={onClose}
      title={menu && menu.menu_title}
    >
      {menu && (
        <Details
          location={menu.menu_location}
          date={formatDate(menu.menu_date)}
          startTime={menu.menu_start_time}
          endTime={menu.menu_end_time}
          isDetailsOpen={isDetailsOpen}
          toggle={detailsExpand}
        />
      )}

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
              recipe={dish.dish_recipe}
              thumbnailUrl={dish.dish_thumbnail_url}
              accordionOpen={openDishId === dish.dish_id}
              accordionToggle={() => toggleDish(dish.dish_id)}
            />
          ))}
      </ul>
    </ContentModal>
  );
};
export default Modal;
