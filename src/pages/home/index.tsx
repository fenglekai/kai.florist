import { View, Input, ScrollView, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useState } from "react";
import WaterfallLayout from "@/components/waterfallLayout";
import "./index.less";

export default function Home() {
  useLoad(() => {});

  const list = Array(20)
    .fill(1)
    .map(() => {
      const random = Math.floor(Math.random() * 10) % 2;
      const data = {
        src: "",
        title: "这是标题",
        description: "这是一段描述",
        price: "29",
      };
      if (random) {
        // data.src = `https://picsum.photos/${1280}/${720}?random=${1}`;
      } else {
        // data.src = `https://picsum.photos/${720}/${720}?random=${2}`;
      }
      return data;
    });

  const [fixedSearch, setFixedSearch] = useState(false);

  const watchScroll = (e: any) => {
    const scrollTop = e.detail.scrollTop;
    if (scrollTop > 100) {
      setFixedSearch(true);
    } else {
      setFixedSearch(false);
    }
  };

  return (
    <View className="home">
      {fixedSearch ? (
        <View className="top-search fixed-search">
          <View className="search-wrapper">
            <View className="search-left">
              <Input type="text" className="input" />
            </View>
            <View className="search-right">
              <AtIcon value="search" size="30"></AtIcon>
            </View>
          </View>
        </View>
      ) : null}

      <ScrollView
        scrollY
        scrollWithAnimation
        onScroll={watchScroll}
        className="home-scroll"
      >
        <View className="top-search">
          <View className="logo">
            <Text className="logo-text">Florist</Text>
          </View>
          <View className="search-wrapper">
            <View className="search-left">
              <Input type="text" className="input" />
            </View>
            <View className="search-right">
              <AtIcon value="search" size="30"></AtIcon>
            </View>
          </View>
        </View>
        <WaterfallLayout className="home-waterfall" list={list}>{{ default: true }}</WaterfallLayout>
      </ScrollView>
    </View>
  );
}
