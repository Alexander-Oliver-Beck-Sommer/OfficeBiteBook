type MobileNavProps = {
  style?: string;
  visible?: boolean;
};

const MobileNav = ({ style = "", visible }: MobileNavProps) => {
  return (
    <nav
      aria-hidden={!visible}
      className={`absolute bottom-0 left-0 top-header_height z-30 box-content w-0 max-w-[80%] border-r-2 border-arsenic bg-eerie_black transition-all duration-300 ease-in-out lg:hidden ${style}`}
    ></nav>
  );
};

export default MobileNav;
