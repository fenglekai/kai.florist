import { View } from "@tarojs/components";
import {
  useDidShow,
  setStorageSync,
  getStorageSync,
  switchTab,
} from "@tarojs/taro";
import { useState } from "react";
import { AtTabBar } from "taro-ui";

export default function TabBar() {
  useDidShow(() => {
    try {
      const index = getStorageSync("page-index");
      if (!index) {
        setStorageSync("page-index", 0);
      } else {
        setCurrent(index);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const [current, setCurrent] = useState(0);

  const dict = ["home", "cate", "user"];
  function handleClick(tab: number) {
    setCurrent(tab);
    setStorageSync("page-index", tab);
    switchTab({
      url: `/pages/${dict[tab]}/index`,
    });
  }

  return (
    <View>
      <AtTabBar
        fixed
        tabList={[
          { title: "首页", iconType: "home" },
          { title: "分类", iconType: "shopping-bag-2" },
          { title: "我的", iconType: "user" },
        ]}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  );
}
