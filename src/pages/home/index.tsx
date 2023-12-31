import { View, ScrollView, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { useState } from "react";
import { useLoad, navigateTo } from "@tarojs/taro";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import { getRootVariable } from "@/utils/cssVariable";
import "./index.less";

export interface homeList {
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
    const data: { data: homeList[] } = await request("/api/web/homeList");
    const formatData = data.data.map((item) => {
      return {
        ...item,
        src: process.env.TARO_APP_API + item.src,
      };
    });
    setList(formatData);
  };

  const [list, setList] = useState<any[]>([]);

  const [toTop, setToTop] = useState(true);
  const watchScroll = (e: any) => {
    const scrollTop = e.detail.scrollTop;
    if (scrollTop > 100) {
      setToTop(false);
    } else {
      setToTop(true);
    }
  };

  function handleSearch() {
    navigateTo({
      url: `/pages/search/index`,
    });
  }

  function searchBuild() {
    return (
      <>
        <View className="logo">
          <Text
            className="logo-text"
            style={{
              borderColor: toTop ? "#ffffff" : undefined,
              color: toTop ? "#ffffff" : undefined,
            }}
          >
            Florist
          </Text>
        </View>
        <View
          className="search-wrapper"
          style={{
            backgroundColor: toTop ? "#ffffff" : undefined,
          }}
          onClick={handleSearch}
        >
          <View className="search-content">
            <Text className="text-over-one placeholder">搜索</Text>
          </View>
          <View className="search-icon">
            <AtIcon value="search" size="30"></AtIcon>
          </View>
          <View className="search-btn">
            <Text>搜索</Text>
          </View>
        </View>
      </>
    );
  }

  function handleClick(item: any, _key: number) {
    navigateTo({
      url: `/pages/productDetail/index?id=${item.id}`,
    });
  }

  return (
    <View className="home">
      <ScrollView
        scrollY
        scrollWithAnimation
        onScroll={watchScroll}
        className="home-scroll"
      >
        <View
          className="top-search sticky-search"
          style={{
            backgroundColor: toTop
              ? `var(${getRootVariable("primary-color")})`
              : undefined,
          }}
        >
          {searchBuild()}
        </View>
        <WaterfallLayout
          className="home-waterfall"
          list={list}
          onClick={handleClick}
        >
          {{ default: true }}
        </WaterfallLayout>
      </ScrollView>
    </View>
  );
}
