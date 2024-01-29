"use client";
import useHome from "@/hooks/useHome";
import HeaderItem from "./HeaderItem";
import MobileVersion from "./MobileVersion/MobileVersion";
import DesktopVersion from "./DesktopVersion/DesktopVersion";
import ComputerVersion from "./ComputerVersion/ComputerVersion";

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
      <section className="block h-full w-full lg:hidden">
        <HeaderItem
          subtitle="Previewing:"
          weekNumber={weekNumber}
          title="Week"
        />
        <section className="px-4 py-6 md:px-12">
          <ul className="flex flex-col gap-6 lg:hidden">
            {menusAndDishes.map((menu) => (
              <MobileVersion
                key={`mobile-${menu.menu_id}`}
                menu={menu}
                checkboxToggle={handleCheckboxChange}
                accordionToggle={() => handleMenuSelect(menu.menu_id)}
                selectedMenuId={selectedMenuId}
              />
            ))}
          </ul>
          {/* <DesktopVersion menu={menusAndDishes} /> */}
        </section>
      </section>
      <ComputerVersion weekNumber={weekNumber} menus={menusAndDishes} />
    </>
  );
};

export default HomeComponent;
