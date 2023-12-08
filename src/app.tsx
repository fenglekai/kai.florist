import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import { View } from "@tarojs/components";
import "./app.less";
import TabBar from "./components/tabBar";
import { setRootVariable } from "./utils/cssVariable";

function App({ children }: PropsWithChildren<any>) {
  const test = '#fff'
  useLaunch(() => {
    setRootVariable()
  });

  // children 是将要会渲染的页面
  return (
    <View>
      {children}
      <TabBar />
    </View>
  );
}

export default App;
