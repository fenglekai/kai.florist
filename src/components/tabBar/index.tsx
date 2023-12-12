import { View } from "@tarojs/components";
import {
  setStorageSync,
  getStorageSync,
  switchTab,
  useDidShow,
} from "@tarojs/taro";
import { useState } from "react";
import { useSelector } from "react-redux";
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

  const navBar = useSelector(
    (state: { page: { navBar: boolean } }) => state.page.navBar
  );

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
    <View style={{ visibility: navBar ? "visible" : "hidden" }}>
      <AtTabBar
        fixed
        tabList={[
          { title: "首页", iconType: "home" },
          { title: "分类", iconType: "list" },
          { title: "我的", iconType: "user" },
        ]}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  );
}
