import LinkItem from "@/components/Header/LinkItem";
import ProfileIcon from "@/components/Icons/ProfileIcon";
import LogIcon from "@/components/icons/LogIcon";
import OfficeIcon from "../Icons/OfficeIcon";

type HamburgerMenuProps = {
  visible?: boolean;
  toggle?: () => void;
  user?: boolean;
};

const HamburgerMenu = ({
  visible = false,
  toggle = () => {},
  user,
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
        {user && (
          <LinkItem
            label="Departments"
            href="/"
            icon={<OfficeIcon />}
            toggle={toggle}
          />
        )}
        {user && (
          <LinkItem
            label="Profile"
            href="/profile"
            icon={<ProfileIcon />}
            toggle={toggle}
          />
        )}
        <LinkItem
          label="Login"
          href="/login"
          icon={<LogIcon variant={user ? "logout" : "login"} />}
          toggle={toggle}
        />
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
