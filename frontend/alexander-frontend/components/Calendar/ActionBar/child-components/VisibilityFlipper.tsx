import VisibilityIcon from "@/components/Icons/VisibilityIcon";

export default function VisibilityFlipper() {
  return (
    <ul className="flex items-center gap-6">
      <li className="flex items-center">
        <button className="flex items-center gap-2">
          <h4>Publish</h4>
          <VisibilityIcon className="h-6 w-6 fill-rajah" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="flex items-center gap-2">
          <h4>Private</h4>
          <VisibilityIcon className="h-6 w-6 fill-rajah" variant="disabled" />
        </button>
      </li>
    </ul>
  );
}
