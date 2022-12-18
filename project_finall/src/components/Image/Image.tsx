import { FC } from "react";

interface Props {
  width: number;
  height: number;
  src: string;
}

const Image: FC<Props> = ({ width, height, src }) => {
  return (
    <img
      style={{ width: `${width}px`, height: `${height}px` }}
      src={src}
      alt="Resized image"
    />
  );
};

export default Image;