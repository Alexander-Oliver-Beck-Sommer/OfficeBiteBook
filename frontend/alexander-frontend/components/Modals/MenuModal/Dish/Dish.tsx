"use client";
import React, { useState } from "react";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import EditableTitle from "@/components/Inputs/EditableTitle";
import TextArea from "@/components/Inputs/TextArea";
import ChooseThumbnail from "./child-components/ChooseThumbnail";

type DishProps = {
  label: string;
};

const Dish = ({ label }: DishProps) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  return (
    <li aria-label={label} className="gap-6 flex flex-col">
      <header className="pb-6 border-arsenic flex items-center justify-between border-b-2">
        <div className="gap-2 flex items-center">
          <h2 className="font-medium text-cool_grey">#1</h2>
          <EditableTitle
            placeholder="Edit Dish Name"
            heading="h3"
            label="Click to change the name of the dish"
          />
        </div>
        <div className="gap-6 flex items-center">
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
      <section className="gap-6 grid grid-cols-2">
        <TextInput
          type="text"
          label="Click to change the title of the dish"
          name="Title"
          placeholder="Title"
          onValueChange={setTitle}
        />
        <TextInput
          type="text"
          label="Click to change the subtitle of the dish"
          name="Subtitle"
          placeholder="Subtitle"
          onValueChange={setSubTitle}
        />
        <TextArea
          rows="5"
          label="Click to change the subtitle of the dish"
          name="Description"
          placeholder="Description"
          onValueChange={setDescription}
        />
        <ChooseThumbnail />
      </section>
    </li>
  );
};

export default Dish;
