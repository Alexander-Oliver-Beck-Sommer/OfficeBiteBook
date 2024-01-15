import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileComponent from "./ProfileComponent";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ProfileComponent profileId={user?.id} profileMail={user?.email} />;
}
