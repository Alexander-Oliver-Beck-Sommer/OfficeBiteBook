import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Menu() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: menus } = await supabase.from("menu").select();

  return (
    <>
      {menus.map((menu) => (
        <span key={menu.menu_id}>
          <ul>
            <li>
              <p>
                <b>Menu ID</b>
              </p>
              <p>{menu.menu_id}</p>
            </li>
            <li>
              <p>
                <b>Title</b>
              </p>
              <p>{menu.title}</p>
            </li>
            <li>
              <p>
                <b>Start Date</b>
              </p>
              <p>{menu.start_date}</p>
            </li>
            <li>
              <p>
                <b>End Date</b>
              </p>
              <p>{menu.end_date}</p>
            </li>
            <li>
              <p>
                <b>Menu Type ID</b>
              </p>
              <p>{menu.menu_type_id}</p>
            </li>
            <li>
              <p>
                <b>Room ID</b>
              </p>
              <p>{menu.room_id}</p>
            </li>
            <li>
              <p>
                <b>Published?</b>
              </p>
              <p>{JSON.stringify(menu.published)}</p>
            </li>
          </ul>
          <br />
        </span>
      ))}
    </>
  );
}
