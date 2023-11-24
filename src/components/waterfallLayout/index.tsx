import { View } from "@tarojs/components";
import FallItem from "./fallItem";
import "./index.less";

export default function WaterfallLayout(props: {
  list: any[];
  children?: { default: boolean };
}) {
  return (
    <View className="waterfall-container">
      {props.list.map((item, key) => (
        <FallItem item={item} itemKey={key} key={key}>
          {{
            default: props.children ? props.children.default : false,
          }}
        </FallItem>
      ))}
    </View>
  );
}
