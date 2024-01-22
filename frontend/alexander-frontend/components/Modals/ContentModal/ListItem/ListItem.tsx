const variants = (variant: string) => {
  switch (variant) {
    case "y-direction":
      return { container: "flex flex-col gap-1", truncate: false };
    default:
      return {
        container: "flex items-center justify-between gap-4",
        truncate: true,
      };
  }
};

type ListItemProps = {
  name?: string;
  value?: string;
  variant?: string;
};

const ListItem = ({ name = "", value = "", variant = "" }: ListItemProps) => {
  const { container, truncate } = variants(variant);

  return (
    <li className={`p-4 last:pb-8 even:bg-strange_black ${container}`}>
      <h4>{name}</h4>
      <p className={`${truncate ? "truncate" : ""} text-cool_grey`}>{value}</p>
    </li>
  );
};

export default ListItem;
