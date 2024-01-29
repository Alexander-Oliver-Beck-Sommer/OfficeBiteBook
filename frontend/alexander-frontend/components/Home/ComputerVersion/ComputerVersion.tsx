import HeaderBar from "./child-components/HeaderBar";
import MenusList from "./child-components/Menuslist";

type ComputerVersionProps = {
  weekNumber?: number;
  menus?: Array<any>;
};

const ComputerVersion = ({
  weekNumber = 0,
  menus = [],
}: ComputerVersionProps) => {
  return (
    <section className="absolute inset-0 top-header_height hidden lg:flex">
      <div className="pattern flex-1">
        <HeaderBar weekNumber={weekNumber} />
        <MenusList menus={menus} />
      </div>
    </section>
  );
};

export default ComputerVersion;
 