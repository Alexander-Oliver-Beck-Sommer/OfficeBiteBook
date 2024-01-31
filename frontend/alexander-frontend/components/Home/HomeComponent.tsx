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
    handleAccordion,
    accordionId,
    checkAll,
    checkIndividual,
  } = useHome(userId, userEmail);

  return (
    <section className="fill-body pattern">
      <HeaderBar weekNumber={weekNumber} />
      <MobileVersion
        menus={menusAndDishes}
        accordionId={accordionId}
        handleAccordion={handleAccordion}
        checkAll={checkAll}
        checkIndividual={checkIndividual}
      />
      <DesktopVersion
        menus={menusAndDishes}
        checkAll={checkAll}
        checkIndividual={checkIndividual}
      />
    </section>
  );
};

export default HomeComponent;
