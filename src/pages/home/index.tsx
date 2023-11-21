import { View, Input, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import TabBar from "@/components/tabBar";
import { AtIcon } from "taro-ui";
import "./index.less";
import FallItem from "./fallItem";

export default function Home() {
  useLoad(() => {
    // console.log('Page loaded.')
  });

  const list = Array(20)
    .fill(1)
    .map(() => {
      const random = Math.floor(Math.random() * 10) % 2;
      const data = {
        src: "",
        title: "这是标题",
        description: "这是一段描述",
        price: "￥29",
      };
      if (random) {
        data.src = `https://picsum.photos/${1280}/${720}?random=${1}`;
      } else {
        data.src = `https://picsum.photos/${720}/${720}?random=${2}`;
      }
      return data;
    });

  return (
    <View className="home">
      <View className="top-search">
        <View className="search-wrapper">
          <View className="search-left">
            <Input type="text" className="input" />
          </View>
          <View className="search-right">
            <AtIcon value="search" size="30" color="#6190E8"></AtIcon>
          </View>
        </View>
      </View>
      <ScrollView scrollY scrollWithAnimation className="home-scroll">
        <View className="home-container">
          {list.map((item, key) => (
            <FallItem item={item} itemKey={key} key={key} />
          ))}
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}
