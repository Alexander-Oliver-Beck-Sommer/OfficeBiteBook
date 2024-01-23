import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import ProfileComponent from "./ProfileComponent";
import ProfileComponent from "@/components/Profile/ProfileComponent";
import MessageModal from "@/components/Modals/MessageModal/MessageModal";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <ProfileComponent
        userId={user?.id}
        userEmail={user?.email}
      />
    );
  }

  return <MessageModal variant={401} />;
}
