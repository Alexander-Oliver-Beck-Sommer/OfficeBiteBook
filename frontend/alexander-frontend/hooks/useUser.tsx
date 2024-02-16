import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
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
        setUser(true);
        router.push("/");
        router.refresh();
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

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out", error);
      return;
    }
    setUser(false);
    router.refresh();
    console.log("So long, and thanks for all the fish. Until next time.");

    setLoading(false);
  };

  // Check if a user is logged in - pretty much used to shift between login/logoug states.
  const checkIfUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return;
      } else if (data) {
        setUser(true);
      }
    } catch (error) {
      console.log("Error checking session", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    checkIfUser();
  }, [user]);

  return {
    loading,
    handleLogin,
    handleLogout,
    user,
  };
};

export default useUser;
