import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Calendar from "@/components/Calendar/Calendar";
import MessageModal from "@/components/Modals/MessageModal/MessageModal";

export default async function CalendarTest() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <Calendar user={user} />;
  }

  return <MessageModal variant={401} />;
}
