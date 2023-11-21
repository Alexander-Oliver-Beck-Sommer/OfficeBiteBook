"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";

type User = Database["public"]["Tables"]["user"]["Row"];

export default function Page() {
  const [user, setUser] = useState<User[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("user").select();
      setUser(data);
    };

    getData();
  }, []);

  return user ? (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  ) : (
    <p>Loading users...</p>
  );
}
