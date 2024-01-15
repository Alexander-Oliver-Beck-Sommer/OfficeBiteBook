"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import TextInput from "@/components/Inputs/TextInput";

type ProfileComponentProps = {
  profileId: string;
  profileMail: string;
};

const ProfileComponent = ({
  profileId,
  profileMail,
}: ProfileComponentProps) => {
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (profileId && profileMail) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", profileId)
          .eq("user_email", profileMail)
          .single();

        if (error) {
          console.error("Error fetching user data", error);
          return;
        }

        if (data) {
          setUserName(data.user_name);
          setUserPhone(data.user_phone);
          setUserAvatar(data.user_avatar);
          setUserBirthday(
            data.user_birthday ? new Date(data.user_birthday) : null,
          );
        }
      }
    };

    fetchUserData();
  }, [profileId, profileMail]);

  const handleSubmit = async () => {
    const updates = {
      user_name: userName,
      user_phone: userPhone,
      user_avatar: userAvatar,
      user_birthday: userBirthday ? userBirthday.toISOString() : null,
    };

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", profileId)
      .eq("user_email", profileMail);

    if (error) {
      console.error("Error updating user details", error);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <section className="rounded border border-arsenic bg-eerie_black p-4">
      <h1 className="text-2xl">Profile</h1>
      <p className="text-ghost_white">
        Your ID is <span className="text-white">{profileId}</span>
      </p>
      <p className="text-ghost_white">
        Your email is <span className="text-white">{profileMail}</span>
      </p>
      <section className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
        <TextInput
          textInputType="text"
          textInputLabel="Change your username"
          textInputName="Edit Name"
          textInputValue={userName}
          textInputValueChange={setUserName}
        />
        <TextInput
          textInputType="text"
          textInputLabel="Change your phone number"
          textInputName="Edit Phone"
          textInputValue={userPhone}
          textInputValueChange={setUserPhone}
        />
        <TextInput
          textInputType="text"
          textInputLabel="Change your avatar"
          textInputName="Edit Avatar"
          textInputValue={userAvatar}
          textInputValueChange={setUserAvatar}
        />
        <TextInput
          textInputType="date"
          textInputLabel="Change your birthday"
          textInputName="Edit Birthday"
          textInputValue={
            userBirthday ? userBirthday.toISOString().split("T")[0] : ""
          }
          textInputValueChange={(dateString) =>
            setUserBirthday(new Date(dateString))
          }
        />
      </section>
      <button
        onClick={handleSubmit}
        className="mt-4 rounded border border-arsenic px-4 py-2 font-bold"
      >
        Update Profile
      </button>
    </section>
  );
};

export default ProfileComponent;
