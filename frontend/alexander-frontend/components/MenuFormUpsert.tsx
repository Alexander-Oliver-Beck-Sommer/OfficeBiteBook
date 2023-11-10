"use client";
import { FormEvent } from "react";
import { supabase } from "@/components/supabaseClient";

export default function MenuUpsert() {
  function handleMenuFormData(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      title: formData.get("title"),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      menu_type_id: parseInt(formData.get("menuTypeID") as string, 10),
      room_id: parseInt(formData.get("roomID") as string, 10),
      published: formData.get("publishMenu") === "on",
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
    <form onSubmit={handleMenuFormData} class="form-example" id="MenuForm">
      <div className="form-example">
        <label for="title">Enter title: </label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className="form-example">
        <label for="startDate">Enter start date: </label>
        <input type="datetime-local" name="startDate" id="startDate" required />
      </div>
      <div className="form-example">
        <label for="endDate">Enter end date: </label>
        <input type="datetime-local" name="endDate" id="endDate" required />
      </div>
      <div className="form-example">
        <label for="menuTypeID">Enter menu type ID: </label>
        <input type="number" name="menuTypeID" id="menuTypeID" required />
      </div>
      <div className="form-example">
        <label for="roomID">Enter room ID: </label>
        <input type="number" name="roomID" id="roomID" required />
      </div>
      <div className="form-example">
        <label for="publishMenu">Unpublish / Publish </label>
        <input type="checkbox" name="publishMenu" id="publishMenu" />
      </div>
      <div className="form-example">
        <label for="submitForm">Create Menu (kind of...) 🥳 </label>
        <input
          type="submit"
          name="submitForm"
          id="submitForm"
          value="Subscribe!"
        />
      </div>
    </form>
  );
}
