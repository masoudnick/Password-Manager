import { ImageDelete02Icon } from "hugeicons-react";
import { useState } from "react";

const Image = ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [error, setError] = useState<boolean>(false);

  return !props.src || error ? (
    <ImageDelete02Icon
      className={props.className}
      width={props.width}
      height={props.height}
    />
  ) : (
    <img
      className={props.className}
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt ?? "image"}
      onError={() => setError(true)}
    />
  );
};

export default Image;
