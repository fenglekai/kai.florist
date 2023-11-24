import { View, Image, Text } from "@tarojs/components";
import { useRef } from "react";
import { useReactChild } from "types";
import empty from "../../assets/image/empty.png";

interface defaultParams {
  title: string;
  description: string;
  price: string;
}

export default function FallItem(props: {
  itemKey: string | number | undefined;
  item: { src: string; title?: string; description?: string; price?: string };
  children: { default: useReactChild };
}) {
  const itemsRef = useRef<HTMLElement>();
  function handleLoad() {
    if (!itemsRef.current) return;
    itemsRef.current.style.gridRowEnd = `span ${
      itemsRef.current.clientHeight - 1
    }`;
  }
  function handleError() {
    props.item.src = empty
  }

  function defaultBuild(data: defaultParams) {
    return (
      <View className="fall-info">
        <View className="info-left">
          <Text className="fall-title">{data.title}</Text>
          <Text className="fall-description">{data.description}</Text>
        </View>
        <View className="info-right">{data.price}</View>
      </View>
    );
  }

  return (
    <View ref={itemsRef} className="fall-item" key={props.itemKey}>
      <Image
        className="fall-img"
        src={props.item.src || empty}
        onLoad={handleLoad}
        onError={handleError}
        fadeIn
      ></Image>
      {props.children.default ? defaultBuild((props.item) as defaultParams) : null}
    </View>
  );
}
