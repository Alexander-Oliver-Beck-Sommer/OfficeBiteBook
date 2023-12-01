import React, { useState } from "react";
import TransparentBackground from "../TransparentBackground";
import MenuControls from "./MenuControls/MenuControls";
import TitleBar from "./TitleBar/TitleBar";
import LocationForm from "./LocationForm/LocationForm";
import CreateImportDish from "./CreateImportDish.tsx/CreateImportDish";

const MenuModal = () => {
  return (
    <>
      <section className="absolute left-0 right-0 m-auto flex max-h-menuModalHeight w-full max-w-menuModalWidth flex-col gap-50 overflow-auto rounded border-menuModalBorder border-davys_grey bg-gunmetal px-50 py-50">
        <section className="flex flex-col gap-25">
          <TitleBar />
          <MenuControls />
          <LocationForm />
        </section>
        <CreateImportDish />
        {/* <section className="flex items-center justify-end gap-10">
          <button>Cancel</button>
          <button>Create</button>
        </section> */}
      </section>
      <TransparentBackground />
    </>
  );
};

export default MenuModal;
