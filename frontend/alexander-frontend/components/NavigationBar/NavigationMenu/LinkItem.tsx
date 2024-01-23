import Link from "next/link";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

type LinkItemProps = {
  label?: string;
  href?: string;
  icon?: React.ReactNode;
  toggle?: () => void;
};

const LinkItem = ({
  label = "",
  href = "/",
  icon = null,
  toggle = () => {},
}: LinkItemProps) => {
  return (
    <li>
      <Link
        onClick={toggle}
        href={href}
        aria-label={label}
        className="lg:border-b-0-none group relative flex items-center justify-between gap-4 border-b border-dark_charcoal p-4 transition-all duration-300 ease-in-out hover:bg-raisin_black md:px-12 lg:border-0 lg:p-0 lg:hover:bg-transparent"
      >
        <div className="flex items-center gap-4 fill-apple transition-colors duration-300 ease-in-out lg:gap-2 lg:fill-cool_grey group-hover:lg:fill-apple">
          {icon}
          <h4 className="transition-colors duration-300 ease-in-out lg:text-cool_grey group-hover:lg:text-ghost_white">
            {label}
          </h4>
        </div>
        <div className="flex w-12 justify-center fill-apple lg:hidden">
          <RightArrowIcon />
        </div>
        <div className="pointer-events-none absolute -bottom-[10px] hidden h-[3px] w-0 rounded bg-cool_grey opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-apple group-hover:opacity-100 lg:block"></div>
      </Link>
    </li>
  );
};

export default LinkItem;
