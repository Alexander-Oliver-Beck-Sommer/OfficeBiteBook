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
    return <Calendar userId={user?.id} />;
  }

  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <MessageModal variant={401} />
    </section>
  );
}
