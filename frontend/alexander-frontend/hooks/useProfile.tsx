import { useEffect, useState, useRef } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

const useProfile = (profileId, profileMail) => {
  const [userName, setUserName] = useState<string>("");
  const [originalUserName, setOriginalUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAvatarName, setUserAvatarName] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  // Lets grab our user's information from the 'users' table
  useEffect(() => {
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
                .from(`users_avatars/${profileId}`)
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

  // User wants to have a new avatar? Nice - let's get it
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

  // User wants to update their avatar? Bravo - let's update!
  const handleSubmit = async () => {
    const updates = {
      user_name: userName,
      user_phone: userPhone,
      user_avatar: userAvatarName,
      user_birthday: userBirthday ? userBirthday.toISOString() : null,
    };

    // Upload the avatar (if it exists) and have it replace the old, if there is one already.
    if (avatarFile) {
      await supabase.storage
        .from(`users_avatars/${profileId}`)
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

  // User wants to delete their avatar? Fine - let's delete it
  const handleDeleteAvatar = async () => {
    const { error: deleteAvatarError } = await supabase.storage
      .from(`users_avatars/${profileId}`)
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

  // This is a wicked function to format user dates into a more readable format
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

  return {
    userName,
    setUserName,
    originalUserName,
    setOriginalUserName,
    userPhone,
    setUserPhone,
    userAvatarName,
    setUserAvatarName,
    userAvatarUrl,
    setUserAvatarUrl,
    userBirthday,
    setUserBirthday,
    avatarFile,
    setAvatarFile,
    fileInputRef,
    handleAvatarChange,
    handleSubmit,
    handleDeleteAvatar,
    formatDate,
  };
};

export default useProfile;
