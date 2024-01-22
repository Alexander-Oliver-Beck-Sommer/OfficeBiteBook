import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileComponent from "./ProfileComponent";
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
        profileId={user?.id}
        profileMail={user?.email}
        profileCreated={user?.created_at}
        profileLastUpdated={user?.updated_at}
      />
    );
  }

  return <MessageModal variant={401} />;
}
