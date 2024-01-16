"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";
import TextInput from "@/components/Inputs/TextInput";
import ShortContent from "@/components/Content/ShortContent";
import ActionButton from "@/components/Buttons/ActionButton";
import InfoIcon from "@/components/Icons/InfoIcon";
import EmailIcon from "@/components/Icons/Email.Icon";
import IdIcon from "@/components/Icons/IdIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ImageIcon from "@/components/Icons/ImageIcon";

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
      <section className="mx-4 my-8 flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <p className="text-cool_grey">Welcome back,</p>
          <h3>{originalUserName}</h3>
        </section>
        <div className="h-[2px] rounded bg-arsenic"></div>
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
          <li className="grid grid-cols-2 gap-2">
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            {userAvatarUrl ? (
              // Content that shows if the user has an avatar.
              <div
                className="aspect-square border-2 border-arsenic bg-eerie_black bg-cover bg-center"
                style={{ backgroundImage: `url(${userAvatarUrl})` }}
              ></div>
            ) : (
              // Content that shows if the user does not have an avatar.
              <div className="flex aspect-square items-center justify-center border-2 border-arsenic bg-eerie_black">
                <ImageIcon className="h-16 w-16 fill-arsenic" />
              </div>
            )}
            <div className="grid grid-rows-2 gap-2">
              <ActionButton
                icon="upload"
                variant="outlined"
                label="Upload thumbnail"
                name="Upload"
                title="Upload thumbnail"
                toggle={() => fileInputRef.current.click()}
              />
              <ActionButton
                style="gap-4"
                variant="outlined"
                icon="delete"
                label="Delete thumbnail"
                name="Delete"
                title="Delete thumbnail"
                toggle={handleDeleteAvatar}
                disabled={!userAvatarUrl}
              />
            </div>
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
        <div className="h-[2px] rounded bg-arsenic"></div>
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
