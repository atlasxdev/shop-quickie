import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import Image from "next/image";

export function ImageZoom({
  imageUrl,
  description,
}: {
  imageUrl: string;
  description: string;
}) {
  return (
    <Zoom canSwipeToUnzoom zoomMargin={20}>
      <Image
        src={imageUrl}
        alt={description}
        className="!cursor-pointer object-contain mx-auto aspect-square rounded-xl"
        width={400}
        height={400}
      />
    </Zoom>
  );
}
