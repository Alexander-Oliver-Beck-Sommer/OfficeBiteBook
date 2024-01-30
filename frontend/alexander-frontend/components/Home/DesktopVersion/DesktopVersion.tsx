import MenusList from "@/components/Home/DesktopVersion/child-components/MenuList";

type DesktopVersionProps = {
  menus?: Array<any>;
  checkboxAll?: () => void;
  checkboxAllChecked?: boolean;
};

const DesktopVersion = ({
  menus = [],
  checkboxAll = () => {},
  checkboxAllChecked = false,
}: DesktopVersionProps) => {
  return (
    <section className="hidden lg:block">
      <MenusList
        menus={menus}
        checkboxAll={checkboxAll}
        checkboxAllChecked={checkboxAllChecked}
      />
    </section>
  );
};

export default DesktopVersion;
