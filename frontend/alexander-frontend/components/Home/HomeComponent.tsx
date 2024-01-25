"use client";
import useHome from "@/hooks/useHome";
import QuestionIcon from "@/components/Icons/QuestionIcon";
import ActionButton from "@/components/Buttons/ActionButton";
import ToggleInput from "@/components/Inputs/ToggleInput";
import DishItem from "@/components/Home/DishItem";
import ContentModal from "@/components/Modals/ContentModal/ContentModal";
import ListItem from "@/components/Modals/ContentModal/ListItem/ListItem";
import ImageItem from "@/components/Modals/ContentModal/ImageItem/ImageItem";
import HeaderItem from "./HeaderItem";
import CheckboxInput from "../Inputs/CheckboxInput";
import DownArrowIcon from "../Icons/DownArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import LocationIcon from "../Icons/LocationIcon";
import TimeIcon from "../Icons/TimeIcon";
import RestaurantIcon from "../Icons/RestaurantIcon";
import InfoIcon from "../Icons/InfoIcon";
import UserAddIcon from "../Icons/UserAddIcon";
import ZoomIcon from "../Icons/ZoomIcon";
import CalendarIcon from "../Icons/CalendarIcon";

type HomeComponentProps = {
  userId?: string;
  userEmail?: string;
};

