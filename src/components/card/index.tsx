import { View } from "@tarojs/components";
import "./index.less";

export default function Card(props: {
  children: any;
  className: string
}) {
  return (<View className={`card ${props.className}`}>
    {
      props.children.title ? <View>{props.children.title}</View> : null
    }
    {
      props.children.content ? <View>{props.children.content}</View> : null
    }
  </View>);
}
