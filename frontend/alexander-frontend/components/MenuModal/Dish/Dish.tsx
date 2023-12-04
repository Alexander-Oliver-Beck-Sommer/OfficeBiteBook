import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import EditableTitle from "@/components/Inputs/EditableTitle";

type DishProps = {
  label: string;
};

const Dish = ({ label }: DishProps) => {
  return (
    <section aria-label={label} className="flex flex-col gap-24">
      <header className="flex items-center justify-between border-b-2 border-davys_grey pb-24">
        <div className="flex items-center gap-8">
          <h2 className="font-medium text-cool_grey">#1</h2>
          <EditableTitle
            placeholder="Edit Dish Name"
            heading="h3"
            label="Click to change the name of the dish"
          />
        </div>
        <div className="flex items-center gap-24">
          <ActionButton
            label="Save the dish to the archive"
            name="Archive"
            icon="add"
          />
          <ActionButton
            label="Replace with dish from archive"
            name="Replace"
            icon="cycle"
          />
          <ActionButton
            label="Delete dish from menu"
            name="Delete"
            icon="delete"
          />
        </div>
      </header>
      <section className="grid grid-cols-2 gap-24">
        <TextInput type="text" label="Click to change the title of the dish" name="Title" placeholder="Title"/>
        <TextInput type="text" label="Click to change the subtitle of the dish" name="Subtitle" placeholder="Subtitle"/>
      </section>
    </section>
  );
};

export default Dish;
