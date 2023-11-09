"use client";
import { FormEvent } from "react";

export default function MenuUpsert() {
  function handleMenuFormData(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data = {
      title: formData.get("title"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      menuTypeID: formData.get("menuTypeID"),
      roomID: formData.get("roomID"),
      published: formData.get("publishMenu") === "on",
    };

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
        <input type="date" name="startDate" id="startDate" required />
      </div>
      <div className="form-example">
        <label for="endDate">Enter end date: </label>
        <input type="date" name="endDate" id="endDate" required />
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
