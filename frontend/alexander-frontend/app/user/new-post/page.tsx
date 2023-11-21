import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/database.types";

export default async function NewUser() {
  const addUser = async (formData: FormData) => {
    "use server";
    const userEmail = formData.get("userEmail");
    const userPassword = formData.get("userPassword");
    const userName = formData.get("userName");
    const userPhone = formData.get("userPhone");
    const userBirthday = formData.get("userBirthday");
    const locationId = formData.get("locationId");
    const userImage = formData.get("userImage");
    const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.from("user").insert({
      user_email: userEmail,
      user_password: userPassword,
      user_name: userName,
      user_phone: userPhone,
      user_birthday: userBirthday,
      location_id: locationId,
      user_image: userImage,
    });
    revalidatePath("/");
  };

  return (
    <form action={addUser}>
      <h4>UserEmail</h4>
      <input type="text" name="userEmail" required />
      <h4>UserPassword</h4>
      <input type="text" name="userPassword" required />
      <h4>UserName</h4>
      <input type="text" name="userName" required />
      <h4>UserPhone</h4>
      <input type="text" name="userPhone" required />
      <h4>UserBirthday</h4>
      <input type="date" name="userBirthday" required />
      <h4>LocationID</h4>
      <input type="number" name="locationId" required />
      <h4>UserImage</h4>
      <input type="text" name="userImage" required />
      <button type="submit">Click to submit!</button>
    </form>
  );
}
