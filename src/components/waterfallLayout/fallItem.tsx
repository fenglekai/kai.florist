import { View, Image, Text } from "@tarojs/components";
import { ReactChild, ReactFragment, ReactPortal, useRef } from "react";
import empty from "@/assets/image/empty.png";

export default function FallItem(props: {
  itemKey: string | number | undefined;
  item: {
    src: any;
    title:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
    description:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
    price:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  };
  children: { default: boolean };
}) {
  const itemsRef = useRef<HTMLElement>();
  function handleLoad() {
    if (!itemsRef.current) return;
    itemsRef.current.style.gridRowEnd = `span ${
      itemsRef.current.clientHeight - 1
    }`;
  }
  return (
    <View ref={itemsRef} className="fall-item" key={props.itemKey}>
      <Image
        className="fall-img"
        src={props.item.src || empty}
        onLoad={handleLoad}
        fadeIn
      ></Image>
      {props.children.default ? (
        <View className="fall-info">
          <View className="info-left">
            <Text className="fall-title">{props.item.title}</Text>
            <Text className="fall-description">{props.item.description}</Text>
          </View>
          <View className="info-right">{props.item.price}</View>
        </View>
      ) : null}
    </View>
  );
}
