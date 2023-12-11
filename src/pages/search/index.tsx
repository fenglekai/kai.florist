import { Input, PageContainer, View } from "@tarojs/components";
import { useLoad, useUnload } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useReactChild } from "types";
import { useDispatch } from "react-redux";
import './index.less'

export default function Search() {
  const dispatch = useDispatch()
  useLoad(() => {
    dispatch({ type: 'DISABLE_NAVBAR' })
  });
  useUnload(() => {
    dispatch({ type: 'SHOW_NAVBAR' })
  })

  function weappBuild(slot: useReactChild) {
    return <PageContainer position="right" className="top-search">{slot}</PageContainer>;
  }
  function h5Build(slot: useReactChild) {
    return <View className="top-search">{slot}</View>;
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
    <>
      <View className="search-wrapper">
        <View className="search-left">
          <AtIcon value="search" size="30"></AtIcon>
        </View>
        <View className="search-right">
          <Input type="text" className="input" />
        </View>
      </View>
    </>
  );
}
