import TextInput from "../Inputs/TextInput";
import TransparentBackground from "../TransparentBackground";
import MenuControls from "./MenuControls/MenuControls";
import TitleBar from "./TitleBar/TitleBar";

const MenuModal = () => {
  return (
    <>
      <section className="border-menuModalBorder max-w-menuModalWidth max-h-menuModalHeight absolute left-0 right-0 m-auto flex w-full flex-col overflow-auto rounded border-davys_grey bg-gunmetal px-50 py-50">
        <section className="flex flex-col gap-25">
          <TitleBar />
          <MenuControls />
          <TextInput
            placeholder="Write a location for the menu"
            name="Location"
            label="Click to change the location of where the menu will take place"
          />
        </section>
      </section>
      <TransparentBackground />
    </>
  );
};

export default MenuModal;
