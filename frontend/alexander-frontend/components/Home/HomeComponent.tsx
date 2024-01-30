"use client";
import useHome from "@/hooks/useHome";
import HeaderBar from "@/components/Home/HeaderBar/HeaderBar";
import MobileVersion from "@/components/Home/MobileVersion/MobileVersion";
import DesktopVersion from "@/components/Home/DesktopVersion/DesktopVersion";

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

  return (
    <section className="fill-body pattern">
      <HeaderBar weekNumber={weekNumber} />
      <MobileVersion
        menus={menusAndDishes}
        accordionId={selectedMenuId}
        handleAccordion={handleMenuSelect}
      />
      <DesktopVersion menus={menusAndDishes} />
    </section>
  );
};

export default HomeComponent;
