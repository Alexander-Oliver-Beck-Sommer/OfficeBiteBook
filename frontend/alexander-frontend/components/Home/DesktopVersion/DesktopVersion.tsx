import MenusList from "@/components/Home/DesktopVersion/child-components/MenuList";

type DesktopVersionProps = {
  menus?: Array<any>;
  checkAll?: () => void;
  checkIndividual?: (menuId: string) => void;
};

const DesktopVersion = ({
  menus = [],
  checkAll = () => {},
  checkIndividual = () => {},
}: DesktopVersionProps) => {
  return (
    <section className="hidden lg:block">
      <MenusList
        menus={menus}
        checkAll={checkAll}
        checkIndividual={checkIndividual}
      />
    </section>
  );
};

export default DesktopVersion;
