import React, { useState } from "react";
import TransparentBackground from "../TransparentBackground";
import MenuControls from "./MenuControls/MenuControls";
import TitleBar from "./TitleBar/TitleBar";
import LocationForm from "./LocationForm/LocationForm";
import CreateImportDish from "./CreateImportDish.tsx/CreateImportDish";
import ActionButton from "../Buttons/ActionButton";
import Dish from "@/components/MenuModal/Dish/Dish";

const MenuModal = () => {
  return (
    <>
      <section className="absolute left-0 right-0 m-auto flex max-h-menuModalHeight w-full max-w-menuModalWidth flex-col gap-50 overflow-auto rounded border-menuModalBorder border-davys_grey bg-gunmetal px-50 py-50">
        <section className="flex flex-col gap-25">
          <TitleBar />
          <MenuControls />
          <LocationForm />
        </section>
        <Dish />
        <CreateImportDish />
        <section className="flex items-center justify-end gap-10">
          <ActionButton
            variant="outlined"
            name="Cancel"
            label="Click to cancel"
            icon="cancel"
          />
          <ActionButton
            variant="filled"
            name="Accept"
            label="Click to accept"
            icon="check"
          />
        </section>
      </section>
      <TransparentBackground />
    </>
  );
};

export default MenuModal;
