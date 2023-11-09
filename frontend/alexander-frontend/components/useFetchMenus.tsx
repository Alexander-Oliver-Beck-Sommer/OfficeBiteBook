import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const useFetchMenus = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        let { data, error } = await supabase.from("menu").select();

        if (error) throw error;

        setMenus(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { menus, isLoading, error };
};

export default useFetchMenus;
