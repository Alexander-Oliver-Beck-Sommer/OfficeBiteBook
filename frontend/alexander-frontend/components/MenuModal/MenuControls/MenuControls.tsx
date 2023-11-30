import MenuOptions from "./child-components/MenuOptions";
import RemoveOptions from "./child-components/RemoveOptions";
import TemplateOptions from "./child-components/TemplateOptions";

const MenuControls = () => {
  return (
    <ul className="flex items-center gap-25 border-y-2 border-davys_grey py-15">
      <li>
        <TemplateOptions />
      </li>
      <li>
        <MenuOptions />
      </li>
      <li>
        <RemoveOptions />
      </li>
    </ul>
  );
};

export default MenuControls;
