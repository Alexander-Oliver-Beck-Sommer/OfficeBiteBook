import VisibilityIcon from "@/components/Icons/VisibilityIcon";

export default function VisibilityFlipper() {
  return (
    <ul className="flex items-center gap-25">
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h4>Publish</h4>
          <VisibilityIcon className="h-25 w-25 fill-rajah" />
        </button>
      </li>
      <li className="flex items-center">
        <button className="flex items-center gap-8">
          <h4>Private</h4>
          <VisibilityIcon className="h-25 w-25 fill-rajah" variant="disabled" />
        </button>
      </li>
    </ul>
  );
}
