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
        className="lg:border-b-0-none hover:bg-dark-300 border-dark-400 group relative flex items-center justify-between gap-4 border-b p-4 transition-all duration-300 ease-in-out md:px-12 lg:border-0 lg:p-0 lg:hover:bg-transparent"
      >
        <div className="lg:fill-grey fill-primary group-hover:lg:fill-primary flex items-center gap-4 transition-colors duration-300 ease-in-out lg:gap-2">
          {icon}
          <h4 className="lg:text-grey group-hover:lg:text-white transition-colors duration-300 ease-in-out">
            {label}
          </h4>
        </div>
        <div className="fill-primary flex w-12 justify-center lg:hidden">
          <RightArrowIcon />
        </div>
        <div className="bg-grey group-hover:bg-primary pointer-events-none absolute -bottom-[10px] hidden h-[3px] w-0 rounded opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100 lg:block"></div>
      </Link>
    </li>
  );
};

export default LinkItem;
