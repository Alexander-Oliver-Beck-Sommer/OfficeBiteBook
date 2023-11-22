"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [accountPhone, setAccountPhone] = useState<string | null>(null);
  const [accountBirthday, setAccountBirthday] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [accountAvatar, setAccountAvatar] = useState<string | null>(null);
  const user = session?.user;

  const getAccount = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("accounts")
        .select(
          `account_name, account_email, account_phone, account_birthday, location_id, account_avatar`,
        )
        .eq("account_id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAccountName(data.account_name);
        setAccountEmail(data.account_email);
        setAccountPhone(data.account_phone);
        setAccountBirthday(data.account_birthday);
        setLocationId(data.location_id);
        setAccountAvatar(data.account_avatar);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getAccount();
  }, [user, getAccount]);

  async function updateAccount({
    accountName,
    accountEmail,
    accountPhone,
    accountBirthday,
    locationId,
    accountAvatar,
  }: {
    accountName: string | null;
    accountEmail: string | null;
    accountPhone: string | null;
    accountBirthday: string | null;
    locationId: number | null;
    accountAvatar: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("accounts").upsert({
        account_id: user?.id as string,
        account_name: accountName,
        account_email: accountEmail,
        account_phone: accountPhone,
        account_birthday: accountBirthday,
        location_id: locationId,
        account_avatar: accountAvatar,
      });
      if (error) throw error;
      alert("Account updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="accountName">Account Name</label>
        <input
          id="accountName"
          type="text"
          value={accountName || ""}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="accountEmail">Account Email</label>
        <input
          id="accountEmail"
          type="text"
          value={accountEmail || ""}
          onChange={(e) => setAccountEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="accountPhone">Account Phone</label>
        <input
          id="accountPhone"
          type="text"
          value={accountPhone || ""}
          onChange={(e) => setAccountPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="accountBirthday">Account Birthday</label>
        <input
          id="accountBirthday"
          type="text"
          value={accountBirthday || ""}
          onChange={(e) => setAccountBirthday(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="locationId">Location ID</label>
        <input
          id="locationId"
          type="number"
          value={locationId || ""}
          onChange={(e) => setLocationId(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateAccount({
              accountName,
              accountEmail,
              accountPhone,
              accountBirthday,
              locationId,
              accountAvatar,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
