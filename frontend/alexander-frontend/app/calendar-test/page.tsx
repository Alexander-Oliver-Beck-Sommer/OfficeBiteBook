import Calendar from "@/components/Calendar/Calendar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function CalendarTest() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <Link href="/login">
          <p>Sorry, but this page is only accessible for users</p>
        </Link>
      </>
    );
  }

  return (
    <>
      <Calendar calendarUser={user} />
    </>
  );
}
