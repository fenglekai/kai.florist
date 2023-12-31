import { View } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { useState } from "react";
import Tabs from "@/components/tabs";
import request from "@/utils/request";
import "./index.less";

interface cateList {
  id: number;
  title: string;
  description: string;
  price: number;
  like_num: number;
  cate: string;
  src: string;
}

export default function Cate() {
  useLoad(() => {
    getCateData();
  });

  async function getCateData() {
    const data: { data: cateList[] } = await request("/api/web/cateList");
    const map = new Map();
    data.data.forEach((item) => {
      item.src = process.env.TARO_APP_API + item.src;
      if (map.has(item.cate)) {
        const child: any[] = map.get(item.cate);
        child.push(item);
      } else {
        map.set(item.cate, [item]);
      }
    });
    const res: any[] = [];
    map.forEach((item, key) => {
      res.push({ nav: key, children: item });
    });

    setTabList(res);
  }

  const [tab, setTab] = useState(0);

  const [tabList, setTabList] = useState<{ nav: string; children: any[] }[]>(
    []
  );
  function handleTabClick(tabIndex: any) {
    setTab(tabIndex);
  }

  function handleProduct(item: any, _index: number) {
    navigateTo({
      url: `/pages/productDetail/index?id=${item.id}`,
    });
  }

  return (
    <View className="cate">
      <Tabs
        currentTab={tab}
        tabList={tabList}
        tabClick={handleTabClick}
        cardClick={handleProduct}
      />
    </View>
  );
}
