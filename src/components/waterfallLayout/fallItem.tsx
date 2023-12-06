import { View, Text } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";
import { useReactChild } from "types";
import empty from "../../assets/image/empty.png";
import Skeleton from "../skeleton";
import ImageCom from "../imageCom";
import { AtIcon } from "taro-ui";

interface defaultParams {
  title: string;
  description: string;
  price: string;
  like_num: number;
}

export default function FallItem(props: {
  itemKey: string | number | undefined;
  item: {
    src: string;
    title?: string;
    description?: string;
    price?: string;
    like_num: number;
  };
  children: { default: useReactChild };
}) {
  useEffect(() => {
    if (imgSrc != props.item.src) {
    }
    setImgSrc(props.item.src);
  }, [props.item.src]);

  const itemsRef = useRef<HTMLElement>();
  const [imgLoadStatus, setImgLoadStatus] = useState(true);
  function handleLoad() {
    if (!itemsRef.current) return;
    itemsRef.current.style.gridRowEnd = `span ${
      itemsRef.current.clientHeight - 1
    }`;
    setImgLoadStatus(false);
  }
  const [imgSrc, setImgSrc] = useState(empty);

  function defaultBuild(data: defaultParams) {
    return (
      <View className="fall-info">
        <Text className="fall-title text-over-two">{data.title}</Text>
        <View className="info-box">
          <View className="info-left">{data.price}</View>
          <View className="info-right"><AtIcon value="heart"></AtIcon><Text>{data.like_num}</Text></View>
        </View>
      </View>
    );
  }

  return (
    <View ref={itemsRef} className="fall-item" key={props.itemKey}>
      {imgLoadStatus ? (
        <View className="skeleton-cell">
          <Skeleton />
        </View>
      ) : null}
      <View style={{ visibility: imgLoadStatus ? "hidden" : "visible" }}>
        <ImageCom src={imgSrc} className="fall-img" onLoad={handleLoad} />
        {props.children.default
          ? defaultBuild(props.item as defaultParams)
          : null}
      </View>
    </View>
  );
}
