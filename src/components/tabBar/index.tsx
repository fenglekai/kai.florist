import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtTabBar } from "taro-ui";

export default function TabBar() {
  const [current, setCurrent] = useState(0)

  function handleClick(tab: number) {
    setCurrent(tab)
    const dict = ['home', 'cate', 'user'];
    Taro.redirectTo({
      url: `/pages/${dict[tab]}/index`,
    })
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
