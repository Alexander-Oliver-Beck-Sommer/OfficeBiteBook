import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MessageBlock from "@/components/MessageBlock";
import HomeComponent from "@/components/Home/HomeComponent";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <HomeComponent userId={user?.id} userEmail={user?.email} />;
  }

  return <MessageBlock variant={401} />;
}
