import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import { AtTabBar } from "taro-ui";

export default function TabBar() {
  useDidShow(() => {
    try {
      const index = Taro.getStorageSync('page-index')
      if (!index) {
        Taro.setStorageSync('page-index', 0)
      } else {
        setCurrent(index)
      }
    } catch (error) {
      console.error(error)
    }
  });

  const [current, setCurrent] = useState(0);

  const dict = ["home", "cate", "user"];
  function handleClick(tab: number) {
    setCurrent(tab);
    Taro.setStorageSync('page-index', tab)
    Taro.switchTab({
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
