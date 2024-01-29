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
    <li className={`even:bg-dark-200 p-4 last:pb-8 ${container}`}>
      <h4>{name}</h4>
      <p className={`${truncate ? "truncate" : ""} text-grey`}>{value}</p>
    </li>
  );
};

export default ListItem;
