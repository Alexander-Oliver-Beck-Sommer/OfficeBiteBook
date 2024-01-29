import LinkItem from "@/components/NavigationBar/NavigationMenu/LinkItem";
import HomeIcon from "@/components/Icons/HomeIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import LogIcon from "@/components/icons/LogIcon";
import AccountIcon from "@/components/Icons/AccountIcon";

type NavigationMenuProps = {
  visible?: boolean;
  label?: string;
  toggle?: () => void;
};

const NavigationMenu = ({
  visible = false,
  label = "",
  toggle = () => {},
}: NavigationMenuProps) => {
  const visibleStyles = visible
    ? "opacity-100 visible max-w-full"
    : "opacity-0 invisible max-w-0";

  return (
    <nav
      aria-hidden={!visible}
      aria-label={label}
      className={`bg-dark-200 absolute bottom-0 left-0 top-header_height z-50 flex w-full items-stretch overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${visibleStyles}`}
    >
      <ul className="w-full overflow-auto">
        <LinkItem label="Home" href="/" icon={<HomeIcon />} toggle={toggle} />
        <LinkItem
          label="Calendar"
          href="/calendar"
          icon={<CalendarIcon />}
          toggle={toggle}
        />
        <LinkItem
          label="Profile"
          href="/profile"
          icon={<AccountIcon />}
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

export default NavigationMenu;
