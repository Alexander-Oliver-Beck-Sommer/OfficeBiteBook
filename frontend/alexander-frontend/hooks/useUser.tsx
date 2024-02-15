import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSession, setIsSession] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  };

  // Creates a user session and redirects to the home page if successful
  const handleLogin = async (form: any) => {
    form.preventDefault();
    setLoading(true);
    const email = form.target.emailField.value;
    const password = form.target.passwordField.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.log("Error logging in", error);
        toast.error("Invalid email or password");
        return;
      } else if (data) {
        setIsSession(true);
        router.push("/");
        toast.success("Signed in");
        console.log("This console is 42% more awesome now that you're here.");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  // Ends the user session and reloads the page
  const handleLogout = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("Error logging out", error);
        return;
      } else {
        setIsSession(false);
        router.refresh();
        console.log("So long, and thanks for all the fish. Until next time.");
      }
    } catch (error) {
      console.log("Error logging out", error);
    }

    setLoading(false);
  };

  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log("Error checking session", error);
        return;
      } else if (data) {
        setIsSession(true);
      }
    } catch (error) {
      console.log("Error checking session", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    checkSession();
  }, [isSession]);

  return {
    loading,
    handleLogin,
    handleLogout,
    isSession,
  };
};

export default useUser;
