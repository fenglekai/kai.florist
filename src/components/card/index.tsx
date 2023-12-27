import { View } from "@tarojs/components";
import { useReactChild } from "types";
import "./index.less";

export default function Card(props: { className?: any; children: { title?: useReactChild; content: useReactChild; }; }) {
  return (<View className={`card ${props.className}`}>
    {
      props.children.title ? <View className="title">{props.children.title}</View> : null
    }
    {
      props.children.content ? <View>{props.children.content}</View> : null
    }
  </View>);
}
