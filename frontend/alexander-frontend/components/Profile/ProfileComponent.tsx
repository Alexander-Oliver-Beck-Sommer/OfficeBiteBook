"use client";
import useProfile from "@/hooks/useProfile";
import HeaderBar from "@/components/Profile/HeaderBar/HeaderBar";
import FooterBar from "./FooterBar/FooterBar";
import InputList from "./InputList/InputList";
type ProfileComponentProps = {
  userId?: string;
  userEmail?: string;
};

const ProfileComponent = ({
  userId = "",
  userEmail = "",
}: ProfileComponentProps) => {
  const {
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
    userDiet,
    setUserDiet,
    updatedAt,
    userAllergies,
    setUserAllergies,
    avatarFile,
    setAvatarFile,
    fileInputRef,
    handleAvatarChange,
    handleSubmit,
    handleDeleteAvatar,
    formatDate,
  } = useProfile(userId, userEmail);

  return (
    <section className="pattern fill-body flex flex-col justify-between">
      <HeaderBar
        fileRef={fileInputRef}
        changeAvatar={handleAvatarChange}
        avatarToggle={() => fileInputRef.current.click()}
        avatarURL={userAvatarUrl}
        originalUserName={originalUserName}
      />
      <InputList
        name={userName}
        changeName={setUserName}
        phone={userPhone}
        changePhone={setUserPhone}
        birthday={userBirthday ? userBirthday.toISOString().split("T")[0] : ""}
        changeBirthday={(dateString) => setUserBirthday(new Date(dateString))}
        diet={userDiet}
        changeDiet={setUserDiet}
        allergies={userAllergies}
        changeAllergies={setUserAllergies}
        email={userEmail}
      />
      <FooterBar
        lastUpdated={updatedAt ? formatDate(updatedAt) : "00-00-0000 | 00:00"}
        saveProfile={handleSubmit}
      />
    </section>
  );
};

export default ProfileComponent;
