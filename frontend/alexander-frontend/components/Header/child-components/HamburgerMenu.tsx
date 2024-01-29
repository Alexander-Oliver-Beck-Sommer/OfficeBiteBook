import LinkItem from "@/components/Header/child-components/LinkItem";
import HomeIcon from "@/components/Icons/HomeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import LogIcon from "@/components/icons/LogIcon";

type HamburgerMenuProps = {
  visible?: boolean;
  toggle?: () => void;
};

const HamburgerMenu = ({
  visible = false,
  toggle = () => {},
}: HamburgerMenuProps) => {
  const visibleStyles = visible
    ? "opacity-100 visible max-w-full"
    : "opacity-0 invisible max-w-0";

  return (
    <nav
      aria-hidden={!visible}
      aria-label="Navigation menu"
      className={`absolute bottom-0 left-0 top-header_height z-50 flex w-full items-stretch overflow-hidden bg-dark-200 transition-all duration-300 ease-in-out lg:hidden ${visibleStyles}`}
    >
      <ul className="w-full overflow-auto">
        <LinkItem label="Home" href="/" icon={<HomeIcon />} toggle={toggle} />
        <LinkItem
          label="Calendar"
          href="/calendar"
          icon={<CalendarIcon variant="fullWeek" />}
          toggle={toggle}
        />
        <LinkItem
          label="Profile"
          href="/profile"
          icon={<ProfileIcon />}
          toggle={toggle}
        />
        <LinkItem
          label="Login"
          href="/login"
          icon={<LogIcon variant="login" />}
          toggle={toggle}
        />
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
