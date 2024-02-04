import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MessageModal from "@/components/Modals/MessageModal/MessageModal";
import HomeComponent from "@/components/Home";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <HomeComponent userId={user?.id} />;
  }

  return <MessageModal variant={401} />;
}
