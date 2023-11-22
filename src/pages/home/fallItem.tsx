import { View, Image, Text } from "@tarojs/components";
import { useRef } from "react";
import empty from '@/assets/image/empty.png'

export default function FallItem(props) {
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
      <View className="fall-info">
        <View className="info-left">
          <Text className="fall-title">{props.item.title}</Text>
          <Text className="fall-description">{props.item.description}</Text>
        </View>
        <View className="info-right">{props.item.price}</View>
      </View>
    </View>
  );
}
