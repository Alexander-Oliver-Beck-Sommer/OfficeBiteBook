import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/database.types";

export default async function NewMenu() {
  const addMenu = async (formData: FormData) => {
    "use server";
    const menuId = formData.get("menuId");
    const menuTypeId = formData.get("menuTypeId");
    const title = formData.get("title");
    const roomId = formData.get("roomId");
    const published = formData.get("published");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.from("menu").insert({
      menu_id: menuId,
      menu_type_id: menuTypeId,
      title: title,
      room_id: roomId,
      published: published,
      start_date: startDate,
      end_date: endDate,
    });
    revalidatePath("/");
  };

  return (
    <form action={addMenu}>
      <h4>MenuID</h4>
      <input type="number" name="menuId" />
      <h4>MenuTypeID</h4>
      <input type="number" name="menuTypeId" />
      <h4>Title</h4>
      <input type="text" name="title" />
      <h4>RoomID</h4>
      <input type="number" name="roomId" />
      <h4>Published?</h4>
      <input type="checkbox" name="published" />
      <h4>StartDate</h4>
      <input type="datetime-local" name="startDate" />
      <h4>EndDate</h4>
      <input type="datetime-local" name="endDate" />
      <button type="submit">Click to submit!</button>
    </form>
  );
}
