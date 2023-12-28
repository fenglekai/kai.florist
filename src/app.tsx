import { PropsWithChildren } from "react";
import { useLaunch, hideTabBar } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import { Provider } from "react-redux";
import configStore from "./store";
import "./app.less";
import TabBar from "./components/tabBar";
import { setRootVariable } from "./utils/cssVariable";
import Toast from "./components/toast";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    setRootVariable();
    hideTabBar();
  });
  const store = configStore();

  // children 是将要会渲染的页面
  return (
    <Provider store={store}>
      <TabBar />
      <Toast />
      {children}
    </Provider>
  );
}

export default App;
