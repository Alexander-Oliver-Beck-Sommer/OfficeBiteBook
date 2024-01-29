"use client";
import useProfile from "@/hooks/useProfile";
import TextInput from "@/components/Inputs/TextInput";
import ShortContent from "@/components/Content/ShortContent";
import ActionButton from "@/components/Buttons/ActionButton";
import InfoIcon from "@/components/Icons/InfoIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ImageIcon from "@/components/Icons/ImageIcon";
import EditIcon from "@/components/Icons/EditIcon";
import TimeIcon from "@/components/Icons/TimeIcon";

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
    <section className="bg-dark-400 relative flex h-full flex-1 flex-col">
      <section className="bg-dark-200 flex justify-center p-4 md:px-12">
        <div className="grid w-full max-w-screen-lg grid-cols-autoX1 gap-4 md:gap-6">
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="group relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-dark-100 bg-cover bg-center shadow-lg md:h-28 md:w-28"
            style={{ backgroundImage: `url(${userAvatarUrl})` }}
          >
            {!userAvatarUrl && (
              <ImageIcon className="fill-dark-500 h-8 w-8 md:h-10 md:w-10" />
            )}
            <div className="bg-primary invisible absolute inset-0 z-20 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-85"></div>
            <div className="invisible absolute inset-0 z-30 flex items-center justify-center fill-transparent transition-all duration-300 ease-in-out group-hover:visible group-hover:fill-dark-100">
              <EditIcon className="h-8 w-8 md:h-8 md:w-8" />
            </div>
          </button>
          <div className="flex flex-col justify-center gap-1 overflow-hidden md:gap-2">
            <p className="text-grey text-sm font-medium md:text-base">
              Welcome back
            </p>
            <span className="bg-primary h-[2px] rounded md:h-[3px]"></span>
            <h2 className="w-full truncate font-semibold md:text-2xl">
              {originalUserName ? originalUserName : "Unnamed account"}
            </h2>
          </div>
        </div>
      </section>
      <section className="bg-dark-300 flex justify-center px-4 py-3 md:px-12 md:py-4">
        <div className="w-full max-w-screen-lg">
          <p className="text-grey text-sm md:text-base">
            Welcome to the profile page. Here you can edit your personal
            details, including cost & allergies.
          </p>
        </div>
      </section>
      <section className="flex justify-center px-4 py-6 md:flex-1 md:px-12 ">
        <ul className="grid h-fit w-full max-w-screen-lg auto-rows-max gap-6  md:grid-cols-2">
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
              variant="text"
              label="Change your diet preference"
              name="Diet preference"
              value={userDiet}
              valueChange={setUserDiet}
            />
          </li>
          <li>
            <TextInput
              variant="text"
              label="Change your allergies"
              name="Allergies"
              value={userAllergies}
              valueChange={setUserAllergies}
            />
          </li>
          <li>
            <TextInput
              variant="email"
              label="Email"
              name="Email"
              value={userEmail}
              disabled
            />
          </li>
        </ul>
      </section>
      <section className="bg-dark-200 sticky bottom-0 z-40 flex w-full justify-center px-4 py-3 md:px-12 md:py-4">
        <div className="flex w-full max-w-screen-lg items-center justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <p className="text-grey text-sm md:text-base">Last updated:</p>
            <p className="text-sm font-semibold md:text-base">
              {updatedAt ? formatDate(updatedAt) : "00-00-0000 | 00:00"}
            </p>
          </div>
          <ActionButton
            icon="save"
            variant="outlined-small"
            label="Save Changes"
            name="Save"
            title="Save Changes"
            toggle={handleSubmit}
          />
        </div>
      </section>
    </section>
  );
};

export default ProfileComponent;
