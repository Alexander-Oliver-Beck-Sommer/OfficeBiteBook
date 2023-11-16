import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="gap-2 flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md">
      <Link
        href="/"
        className="py-2 text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 text-sm no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 group-hover:-translate-x-1 h-4 w-4 transition-transform"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="animate-in gap-2 text-foreground flex w-full flex-1 flex-col justify-center"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="py-2 mb-6 rounded-md border bg-inherit px-4"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="py-2 mb-6 rounded-md border bg-inherit px-4"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="py-2 text-foreground mb-2 rounded-md bg-green-700 px-4">
          Sign In
        </button>
        <button
          formAction={signUp}
          className="border-foreground/20 py-2 text-foreground mb-2 rounded-md border px-4"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
