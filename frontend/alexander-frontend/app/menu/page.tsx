"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";

type Menu = Database["public"]["Tables"]["menu"]["Row"];

export default function Page() {
  const [menu, setMenu] = useState<Menu[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("menu").select();
      setMenu(data);
    };

    getData();
  }, []);

  return menu ? (
    <pre>{JSON.stringify(menu, null, 2)}</pre>
  ) : (
    <p>Loading menus...</p>
  );
}
