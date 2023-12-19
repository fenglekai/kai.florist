import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import ImageCom from "../imageCom";
import "./index.less";

export default function CardInfo(props: {
  child: {
    src: string;
    title: string;
    description: string;
    price: number;
    like_num: number;
  };
  onClick?: () => void;
}) {
  const { child } = props;
  return (
    <View className="card-wrapper" onClick={props.onClick}>
      <ImageCom src={child.src} mode="aspectFill" className="card-left" />
      <View className="card-main">
        <View>
          <View className="card-primary-text text-over-one">{child.title}</View>
          <View className="card-second-text text-over-two">
            {child.description}
          </View>
        </View>
        <View className="card-price-like">
          <Text className="card-price card-primary-text">{child.price}</Text>
          <View className="card-like">
            <AtIcon value="heart"></AtIcon>
            <Text>{child.like_num}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
