import { View } from "@tarojs/components";
import { useReactChild } from "types";
import FallItem from "./fallItem";
import "./index.less";

export default function WaterfallLayout(props: {
  className?: string;
  list: any[];
  children?: { default: useReactChild };
  onClick?: (item: any, key: number) => void;
}) {
  return (
    <View className={`waterfall-container ${props.className}`}>
      {props.list.map((item, key) => (
        <FallItem
          item={item}
          itemKey={key}
          key={key}
          onClick={() => (props.onClick ? props.onClick(item, key) : null)}
        >
          {{
            default: props.children ? props.children.default : false,
          }}
        </FallItem>
      ))}
    </View>
  );
}
