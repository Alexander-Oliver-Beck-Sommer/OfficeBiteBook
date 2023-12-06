type MobileNavProps = {
  style: string;
};

const MobileNav = ({ style }: MobileNavProps) => {
  return (
    <nav
      className={`absolute bottom-0 left-0 top-header_height z-30 box-content w-0 max-w-[80%] border-r-2 border-davys_grey bg-dark_gunmetal transition-all duration-300 ease-in-out lg:hidden ${style}`}
    ></nav>
  );
};

export default MobileNav;
