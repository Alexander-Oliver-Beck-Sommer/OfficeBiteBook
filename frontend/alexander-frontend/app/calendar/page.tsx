import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Calendar from "@/components/Calendar/Calendar";
import MessageBlock from "@/components/MessageBlock";

export default async function CalendarTest() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <Calendar calendarUser={user} />;
  }

  return <MessageBlock variant={401} />;
}
