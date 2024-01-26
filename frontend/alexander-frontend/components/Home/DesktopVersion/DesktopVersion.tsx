import MenuItem from "./MenuItem";
import ListItem from "./ListItem";

type DesktopVersionProps = {
  menu?: Array<string>;
};

const DesktopVersion = ({ menu = null }: DesktopVersionProps) => {
  return (
    <section className="hidden justify-center lg:flex">
      <div className="flex w-full max-w-screen-lg flex-col gap-4 rounded bg-eerie_black px-6 py-8">
        <MenuItem />
        <div className="h-[2px] rounded-full bg-apple"></div>
        {menu.map((menu) => (
          <ListItem menu={menu} />
        ))}
      </div>
    </section>
  );
};

export default DesktopVersion;
