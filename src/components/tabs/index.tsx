import { ScrollView, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.less";
import ContainList from "./containList";

export default function Tabs(props: PropsParams) {
  useEffect(() => {
    setNav(() => {
      const nav: string[] = [];
      props.tabList.forEach((item: NavItem) => {
        nav.push(item.nav);
      });
      return nav;
    });
  }, [props.tabList]);

  const [tab, setTab] = useState(props.currentTab);
  const [nav, setNav] = useState<string[]>([]);

  function navBuild(navList: string[]) {
    return (
      <>
        {navList.map((item, index) => (
          <View
            className={`nav-item ${tab === index ? "active" : null}`}
            key={index}
            onClick={() => handleNavClick(index)}
          >
            {item}
          </View>
        ))}
      </>
    );
  }
  function handleNavClick(key: number) {
    props.tabClick(key);
    setScrollTop(anchor[key])
  }

  const [scrollTop, setScrollTop] = useState(0);
  function handleScroll(e: any) {
    setScrollTop(e.detail.scrollTop);
  }

  const [anchor, setAnchor] = useState(Array(props.tabList.length).fill(0));
  function setNavListHeight(current: number, height: number) {
    anchor[current] = height;
    setAnchor(anchor);
  }

  return (
    <View className="tab-wrapper">
      <ScrollView className="tab-nav" scrollY scrollWithAnimation>
        {navBuild(nav)}
      </ScrollView>
      <ScrollView
        className="tab-list"
        scrollY
        scrollTop={scrollTop}
        onScroll={handleScroll}
      >
        {props.tabList.map((item, index) => (
          <ContainList
            list={item}
            current={index}
            scrollTop={scrollTop}
            nextBar={(bar) => setTab(bar)}
            getHeight={setNavListHeight}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}
