"use client";
import { htmlFormEvent } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

export default function MenuUpsert() {
  function handleMenuhtmlFormData(event: htmlFormEvent) {
    event.preventDefault();
    const htmlFormData = new htmlFormData(event.target as HTMLhtmlFormElement);

    const data = {
      title: htmlFormData.get("title"),
      start_date: htmlFormData.get("startDate"),
      end_date: htmlFormData.get("endDate"),
      menu_type_id: parseInt(htmlFormData.get("menuTypeID") as string, 10),
      room_id: parseInt(htmlFormData.get("roomID") as string, 10),
      published: htmlFormData.get("publishMenu") === "on",
    };

    const insertMenu = async () => {
      let { data: menu, error } = await supabase.from("menu").insert([
        {
          title: data.title,
          start_date: data.start_date,
          end_date: data.end_date,
          menu_type_id: data.menu_type_id,
          room_id: data.room_id,
          published: data.published,
        },
      ]);

      if (error) {
        console.log("An error occured!");
      } else {
        console.log("Successfully inserted menu!!!");
      }

      console.log(menu);
    };
    insertMenu();

    console.log(data);
    event.target.reset();
  }

  return (
    <htmlForm onSubmit={handleMenuhtmlFormData} className="htmlForm-example" id="MenuhtmlForm">
      <div className="htmlForm-example">
        <label htmlFor="title">Enter title: </label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="startDate">Enter start date: </label>
        <input type="datetime-local" name="startDate" id="startDate" required />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="endDate">Enter end date: </label>
        <input type="datetime-local" name="endDate" id="endDate" required />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="menuTypeID">Enter menu type ID: </label>
        <input type="number" name="menuTypeID" id="menuTypeID" required />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="roomID">Enter room ID: </label>
        <input type="number" name="roomID" id="roomID" required />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="publishMenu">Unpublish / Publish </label>
        <input type="checkbox" name="publishMenu" id="publishMenu" />
      </div>
      <div className="htmlForm-example">
        <label htmlFor="submithtmlForm">Create Menu (kind of...) 🥳 </label>
        <input
          type="submit"
          name="submithtmlForm"
          id="submithtmlForm"
          value="Subscribe!"
        />
      </div>
    </htmlForm>
  );
}
