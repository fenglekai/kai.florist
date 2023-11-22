import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import { View } from "@tarojs/components";
import "./app.less";
import TabBar from "./components/tabBar";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    // console.log('App launched.')
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
