import { Input, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useState } from "react";
import Tabs from "@/components/tabs";
import "./index.less";

export default function Cate() {
  useLoad(() => {
    for (let i = 0; i < 10; i++) {
      tabList[0].children.push({
        title: "商品名称",
        description: "商品描述",
        price: "19",
        src: "",
      });
      tabList[1].children.push({
        title: "商品名称",
        description: "商品描述",
        price: "19",
        src: "",
      });
      tabList[2].children.push({
        title: "商品名称",
        description: "商品描述",
        price: "19",
        src: "",
      });
    }
    for (let i = 0; i < 2; i++) {
      tabList[3].children.push({
        title: "商品名称",
        description: "商品描述",
        price: "19",
        src: "",
      });
      tabList[4].children.push({
        title: "商品名称",
        description: "商品描述",
        price: "19",
        src: "",
      });
    }
    setTabList(tabList);
  });

  const [tab, setTab] = useState(0);

  const [tabList, setTabList] = useState<any>([
    { nav: "标签页1", children: [] },
    { nav: "标签页2", children: [] },
    { nav: "标签页3", children: [] },
    { nav: "标签页4", children: [] },
    { nav: "标签页5", children: [] },
  ]);
  function handleTabClick(tabIndex: any) {
    setTab(tabIndex);
  }

  return (
    <View className="cate">
      <View className="top-search">
        <View className="search-wrapper">
          <View className="search-left">
            <AtIcon value="search" size="30"></AtIcon>
          </View>
          <View className="search-right">
            <Input type="text" className="input" />
          </View>
        </View>
      </View>
      <Tabs currentTab={tab} tabList={tabList} tabClick={handleTabClick} />
    </View>
  );
}
