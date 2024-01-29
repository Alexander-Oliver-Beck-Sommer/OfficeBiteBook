type MenusListProps = {
  menus?: Array<any>;
};

const MenusList = ({ menus }: MenusListProps) => {
  return (
    <ul className="flex flex-col items-center p-4 md:p-12">
      {menus.map((menu) => (
        <li key={menu.menu_id} className="w-full max-w-screen-xl border"></li>
      ))}
    </ul>
  );
};

export default MenusList;
