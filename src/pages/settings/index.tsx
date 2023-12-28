import { disableNavBar, showNavBar } from "@/actions/page";
import { View } from "@tarojs/components";
import { useLoad, navigateBack } from "@tarojs/taro";
import { useDispatch } from "react-redux";
import {
  AtButton,
  AtList,
  AtListItem,
  AtModal,
  AtNavBar,
} from "taro-ui";
import Card from "@/components/card";
import { useState } from "react";
import { showToast } from "@/actions/toast";
import "./index.less";

export default function Settings() {
  const dispatch = useDispatch();
  useLoad(() => {
    dispatch(disableNavBar());
  });

  function handleBackClick() {
    navigateBack();
    dispatch(showNavBar());
  }

  function handleSave() {
    dispatch(showToast({status: 'success' , text: '保存成功'}));
  }

  const [modal, setModal] = useState(false);
  function handleLogout() {
    console.log("logout");
    setModal(false);
  }

  return (
    <View className="settings">
      <AtNavBar
        onClickLeftIcon={handleBackClick}
        color="#000"
        leftIconType="chevron-left"
      />
      <View className="container">
        <Card>
          {{
            content: (
              <AtList hasBorder={false}>
                <AtListItem title="username" arrow="right" />
                <AtListItem title="wx-bind" hasBorder={false} arrow="right" />
              </AtList>
            ),
          }}
        </Card>
        <AtButton type="primary" className="btn-primary" onClick={handleSave}>
          保存
        </AtButton>
        <AtButton className="btn-second" onClick={() => setModal(true)}>
          退出登录
        </AtButton>
      </View>
      <AtModal
        isOpened={modal}
        title="确认退出吗？"
        cancelText="取消"
        confirmText="确认"
        onClose={() => setModal(false)}
        onCancel={() => setModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}
