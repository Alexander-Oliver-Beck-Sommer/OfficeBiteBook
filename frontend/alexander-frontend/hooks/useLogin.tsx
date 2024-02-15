import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  };

  const handleLogin = async (form: any) => {
    const email = form.target.emailField.value;
    const password = form.target.passwordField.value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      setUser(data.user);
      console.log("User data", data);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return {
    user,
    loading,
    handleLogin,
  };
};

export default useLogin;
