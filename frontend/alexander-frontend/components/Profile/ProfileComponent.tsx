type ProfileComponentProps = {
  userId?: string;
  userEmail?: string;
};

const ProfileComponent = ({
  userId = "",
  userEmail = "",
}: ProfileComponentProps) => {
    return (
        <section className="border flex-1 h-full p-4">
            <header className="border"></header>
        </section>
    )
};

export default ProfileComponent;
