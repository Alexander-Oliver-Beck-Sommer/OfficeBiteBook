import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ErrorModal from "@/components/ErrorModal";
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

  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <ErrorModal variant={401} />
    </section>
  );
}
