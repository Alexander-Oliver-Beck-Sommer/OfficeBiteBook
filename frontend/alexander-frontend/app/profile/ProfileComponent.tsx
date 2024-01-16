"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import TextInput from "@/components/Inputs/TextInput";
import ShortContent from "@/components/Content/ShortContent";
import ActionButton from "@/components/Buttons/ActionButton";
import InfoIcon from "@/components/Icons/InfoIcon";
import EmailIcon from "@/components/Icons/Email.Icon";
import IdIcon from "@/components/Icons/IdIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

type ProfileComponentProps = {
  profileId: string;
  profileMail: string;
  profileCreated: string;
};

const ProfileComponent = ({
  profileId,
  profileMail,
  profileCreated,
}: ProfileComponentProps) => {
  const [userName, setUserName] = useState<string>("");
  const [originalUserName, setOriginalUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(",", " |");
  };

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
          setOriginalUserName(data.user_name);
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
    <ShortContent ariaLabel="Profile">
      <section className="mx-4 my-8 flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <p className="text-cool_grey">Welcome back,</p>
          <h3>{originalUserName}</h3>
        </section>
        <div className="h-[1px] rounded bg-arsenic"></div>
        <ul className="flex flex-col gap-8">
          <li>
            <TextInput
              textInputType="text"
              textInputLabel="Change your username"
              textInputName="Name"
              textInputValue={userName}
              textInputValueChange={setUserName}
            />
          </li>
          <li>
            <TextInput
              textInputType="tel"
              textInputLabel="Change your phone number"
              textInputName="Phone"
              textInputValue={userPhone}
              textInputValueChange={setUserPhone}
            />
          </li>
          <li>
            <TextInput
              textInputType="date"
              textInputLabel="Change your birthday"
              textInputName="Birthday"
              textInputValue={
                userBirthday ? userBirthday.toISOString().split("T")[0] : ""
              }
              textInputValueChange={(dateString) =>
                setUserBirthday(new Date(dateString))
              }
            />
          </li>
          <li>
            <TextInput
              textInputType="text"
              textInputLabel="Change your avatar"
              textInputName="Profile Picture"
              textInputValue={userAvatar}
              textInputValueChange={setUserAvatar}
            />
          </li>
          <li>
            <ActionButton
              style="w-full"
              icon="check"
              variant="outlined"
              label="Save changes"
              name="Save changes"
              title="Save changes"
              toggle={handleSubmit}
            />
          </li>
        </ul>
        <div className="h-[1px] rounded bg-arsenic"></div>
        <ul className="flex flex-col gap-8">
          <li>
            <h3>Account Details</h3>
            <p></p>
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <EmailIcon className="fill-apple" />
              <h4>Email</h4>
            </div>
            <p className="text-cool_grey">{profileMail}</p>
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="fill-apple" />
              <h4>Created</h4>
            </div>
            <p className="text-cool_grey">{formatDate(profileCreated)}</p>
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IdIcon className="fill-apple" />
              <h4>UUID</h4>
            </div>
            <p className="text-cool_grey">{profileId}</p>
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <InfoIcon className="fill-rajah" />
              <h4>Updating Account</h4>
            </div>
            <p className="text-cool_grey">
              Due to security reasons, changes for your account details can only
              be made through direct contact with the administrators. If you
              need to make any changes, please reach out to the{" "}
              <span className="border-b border-ghost_white pb-1 font-semibold text-ghost_white">
                support team
              </span>
              .
            </p>
          </li>
        </ul>
      </section>
    </ShortContent>
  );
};

export default ProfileComponent;