const HomeComponent = ({ userId = "", userEmail = "" }: HomeComponentProps) => {
  const {
    menusAndDishes,
    weekNumber,
    handleMenuSelect,
    selectedMenuId,
    handleModalOpen,
    handleModalClose,
    modalContent,
    isModalOpen,
  } = useHome(userId, userEmail);

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked);
  };

  return (
    <>
      <section className="h-full w-full bg-dark_charcoal">
        <HeaderItem
          subtitle="Previewing:"
          weekNumber={weekNumber}
          title="Week"
        />
        <section className="flex justify-center px-4 py-6 md:px-12">
          <ul className="flex w-full max-w-screen-lg flex-col gap-6 lg:grid lg:grid-cols-2">
            {menusAndDishes.map((menu) => (
              <li key={menu.menu_id} className="overflow-hidden rounded">
                <section className="grid grid-cols-autoX1 items-center gap-4 bg-strange_black p-4 md:px-8">
                  <CheckboxInput
                    label={menu.menu_title}
                    initialChecked={false}
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h6 className="text-cool_grey">{menu.menu_date}</h6>
                      <h4>{menu.menu_title}</h4>
                    </div>
                    <button
                      onClick={() => handleMenuSelect(menu.menu_id)}
                      className="lg:hidden"
                    >
                      <RightArrowIcon
                        className={` transition-all duration-300 ease-in-out ${
                          selectedMenuId === menu.menu_id
                            ? "rotate-90 fill-ghost_white"
                            : "fill-cool_grey"
                        }`}
                      />
                    </button>
                  </div>
                </section>
                <section
                  className={`grid bg-strange_black transition-all duration-300 ease-in-out ${
                    selectedMenuId === menu.menu_id
                      ? "visible grid-rows-[1fr] opacity-100"
                      : "invisible grid-rows-[0fr] opacity-0 lg:visible lg:grid-rows-[1fr] lg:opacity-100"
                  }`}
                >
                  <div className="grid gap-[1px] overflow-hidden lg:grid-cols-2">
                    <li className="grid grid-cols-2 bg-raisin_black p-4 md:px-8 lg:flex lg:flex-col lg:gap-2">
                      <h4>Location:</h4>
                      <div className="grid grid-cols-autoX1 items-center gap-2 fill-apple">
                        <LocationIcon className="h-5 w-5" />
                        <p className="truncate text-cool_grey">
                          {menu.menu_location}
                        </p>
                      </div>
                    </li>
                    <li className="grid grid-cols-2 bg-raisin_black p-4 md:px-8 lg:flex lg:flex-col lg:gap-2">
                      <h4>Date:</h4>
                      <div className="flex items-center gap-2 fill-apple">
                        <CalendarIcon className="h-5 w-5" />
                        <p className="text-cool_grey">{menu.menu_date}</p>
                      </div>
                    </li>
                    <li className="grid grid-cols-2 bg-raisin_black p-4 md:px-8 lg:flex lg:flex-col lg:gap-2">
                      <h4>Hours:</h4>
                      <div className="flex items-center gap-2 fill-apple">
                        <TimeIcon className="h-5 w-5" />
                        <p className="text-cool_grey">
                          {menu.menu_start_time} - {menu.menu_end_time}
                        </p>
                      </div>
                    </li>
                    <li className="grid grid-cols-2 bg-raisin_black p-4 md:px-8 lg:flex lg:flex-col lg:gap-2">
                      <h4>Dishes:</h4>
                      <div className="flex items-center gap-2 fill-apple">
                        <RestaurantIcon className="h-5 w-5" />
                        <p className="text-cool_grey">
                          {menu.menu_dishes_amount} items
                        </p>
                      </div>
                    </li>
                    <li className="bg-strange_black fill-ghost_white p-4 text-ghost_white md:px-8 lg:col-span-2">
                      <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-full border border-arsenic bg-arsenic md:flex md:justify-end md:gap-8 md:overflow-visible md:rounded-none md:border-none md:bg-transparent lg:justify-start">
                        <button className="group relative flex items-center justify-center gap-2 bg-eerie_black fill-apple px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:bg-apple hover:fill-eerie_black hover:text-eerie_black focus-visible:bg-apple focus-visible:fill-eerie_black focus-visible:text-eerie_black md:bg-transparent md:fill-cool_grey md:p-0 md:text-cool_grey md:hover:bg-transparent md:hover:fill-apple md:hover:text-ghost_white">
                          <UserAddIcon className="h-5 w-5" />
                          <p>Guestlist</p>
                          <div className="absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full bg-arsenic opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-apple group-hover:opacity-100 md:block"></div>
                        </button>
                        <button className="group relative flex items-center justify-center gap-2 bg-eerie_black fill-apple px-4 py-2 outline-none transition-all duration-300 ease-in-out hover:bg-apple hover:fill-eerie_black hover:text-eerie_black focus-visible:bg-apple focus-visible:fill-eerie_black focus-visible:text-eerie_black md:bg-transparent md:fill-cool_grey md:p-0 md:text-cool_grey md:hover:bg-transparent md:hover:fill-apple md:hover:text-ghost_white">
                          <ZoomIcon className="h-5 w-5" />
                          <p>Read More</p>
                          <div className="absolute -bottom-[7px] left-0 hidden h-[3px] w-0 rounded-full bg-arsenic opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-apple group-hover:opacity-100 md:block"></div>
                        </button>
                      </div>
                    </li>
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
    // <>
    //   <section className="full-height flex animate-fade-up items-stretch justify-center px-4 py-8 animate-ease-in-out md:px-12">
    //     <section className="flex w-full max-w-3xl flex-col gap-6">
    //       <div className="border-b-2 border-b-apple px-1 pb-4">
    //         <div className="flex items-center justify-between gap-4">
    //           <div className="flex items-end gap-1">
    //             <h4 className="font-light text-cool_grey">Presenting:</h4>
    //             <h3>WEEK {weekNumber}</h3>
    //           </div>
    //           <button
    //             className="fill-apple"
    //             title="Open and learn more"
    //             aria-label="Open and learn more"
    //           >
    //             <QuestionIcon className="h-7 w-7" />
    //           </button>
    //         </div>
    //       </div>
    //       <ul className="flex flex-col gap-4">
    //         {menusAndDishes.map((menu) => (
    //           <li key={menu.menu_id}>
    //             <div className="animate-fade-down overflow-hidden rounded border border-arsenic bg-dark_charcoal shadow-sm animate-ease-in-out">
    //               <header className="grid grid-cols-autoX1 gap-4 bg-eerie_black px-3 py-3">
    //                 <div className="flex h-12 w-6 items-center justify-center">
    //                   <ToggleInput className="-rotate-90" />
    //                 </div>
    //                 <div className="grid grid-cols-autoX1 gap-4">
    //                   <div
    //                     className="flex cursor-pointer flex-col gap-1 overflow-hidden "
    //                     onClick={() => handleModalOpen(menu)}
    //                   >
    //                     <h4 className="truncate underline underline-offset-2">
    //                       {menu.menu_title}
    //                     </h4>
    //                     <h6 className="text-cool_grey underline underline-offset-2">
    //                       {menu.menu_date}
    //                     </h6>
    //                   </div>
    //                   <div className="flex items-center justify-end">
    //                     <ActionButton
    //                       variant="icon-small"
    //                       icon="downArrow"
    //                       toggle={() => handleMenuSelect(menu.menu_id)}
    //                     />
    //                   </div>
    //                 </div>
    //               </header>
    //               <section
    //                 className={`grid bg-raisin_black transition-all duration-300 ease-in-out ${
    //                   selectedMenuId === menu.menu_id
    //                     ? "visible grid-rows-[1fr] opacity-100"
    //                     : "invisible grid-rows-[0fr] opacity-0"
    //                 }`}
    //               >
    //                 <div className="overflow-hidden">
    //                   <ul>
    //                     {menu.dishes.map((dish) => (
    //                       <DishItem
    //                         key={dish.dish_id}
    //                         title={dish.dish_title}
    //                         subtitle={dish.dish_subtitle}
    //                         description={dish.dish_description}
    //                         thumbnail={dish.dish_thumbnail}
    //                         toggle={() => handleModalOpen(dish)}
    //                       />
    //                     ))}
    //                   </ul>
    //                 </div>
    //               </section>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </section>
    //   </section>
    //   <ContentModal
    //     title={
    //       modalContent
    //         ? modalContent.type === "menu"
    //           ? `Menu Details`
    //           : `Dish Details`
    //         : `No Details`
    //     }
    //     label={
    //       modalContent
    //         ? modalContent.type === "menu"
    //           ? `Menu Details`
    //           : `Dish Details`
    //         : `No Details`
    //     }
    //     visible={isModalOpen}
    //     toggle={handleModalClose}
    //   >
    //     {modalContent ? (
    //       <>
    //         {modalContent.type === "menu" && (
    //           <div className="bg-raisin_black">
    //             <ListItem name="Title" value={modalContent?.menu_title} />
    //             <ListItem name="Place" value={modalContent?.menu_location} />
    //             <ListItem name="Date" value={modalContent?.menu_date} />
    //             <ListItem
    //               name="Time"
    //               value={`${modalContent?.menu_start_time} - ${modalContent?.menu_end_time}`}
    //             />
    //           </div>
    //         )}
    //         {modalContent.type === "dish" && (
    //           <div className="bg-raisin_black">
    //             <ListItem name="Title" value={modalContent?.dish_title} />
    //             <ListItem name="Subtitle" value={modalContent?.dish_subtitle} />
    //             <ListItem
    //               variant="y-direction"
    //               name="Description"
    //               value={modalContent?.dish_description}
    //             />
    //             <ImageItem imageURL={modalContent?.dish_thumbnail} />
    //           </div>
    //         )}
    //       </>
    //     ) : (
    //       <p>No content is currently selected.</p>
    //     )}
    //   </ContentModal>
    // </>
  );
};

export default HomeComponent;
