import ImageIcon from "@/components/Icons/ImageIcon";

type ImageItemProps = {
  imageURL?: string;
};

const ImageItem = ({ imageURL }: ImageItemProps) => {
  return (
    <li className="bg-dark-200 p-4 last:pb-8">
      <h4>Thumbnail</h4>
      <div
        className="border-dark-500 mt-4 flex h-24 w-24 items-center justify-center rounded border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        {!imageURL && <ImageIcon className="fill-dark-500 h-12 w-12" />}
      </div>
    </li>
  );
};

export default ImageItem;
