import VisibilityIcon from "@/components/Icons/VisibilityIcon";

export default function VisibilityFlipper() {
  return (
    <ul className="gap-6 flex items-center">
      <li className="flex items-center">
        <button className="gap-2 flex items-center">
          <h4>Publish</h4>
          <VisibilityIcon className="h-6 w-6 fill-true_blue" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="gap-2 flex items-center">
          <h4>Private</h4>
          <VisibilityIcon
            className="h-6 w-6 fill-true_blue"
            variant="disabled"
          />
        </button>
      </li>
    </ul>
  );
}
