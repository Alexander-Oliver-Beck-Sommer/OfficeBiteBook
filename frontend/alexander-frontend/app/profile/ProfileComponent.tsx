"use client";
import useProfile from "@/hooks/useProfile";
import TextInput from "@/components/Inputs/TextInput";
import ShortContent from "@/components/Content/ShortContent";
import ActionButton from "@/components/Buttons/ActionButton";
import InfoIcon from "@/components/Icons/InfoIcon";
import IdIcon from "@/components/Icons/IdIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ImageIcon from "@/components/Icons/ImageIcon";
import EditIcon from "@/components/Icons/EditIcon";
import TimeIcon from "@/components/Icons/TimeIcon";

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
    userAllergies,
    setUserAllergies,
    avatarFile,
    setAvatarFile,
    fileInputRef,
    handleAvatarChange,
    handleSubmit,
    handleDeleteAvatar,
    formatDate,
  } = useProfile(profileId, profileMail);

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
              variant="tel"
              label="Change your phone number"
              name="Phone"
              value={userPhone}
              valueChange={setUserPhone}
            />
          </li>
          <TextInput
            variant="email"
            label={`Email: ${profileMail}`}
            name="Email"
            value={profileMail}
            disabled
          />
          <li>
            <TextInput
              variant="text"
              label="Change your diet preference"
              name="Diet preference"
              value={userDiet}
              valueChange={setUserDiet}
            />
          </li>
          {/* TODO: Update this part to be something else that handles the creation of new objects and display of the allergies array. */}
          <li className="col-span-2">
            <TextInput
              variant="text"
              label="Change allergies"
              name="Allergies"
              value={userAllergies}
              valueChange={setUserAllergies}
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
            <ul className="grid gap-8 lg:grid-cols-3Xauto">
              <li className="flex flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <TimeIcon className="fill-apple" />
                  <h4>Last updated</h4>
                </div>
                <p className="truncate text-cool_grey">
                  {formatDate(profileLastUpdated)}
                </p>
              </li>
              <li className="flex flex-col gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <IdIcon className="fill-apple" />
                  <h4>Account ID</h4>
                </div>
                <p className="truncate text-cool_grey">{profileId}</p>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="fill-apple" />
                  <h4>Created at</h4>
                </div>
                <p className="text-cool_grey">{formatDate(profileCreated)}</p>
              </li>
            </ul>
          </li>
          <li className="col-span-3 mt-4 flex flex-col gap-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <InfoIcon className="fill-rajah" />
              <h4>Updating Account</h4>
            </div>
            <p className="text-cool_grey">
              Due to security reasons, changes for your account details can only
              be made through direct contact with the administrators. If you
              need to make any changes, please reach out to the{" "}
              <span className="font-semibold text-ghost_white">
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
