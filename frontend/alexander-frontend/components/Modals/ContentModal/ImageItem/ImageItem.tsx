import ImageIcon from "@/components/Icons/ImageIcon";

type ImageItemProps = {
  imageURL?: string;
};

const ImageItem = ({ imageURL }: ImageItemProps) => {
  return (
    <li className="bg-strange_black p-4 last:pb-8">
      <h4>Thumbnail</h4>
      <div
        className="mt-4 flex h-24 w-24 items-center justify-center rounded border border-arsenic bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        {!imageURL && <ImageIcon className="h-12 w-12 fill-arsenic" />}
      </div>
    </li>
  );
};

export default ImageItem;
