import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";

type MenuModalProps = {
  menuModalTitle: string;
  menuModalTitleChange: string;
  menuModalLocation: string;
  menuModalLocationChange: string;
  menuModalVisibility: boolean;
  menuModalDateChange: string;
  menuModalDate: string;
  menuModalDate: string;
  menuModalStartTime: string;
  menuModalStartTimeChange: string;
  menuModalEndTime: string;
  menuModalEndTimeChange: string;
  menuModalClose: () => void;
  menuModalDishes: [];
};

const MenuModal = ({
  menuModalTitle,
  menuModalTitleChange,
  menuModalLocation,
  menuModalLocationChange,
  menuModalDate,
  menuModalDateChange,
  menuModalStartTime,
  menuModalStartTimeChange,
  menuModalEndTime,
  menuModalEndTimeChange,
  menuModalVisibility,
  menuModalCreate,
  menuModalDishCreate,
  menuModalDishUpdate,
  menuModalDelete,
  menuModalClose,
  menuModalDishes,
}: MenuModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (menuModalVisibility) {
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
  }, [menuModalVisibility]);

  return (
    <section
      aria-hidden={!menuModalVisibility}
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        menuModalVisibility ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className="relative flex h-full w-full items-center justify-center px-10 py-10 lg:px-12 lg:py-12">
        <section
          className="absolute inset-0 z-40 cursor-pointer bg-eerie_black opacity-95 transition-all duration-300 ease-in-out hover:bg-strange_black"
          onClick={menuModalClose}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-arsenic bg-eerie_black ${
            menuModalVisibility ? "animate-fade-up animate-ease-in-out" : ""
          } `}
        >
          <HeaderBar
            headerBarTitle={menuModalTitle}
            headerBarDelete={menuModalDelete}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              menuSettingsTitle={menuModalTitle}
              menuSettingsTitleChange={menuModalTitleChange}
              menuSettingsLocation={menuModalLocation}
              menuSettingsLocationChange={menuModalLocationChange}
              menuSettingsDate={menuModalDate}
              menuSettingsDateChange={menuModalDateChange}
              menuSettingsStartTime={menuModalStartTime}
              menuSettingsStartTimeChange={menuModalStartTimeChange}
              menuSettingsEndTime={menuModalEndTime}
              menuSettingsEndTimeChange={menuModalEndTimeChange}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {menuModalDishes.map((dish) => (
                  <Dish
                    key={dish.dish_id}
                    dishCount={menuModalDishes.indexOf(dish) + 1}
                    dishTitle={dish.dish_title}
                    dishTitleChange={(newTitle) => menuModalDishUpdate(dish.dish_id, { dish_title: newTitle })} /* prettier-ignore */
                    dishSubtitle={dish.dish_subtitle}
                    dishSubtitleChange={(newSubtitle) => menuModalDishUpdate(dish.dish_id, { dish_subtitle: newSubtitle })} /* prettier-ignore */
                    dishDescription={dish.dish_description}
                    dishDescriptionChange={(newDescription) => menuModalDishUpdate(dish.dish_id, { dish_description: newDescription })} /* prettier-ignore */
                    dishThumbnail={dish.dish_thumbnail}
                    dishThumbnailChange={(newThumbnail) => menuModalDishUpdate(dish.dish_id, { dish_thumbnail: newThumbnail})} /* prettier-ignore */
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar
            footerBarDishCreate={menuModalDishCreate}
            footerBarAcceptMenu={menuModalCreate}
          />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
