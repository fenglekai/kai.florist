import { View, Input, ScrollView, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import "./index.less";

interface homeList {
  id: number;
  title: string;
  description: string;
  price: number;
  like_num: number;
  src: string;
}

export default function Home() {
  useLoad(() => {
    getHomeData();
  });

  const getHomeData = async () => {
    const data: { data: homeList[] } = await request(
      "http://127.0.0.1:7001/api/web/homeList"
    );
    const formatData = data.data.map((item) => {
      return {
        ...item,
        src: "http://127.0.0.1:7001" + item.src,
      };
    });
    setList(formatData);
  };

  const [list, setList] = useState<any[]>([]);

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
        <WaterfallLayout className="home-waterfall" list={list}>
          {{ default: true }}
        </WaterfallLayout>
      </ScrollView>
    </View>
  );
}
