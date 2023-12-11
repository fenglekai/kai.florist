import {
  Input,
  PageContainer,
  View,
  Text,
  ScrollView,
} from "@tarojs/components";
import { useLoad, navigateBack } from "@tarojs/taro";
import { AtButton, AtIcon } from "taro-ui";
import { useReactChild } from "types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardInfo from "@/components/cardInfo";
import "./index.less";

export default function Search() {
  const dispatch = useDispatch();
  useLoad(() => {
    dispatch({ type: "DISABLE_NAVBAR" });
  });

  function handleBackClick() {
    navigateBack();
    dispatch({ type: "SHOW_NAVBAR" });
  }

  const [searchInput, setSearchInput] = useState<string>();

  function onInput(e: { detail: { value: string } }) {
    setSearchInput(e.detail.value);
    if (!e.detail.value) {
      setShowRecommend(true);
    }
  }

  function handleSearch() {
    console.log(searchInput);
    setShowRecommend(false);
  }

  const [showRecommend, setShowRecommend] = useState(true);
  const hotSearch = [
    "芍药",
    "大丽花",
    "君子兰",
    "郁金香",
    "玫瑰花",
    "玉兰花",
    "玉兰花",
    "玉兰花",
    "玉兰花",
  ];
  function handleHotItem(keyword: string) {
    setSearchInput(keyword);
    handleSearch();
  }

  function inputWithButtonBuild() {
    return (
      <>
        <View className="search-input">
          <AtIcon value="search" size="30" className="icon"></AtIcon>
          <Input
            type="text"
            confirmType="search"
            className="input"
            placeholder="搜索"
            maxlength={20}
            value={searchInput}
            onInput={onInput}
          />
        </View>
        <AtButton
          circle
          type="primary"
          size="small"
          className="search-btn"
          onClick={handleSearch}
        >
          搜索
        </AtButton>
      </>
    );
  }

  function weappBuild(slot: useReactChild) {
    return (
      <PageContainer position="right">
        <View className="top-search">
          <View className="search-wrapper">{inputWithButtonBuild()}</View>
        </View>
        {slot}
      </PageContainer>
    );
  }
  function h5Build(slot: useReactChild) {
    return (
      <>
        <View className="top-search">
          <View className="search-wrapper">
            <AtIcon
              value="chevron-left"
              className="search-back"
              onClick={handleBackClick}
            />
            {inputWithButtonBuild()}
          </View>
        </View>
        {slot}
      </>
    );
  }
  function envBuild(slot: useReactChild) {
    if (process.env.TARO_ENV === "h5") {
      return h5Build(slot);
    }
    if (process.env.TARO_ENV === "weapp") {
      return weappBuild(slot);
    }
  }

  return envBuild(
    <View className="content">
      {showRecommend ? (
        <View className="recommend">
          <View className="recommend-title">热门搜索</View>
          <View className="recommend-list">
            {hotSearch.map((item) => (
              <Text
                className="recommend-item"
                key={item}
                onClick={() => handleHotItem(item)}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <ScrollView>
          <CardInfo
            child={{
              src: "string",
              title: "string",
              description: "string",
              price: 28,
              like_num: 32,
            }}
          />
        </ScrollView>
      )}
    </View>
  );
}
