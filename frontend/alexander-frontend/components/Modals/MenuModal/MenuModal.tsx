import { useEffect } from "react";
import HeaderBar from "@/components/Modals/MenuModal/HeaderBar/HeaderBar";
import MenuSettings from "@/components/Modals/MenuModal/MenuSettings/MenuSettings";
import Dish from "@/components/Modals/MenuModal/Dish/Dish";
import FooterBar from "@/components/Modals/MenuModal/FooterBar/FooterBar";
import useMenuModal from "@/hooks/useMenuModal"; // <== This is where the magic happens

type MenuModalProps = {
  menuModalTitle?: string;
  menuModalLocation?: string;
  menuModalDate?: string;
  menuModalStartTime?: string;
  menuModalEndTime?: string;
  menuModalVisibility: boolean;
  menuModalDishes?: [];
  menuModalToggle: () => void;
};

const MenuModal = ({
  menuModalTitle = "",
  menuModalLocation = "",
  menuModalDate = "",
  menuModalStartTime = "",
  menuModalEndTime = "",
  menuModalVisibility = false,
  menuModalDishes,
  menuModalToggle = () => {},
}: MenuModalProps) => {
  const {
    menuTitle,
    onTitleChange,
    menuLocation,
    onLocationChange,
    menuDate,
    onDateChange,
    menuStartTime,
    onStartTimeChange,
    menuEndTime,
    onEndTimeChange,
    dishTitle,
    onDishTitleChange,
    dishSubtitle,
    onDishSubtitleChange,
    dishDescription,
    onDishDescriptionChange,
    dishThumbnail,
    onDishThumbnailChange,
    dishes,
    clearAllDishes,
    createDish,
    deleteDish,
    toggleDish,
    expandedDish,
    validationState,
    cancelMenu,
    acceptMenu,
    updateDish,
  } = useMenuModal(
    menuModalDate,
    menuModalStartTime,
    menuModalVisibility,
    menuModalToggle,
  );

  // This useEffect hook is used to disable scrolling when the modal is open
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
          onClick={cancelMenu}
        ></section>
        <section
          className={`relative z-50 grid h-full w-full max-w-screen-xl grid-rows-auto1Xauto overflow-y-auto rounded border-2 border-arsenic bg-eerie_black ${
            menuModalVisibility ? "animate-fade-up animate-ease-in-out" : ""
          } `}
        >
          <HeaderBar
            headerBarTitle={menuModalTitle}
            headerBarClear={clearAllDishes}
            headerBarDelete={menuModalToggle}
          />
          <section className="grid grid-cols-30X70">
            <MenuSettings
              menuSettingsTitle={menuModalTitle}
              menuSettingsTitleChange={onTitleChange}
              menuSettingsLocation={menuModalLocation}
              menuSettingsLocationChange={onLocationChange}
              menuSettingsDate={menuModalDate}
              menuSettingsDateChange={onDateChange}
              menuSettingsStartTime={menuModalStartTime}
              menuSettingsStartTimeChange={onStartTimeChange}
              menuSettingsEndTime={menuModalEndTime}
              menuSettingsEndTimeChange={onEndTimeChange}
              menuSettingsValidation={validationState}
            />
            <div className="pattern relative overflow-scroll">
              <ul className="absolute inset-0 flex flex-col gap-8 px-8 py-8">
                {dishes.map((dish) => (
                  <Dish
                    key={dish.id}
                    dishCount={dishes.indexOf(dish) + 1}
                    dishTitle={dish.title}
                    dishTitleChange={(newTitle) =>
                      updateDish(dish.id, { title: newTitle })
                    }
                    dishSubtitle={dish.subtitle}
                    dishSubtitleChange={(newSubtitle) =>
                      updateDish(dish.id, { subtitle: newSubtitle })
                    }
                    dishDescription={dish.description}
                    dishDescriptionChange={(newDescription) =>
                      updateDish(dish.id, { description: newDescription })
                    }
                    dishThumbnail={dish.thumbnail}
                    dishThumbnailChange={(newThumbnail) =>
                      updateDish(dish.id, { thumbnail: newThumbnail })
                    }
                    dishOpen={expandedDish === dish.id}
                    dishDelete={() => deleteDish(dish.id)}
                    dishExpand={() => toggleDish(dish.id)}
                  />
                ))}
              </ul>
            </div>
          </section>
          <FooterBar
            footerBarCreateDish={createDish}
            footerBarCancelMenu={cancelMenu}
            footerBarAcceptMenu={acceptMenu}
          />
        </section>
      </div>
    </section>
  );
};

export default MenuModal;
