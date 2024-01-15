"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      setUser(user);
      setLoading(false);
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
    setUser(res.data.user);
    setEmail("");
    setPassword("");
    router.refresh();
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.refresh();
  };

  console.log({ loading, user });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return (
      <div>
        <div>
          <h1>You're already logged in</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  );
}
