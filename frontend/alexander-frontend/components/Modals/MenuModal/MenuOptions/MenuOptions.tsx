import data from "@/data/MenuModal.js";
import ActionButton from "@/components/Buttons/ActionButton";

type MenuOptionsProps = {
  selectTemplate: () => void;
  saveTemplate: () => void;
  selectMenu: () => void;
  saveMenu: () => void;
  deleteMenu: () => void;
};

const MenuOptions = ({
  selectTemplate,
  saveTemplate,
  selectMenu,
  saveMenu,
  deleteMenu,
}: MenuOptionsProps) => {
  return (
    <ul className="flex items-center gap-6 border-y-2 border-arsenic py-4">
      <li>
        <ActionButton
          icon="downArrow"
          name={data.controls_section.select_template.name}
          label={data.controls_section.select_template.label}
          toggle={selectTemplate}
        />
      </li>
      <li>
        <ActionButton
          icon="add"
          name={data.controls_section.save_template.name}
          label={data.controls_section.save_template.label}
          toggle={saveTemplate}
        />
      </li>
      <li>
        <ActionButton
          icon="downArrow"
          name={data.controls_section.select_menu.name}
          label={data.controls_section.select_menu.label}
          toggle={selectMenu}
        />
      </li>
      <li>
        <ActionButton
          icon="add"
          name={data.controls_section.save_menu.name}
          label={data.controls_section.save_menu.label}
          toggle={saveMenu}
        />
      </li>
      <li>
        <ActionButton
          icon="delete"
          name={data.controls_section.delete_menu.name}
          label={data.controls_section.delete_menu.label}
          toggle={deleteMenu}
        />
      </li>
    </ul>
  );
};

export default MenuOptions;
