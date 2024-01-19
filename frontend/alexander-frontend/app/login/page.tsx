"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import TextInput from "@/components/Inputs/TextInput";
import ActionButton from "@/components/Buttons/ActionButton";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      setUser(user);
      // setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    const res = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    setEmail("");
    setPassword("");
    router.refresh();
    const userData = res.data.user;
    try {
      // Let's check if there is any data inside our user object
      if (userData) {
        console.log(userData);
        // There is? Great! Lets retrieve the required data we need! (Specifically: id, email, created_at)
        const { id, email, created_at } = userData;
        console.log(id);
        if (id && email && created_at) {
          const { error: userError } = await supabase.from("users").insert([
            {
              user_id: id,
              user_email: email,
              user_created_at: created_at,
            },
          ]);

          if (userError) {
            console.log(
              "Failed to clone the user into 'users':",
              userError.message,
            );
          }

          console.log("Personal account cloned to table: 'users'!");
        }
      }
    } catch (error) {
      console.log("Personal account couldn't be saved!:", error.message);
    }
  };

  const handleSignIn = async () => {
    const res = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      // TODO: Add functionality to take usage of the TextInput validation props and alert the user with faulty input
    } else if (res.data.user) {
      setUser(res.data.user);
      setEmail("");
      setPassword("");
      router.refresh();
      router.push("/");
    }
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.refresh();
  };

  // if (loading) {
  //   return <h4>Loading...</h4>;
  // }

  if (user) {
    return (
      <section className="mx-4 mb-12 mt-8 flex items-center justify-center md:mx-12 md:mt-6">
        <ul className="flex w-full max-w-2xl animate-fade-up flex-col gap-6 overflow-hidden rounded border-arsenic animate-ease-in-out md:gap-4 md:border-2 md:bg-eerie_black md:px-8 md:pb-14 md:pt-10">
          <li>
            <p className="text-cool_grey">Already signed in!</p>
            <h3>Want to logout instead?</h3>
          </li>
          <li className="h-[2px] rounded bg-rajah"></li>
          <li>
            <p className="text-cool_grey">
              Seems like you're already signed in. If you want to sign out, you
              can press the Logout button below, or go back to the home page.
            </p>
          </li>
          <li className="grid grid-cols-2 gap-4 md:mt-4 md:gap-6">
            <Link
              aria-label="Go back"
              title="Go back"
              href="/"
              className="flex w-full items-center justify-center gap-3 rounded border-2 border-arsenic bg-eerie_black px-5 py-3 transition-colors duration-300 ease-in-out hover:bg-arsenic"
            >
              <h4>Go Back</h4>
            </Link>
            <ActionButton
              variant="outlined"
              label="Logout"
              title="Logout"
              name="Logout"
              toggle={handleLogout}
            />
          </li>
        </ul>
      </section>
    );
  }

  return (
    <section className="mx-4 mb-12 mt-8 flex items-center justify-center md:mx-12 md:mt-6">
      <ul className="flex w-full max-w-2xl animate-fade-up flex-col gap-6 overflow-hidden rounded border-arsenic animate-ease-in-out md:gap-4 md:border-2 md:bg-eerie_black md:px-8 md:pb-14 md:pt-10">
        <li>
          <p className="text-cool_grey">Welcome to,</p>
          <h3>OfficeBiteBook</h3>
        </li>
        <li className="h-[2px] rounded bg-apple"></li>
        <li>
          <p className="text-cool_grey">
            Get started by creating an account or logging in with your existing
            one.
          </p>
        </li>
        <li>
          <TextInput
            variant="email"
            label="Email"
            name="Email"
            value={email}
            placeholder="user@email.com"
            valueChange={setEmail}
          />
        </li>
        <li>
          <TextInput
            variant="password"
            label="Password"
            name="Password"
            value={password}
            placeholder="••••••••••"
            valueChange={setPassword}
          />
        </li>
        <li className="mt-4 grid grid-cols-2 gap-4 md:gap-6">
          <ActionButton
            variant="outlined"
            title="Sign Up"
            label="Sign Up"
            name="Sign Up"
            toggle={handleSignUp}
          />
          <ActionButton
            variant="outlined"
            title="Login"
            label="Login"
            name="Login"
            toggle={handleSignIn}
          />
        </li>
        <li className="flex flex-col gap-2 text-cool_grey md:mt-4 md:flex-row md:gap-4">
          <p className="underline underline-offset-2">Forgotten email?</p>
          <p className="underline underline-offset-2">Forgotten password?</p>
        </li>
      </ul>
    </section>
  );
}
