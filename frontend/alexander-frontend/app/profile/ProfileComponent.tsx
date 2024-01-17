"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import TextInput from "@/components/Inputs/TextInput";
import ShortContent from "@/components/Content/ShortContent";
import ActionButton from "@/components/Buttons/ActionButton";
import InfoIcon from "@/components/Icons/InfoIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import IdIcon from "@/components/Icons/IdIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ImageIcon from "@/components/Icons/ImageIcon";
import EditIcon from "@/components/Icons/EditIcon";

type ProfileComponentProps = {
  profileId: string;
  profileMail: string;
  profileCreated: string;
  profileLastUpdated?: string;
};

const ProfileComponent = ({
  profileId = "",
  profileMail = "",
  profileCreated = "",
  profileLastUpdated = "",
}: ProfileComponentProps) => {
  const [userName, setUserName] = useState<string>("");
  const [originalUserName, setOriginalUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAvatarName, setUserAvatarName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);
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
    // Lets grab our user's information from the 'users' table.
    const fetchUserData = async () => {
      if (profileId && profileMail) {
        // Making sure we get the absolute precise user.
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", profileId)
          .eq("user_email", profileMail)
          .single();

        // Scream in agony if we fail to retrieve the user.
        if (userError) {
          console.error("Error fetching user data", userError);
          return;
        }

        // Alright. Now we got the data, let's store it in our states.
        if (userData) {
          setUserName(userData.user_name);
          setOriginalUserName(userData.user_name);
          setUserPhone(userData.user_phone);
          setUserAvatarName(userData.user_avatar);
          setUserBirthday(
            userData.user_birthday ? new Date(userData.user_birthday) : null,
          );

          // The user has an avatar? Nice - let's get the URL for it.
          if (userData.user_avatar) {
            const { data: avatarUrlData, error: avatarUrlError } =
              supabase.storage
                .from("users_avatars")
                .getPublicUrl(`${userData.user_avatar}`);

            if (avatarUrlError) {
              console.error("Error fetching avatar URL", avatarUrlError);
            } else {
              setUserAvatarUrl(avatarUrlData.publicUrl);
            }
          }
        }
      }
    };
    fetchUserData();
  }, [profileId, profileMail]);

  const handleAvatarChange = (event) => {
    // Grab the uploaded image.
    const file = event.target.files[0];
    // Make sure the image is a JPEG or PNG.
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const fileExtension = file.type.split("/").pop();
      const fileName = `${profileId}.${fileExtension}`;
      // the 'avatarFile' should now contains the uploaded image.
      setAvatarFile(file);
      // the 'userAvatarName' should now contain the name of the uploaded image + file extension.
      setUserAvatarName(fileName);
      // the 'userAvatarUrl' should now contain the URL of the uploaded image.
      setUserAvatarUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a JPEG or PNG image.");
    }
  };

  const handleSubmit = async () => {
    // User wants to update? Let's update!
    const updates = {
      user_name: userName,
      user_phone: userPhone,
      user_avatar: userAvatarName,
      user_birthday: userBirthday ? userBirthday.toISOString() : null,
    };

    // Upload the avatar (if it exists) and have it replace the old, if there is one already.
    if (avatarFile) {
      await supabase.storage
        .from("users_avatars")
        .upload(userAvatarName, avatarFile, { upsert: true });
    }

    // Actual logic for updating the user's details into supabase.
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

  const handleDeleteAvatar = async () => {
    // User wants to delete their avatar? Fine - delete it.
    const { error: deleteAvatarError } = await supabase.storage
      .from("users_avatars")
      .remove(userAvatarName);

    let userAvatarError = null;

    // And if the above went right, let's make sure the user doesn't have a non-existing avatar.
    if (!deleteAvatarError) {
      const { error } = await supabase
        .from("users")
        .update({ user_avatar: "" })
        .eq("user_id", profileId)
        .eq("user_email", profileMail);

      userAvatarError = error;
    }

    // If any problems occured in either of the two, let's scream in shared agony.
    if (deleteAvatarError || userAvatarError) {
      console.error(
        "Error deleting avatar",
        deleteAvatarError || userAvatarError,
      );
    } else {
      alert("Avatar deleted successfully!");
      setUserAvatarName("");
      setUserAvatarUrl("");
      setAvatarFile(null);
    }
  };

  return (
    <ShortContent ariaLabel="Profile">
      <section className="mx-4 mb-12 mt-8 flex flex-col gap-8 md:mx-12 md:mt-6">
        <div className="grid grid-cols-autoX1 gap-8">
          <div className="flex flex-col justify-end overflow-hidden">
            <p className="text-cool_grey">Welcome back,</p>
            <h3 className="truncate">{originalUserName}</h3>
          </div>
          <div className="flex justify-end">
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="group relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-arsenic bg-eerie_black bg-cover bg-center"
              style={{ backgroundImage: `url(${userAvatarUrl})` }}
            >
              {!userAvatarUrl && <ImageIcon className="h-8 w-8 fill-arsenic" />}
              <div className="invisible absolute inset-0 z-20 bg-apple opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-85"></div>
              <div className="invisible absolute inset-0 z-30 flex items-center justify-center fill-transparent transition-all duration-300 ease-in-out group-hover:visible group-hover:fill-eerie_black">
                <EditIcon />
              </div>
            </button>
          </div>
        </div>
        <div className="h-[2px] rounded bg-arsenic"></div>
        <ul className="grid gap-8 md:grid-cols-2">
          <li>
            <TextInput
              variant="text"
              label="Change your username"
              name="Name"
              value={userName}
              valueChange={setUserName}
            />
          </li>
          <li>
            <TextInput
              variant="tel"
              label="Change your phone number"
              name="Phone"
              value={userPhone}
              valueChange={setUserPhone}
            />
          </li>
          <li>
            <TextInput
              variant="date"
              label="Change your birthday"
              name="Birthday"
              value={
                userBirthday ? userBirthday.toISOString().split("T")[0] : ""
              }
              valueChange={(dateString) =>
                setUserBirthday(new Date(dateString))
              }
            />
          </li>
          <li>
            <TextInput
              variant="email"
              label={`Email: ${profileMail}`}
              name="Email"
              value={profileMail}
              disabled
            />
          </li>
          <li className="mt-4 flex flex-col justify-end md:col-span-1 md:col-start-2">
            <ActionButton
              icon="check"
              variant="outlined"
              label="Save changes"
              name="Save changes"
              title="Save changes"
              toggle={handleSubmit}
            />
          </li>
        </ul>
        <div className="h-[2px] rounded bg-arsenic"></div>
        <ul className="grid grid-cols-3 gap-8">
          <li className="col-span-3">
            <h3>Account Details</h3>
          </li>
          <li className="col-span-3">
            <ul className="lg:grid-cols-3Xauto grid gap-8">
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="fill-apple" />
                  <h4>Created at:</h4>
                </div>
                <p className="text-cool_grey">{formatDate(profileCreated)}</p>
              </li>
              <li className="flex flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <IdIcon className="fill-apple" />
                  <h4>Account ID</h4>
                </div>
                <p className="truncate text-cool_grey">{profileId}</p>
              </li>
              <li className="flex flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <IdIcon className="fill-apple" />
                  <h4>Last updated:</h4>
                </div>
                <p className="truncate text-cool_grey">
                  {formatDate(profileLastUpdated)}
                </p>
              </li>
            </ul>
          </li>
          <li className="col-span-3 flex flex-col gap-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <InfoIcon className="fill-rajah" />
              <h4>Updating Account</h4>
            </div>
            <p className="text-cool_grey">
              Due to security reasons, changes for your account details can only
              be made through direct contact with the administrators. If you
              need to make any changes, please reach out to the{" "}
              <span className="border-b-2 border-ghost_white pb-1 font-semibold text-ghost_white">
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
