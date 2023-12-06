import { View } from "@tarojs/components";
import "./index.less";

export default function Skeleton() {
  function contentLineTitleBuild() {
    return <View className="skeleton-title"></View>;
  }

  function contentLineBuild(key) {
    return <View className="skeleton-line" key={key}></View>;
  }

  function contentBuild(title: boolean = false, rows: number = 2) {
    const rowList = Array(rows).fill(true);
    return (
      <View className="skeleton-content">
        {title ? contentLineTitleBuild() : null}
        {rowList.map((_, index) => contentLineBuild("line" + index))}
      </View>
    );
  }

  function boxBuild() {
    return <View className="skeleton-box"></View>;
  }

  return (
    <View className="skeleton-main">
      <View className="skeleton-animation"></View>
      {boxBuild()}
      {contentBuild()}
    </View>
  );
}
