import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";

type MenuModalProps = {
  menuModalTitle: string;
  menuModalTitleChange: string;
  menuModalTitleValid: boolean;
  menuModalLocation: string;
  menuModalLocationChange: string;
  menuModalLocationValid: boolean;
  menuModalDate: string;
  menuModalDateChange: string;
  menuModalDateValid: boolean;
  menuModalStartTime: string;
  menuModalStartTimeChange: string;
  menuModalStartTimeValid: boolean;
  menuModalEndTime: string;
  menuModalEndTimeChange: string;
  menuModalEndTimeValid: boolean;
  menuModalVisibility: boolean;
  menuModalCancel: () => void;
  menuModalDishes: [];
};

const MenuModal = ({
  menuModalTitle,
  menuModalTitleChange,
  menuModalTitleValid,
  menuModalLocation,
  menuModalLocationChange,
  menuModalLocationValid,
  menuModalDate,
  menuModalDateChange,
  menuModalDateValid,
  menuModalStartTime,
  menuModalStartTimeChange,
  menuModalStartTimeValid,
  menuModalEndTime,
  menuModalEndTimeChange,
  menuModalEndTimeValid,
  menuModalVisibility,
  menuModalCreate,
  menuModalDishCreate,
  menuModalDishUpdate,
  menuModalEraseDishes,
  menuModalEraseDishesDisabled,
  menuModalDishDelete,
  menuModalDelete,
  menuModalDeleteDisabled,
  menuModalCancel,
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
          className="hover:bg-dark-200 absolute inset-0 z-40 cursor-pointer bg-dark-100 opacity-95 transition-all duration-300 ease-in-out"
          onClick={menuModalCancel}
        ></section>
        <section
          className={`border-dark-500 relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 bg-dark-100 ${
            menuModalVisibility
              ? "animate-fade-up animate-ease-in-out"
              : "invisible opacity-0"
          } `}
        >
          <HeaderBar
            headerBarTitle={menuModalTitle}
            headerBarDish={menuModalDishCreate}
            headerBarErase={menuModalEraseDishes}
            headerBarEraseDisabled={menuModalEraseDishesDisabled}
            headerBarDelete={menuModalDelete}
            headerBarDeleteDisabled={menuModalDeleteDisabled}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              menuSettingsTitle={menuModalTitle}
              menuSettingsTitleChange={menuModalTitleChange}
              menuSettingsTitleValid={menuModalTitleValid}
              menuSettingsLocation={menuModalLocation}
              menuSettingsLocationChange={menuModalLocationChange}
              menuSettingsLocationValid={menuModalLocationValid}
              menuSettingsDate={menuModalDate}
              menuSettingsDateChange={menuModalDateChange}
              menuSettingsDateValid={menuModalDateValid}
              menuSettingsStartTime={menuModalStartTime}
              menuSettingsStartTimeChange={menuModalStartTimeChange}
              menuSettingsStartTimeValid={menuModalStartTimeValid}
              menuSettingsEndTime={menuModalEndTime}
              menuSettingsEndTimeChange={menuModalEndTimeChange}
              menuSettingsEndTimeValid={menuModalEndTimeValid}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {menuModalDishes.map((dish) => (
                  <Dish
                    key={dish.dish_id}
                    dishCount={menuModalDishes.indexOf(dish) + 1}
                    dishTitle={dish.dish_title}
                    dishTitleChange={(newTitle) =>
                      menuModalDishUpdate(dish.dish_id, {
                        dish_title: newTitle,
                      })
                    }
                    dishSubtitle={dish.dish_subtitle}
                    dishSubtitleChange={(newSubtitle) =>
                      menuModalDishUpdate(dish.dish_id, {
                        dish_subtitle: newSubtitle,
                      })
                    }
                    dishDescription={dish.dish_description}
                    dishDescriptionChange={(newDescription) =>
                      menuModalDishUpdate(dish.dish_id, {
                        dish_description: newDescription,
                      })
                    }
                    dishThumbnailValue={dish.dish_thumbnail_value}
                    dishThumbnailValueChange={(newValue) => {
                      console.log(newValue);
                      menuModalDishUpdate(dish.dish_id, {
                        dish_thumbnail_value: newValue,
                      });
                    }}
                    dishThumbnailFile={dish.dish_thumbnail_file}
                    dishThumbnailFileChange={(newFile) =>
                      menuModalDishUpdate(dish.dish_id, {
                        dish_thumbnail_file: newFile,
                      })
                    }
                    dishThumbnailUrl={dish.dish_thumbnail_url}
                    dishThumbnailUrlChange={(newUrl) =>
                      menuModalDishUpdate(dish.dish_id, {
                        dish_thumbnail_url: newUrl,
                      })
                    }
                    dishDelete={() => menuModalDishDelete(dish.dish_id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar
            footerBarCancelMenu={menuModalCancel}
            footerBarAcceptMenu={menuModalCreate}
          />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
