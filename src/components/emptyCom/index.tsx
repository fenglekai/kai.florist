import { Image, View, Text } from "@tarojs/components";
import empty from "@/assets/image/empty.png";
import "./index.less";

export default function emptyCom(props: {description?:string}) {
  return (
    <View className="empty-wrapper">
      <Image src={empty} className="empty-img" />
      <Text className="empty-description">{props.description || '无数据'}</Text>
    </View>
  );
}
