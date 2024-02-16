import ActionButton from "@/components/Buttons/ActionButton";

type FooterBarProps = {
  lastUpdated?: string;
  saveProfile?: () => void;
};

const FooterBar = ({
  lastUpdated = "",
  saveProfile = () => {},
}: FooterBarProps) => {
  return (
    <footer className=" flex w-full justify-center border-t border-dark-400 bg-dark-200 px-4 py-3 md:px-12 md:py-4">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <div className="flex gap-1">
          <h4 className="text-sm text-grey md:text-base">Last updated:</h4>
          <h4 className="text-sm md:text-base">{lastUpdated}</h4>
        </div>
        <ActionButton
          icon="save"
          variant="outlined-small"
          label="Save Changes"
          name="Save"
          title="Save Changes"
          toggle={saveProfile}
        />
      </div>
    </footer>
  );
};

export default FooterBar;
