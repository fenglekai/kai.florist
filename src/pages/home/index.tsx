import { View, Input, ScrollView, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { SetStateAction, useState } from "react";
import { useLoad, navigateTo } from "@tarojs/taro";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import { debounce } from "@/utils/common";
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

  const [searchInput, setSearchInput] = useState<string>();

  function onInput(e: {
    detail: { value: SetStateAction<string | undefined> };
  }) {
    setSearchInput(e.detail.value);
  }

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
            <Input
              type="text"
              className="input"
              disabled
              maxlength={20}
              value={searchInput}
              onInput={debounce(onInput, 1000)}
            />
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
            backgroundColor: toTop ? "var(--fs-primary-color)" : undefined,
          }}
        >
          {searchBuild()}
        </View>
        <WaterfallLayout className="home-waterfall" list={list}>
          {{ default: true }}
        </WaterfallLayout>
      </ScrollView>
    </View>
  );
}
