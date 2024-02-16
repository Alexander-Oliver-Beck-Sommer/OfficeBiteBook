import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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
    return <ProfileComponent userId={user?.id} userEmail={user?.email} />;
  }

  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <MessageModal variant={401} />
    </section>
  );
}
