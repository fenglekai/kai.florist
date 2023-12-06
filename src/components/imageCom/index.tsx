import { Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import empty from "../../assets/image/empty.png";

export default function ImageCom(props: {
  src: string;
  className?: string;
  onLoad?: () => void;
}) {
  function handleLoad() {
    if (props.onLoad) props.onLoad();
  }
  const [imgSrc, setImgSrc] = useState(props.src);
  useEffect(() => {
    setImgSrc(props.src);
  }, [props.src]);
  function handleError() {
    setImgSrc(empty);
  }

  return (
    <Image
      className={props.className}
      src={imgSrc}
      onLoad={handleLoad}
      onError={handleError}
      fadeIn
    ></Image>
  );
}
