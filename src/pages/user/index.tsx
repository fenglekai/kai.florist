import { ScrollView, View, Text } from "@tarojs/components";
import Card from "@/components/card";
import { AtActivityIndicator, AtAvatar, AtIcon } from "taro-ui";
import { useEffect, useState } from "react";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import { debounce } from "@/utils/common";
import {
  getStorageSync,
  navigateTo,
  pxTransform,
  useDidShow,
} from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/actions/user";
import "./index.less";

export default function User() {
  const [likeList, setLickList] = useState<{ src: string }[]>([]);
  const [page, setPage] = useState(6);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    setLoading(true);
    try {
      const data: any[] = await request(`/api/goods/list`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  function handleLikeBottom() {
    if (!loading) {
      // setPage(page + 1);
    }
  }
  useEffect(() => {
    // fetchData();
  }, [page]);

  useDidShow(() => {
    fetchUser();
  });

  const dispatch = useDispatch();
  const user = useSelector(
    (state: { user: { username: string; authorization: string } }) => state.user
  );
  async function fetchUser() {
    const userStore = getStorageSync("user");
    if (userStore || user.authorization) {
      await verify(userStore.authorization);
    } else {
      dispatch(resetUser());
    }
  }

  async function verify(code: string) {
    try {
      const data: any = await request(`/api/user/verify`, {
        params: {
          code,
        },
      });
      if (!data.success) {
        return dispatch(resetUser());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function intoSetting() {
    if (!user.authorization) {
      navigateTo({ url: "/pages/login/index" });
    } else {
      navigateTo({ url: "/pages/settings/index" });
    }
  }

  function infoContentBuild() {
    return (
      <View className="user-info">
        <AtAvatar circle text={user.username}></AtAvatar>
        <Text className="name">{user.username}</Text>
      </View>
    );
  }

  function settingTitleBuild() {
    return <Text>更多设置</Text>;
  }

  function settingButtonBuild() {
    const btnProperty = [{ type: "settings", name: "设置" }];
    return (
      <>
        {btnProperty.map((item, index) => (
          <View className="button-group" key={index}>
            <AtIcon value={item.type} className="icon"></AtIcon>
            <Text className="name">{item.name}</Text>
          </View>
        ))}
      </>
    );
  }

  function settingContentBuild() {
    // return <View className="content">{settingButtonBuild()}</View>;
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={intoSetting}
      >
        <Text>更多设置</Text>
        <View>
          <Text
            style={{
              fontSize: pxTransform(24),
              color: "var(--fs-text-second-color)",
            }}
          >
            {!user.authorization ? "登录查看更多设置" : ""}
          </Text>
          <AtIcon
            value="chevron-right"
            color="var(--fs-text-second-color)"
          ></AtIcon>
        </View>
      </View>
    );
  }

  function likeTitleBuild() {
    return <Text>关注列表</Text>;
  }

  function likeContentBuild() {
    return (
      <ScrollView
        scrollY
        onScrollToLower={debounce(handleLikeBottom, 200)}
        className="content"
      >
        <WaterfallLayout list={likeList} />
        <AtActivityIndicator
          isOpened={loading}
          content="加载中..."
          mode="center"
        ></AtActivityIndicator>
      </ScrollView>
    );
  }

  return (
    <ScrollView scrollY>
      <View className="user">
        <View className="top-background"></View>
        <View className="container">
          {infoContentBuild()}
          <Card className="setting">
            {{
              content: settingContentBuild(),
            }}
          </Card>
          <Card className="user-like">
            {{
              title: likeTitleBuild(),
              content: likeContentBuild(),
            }}
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
