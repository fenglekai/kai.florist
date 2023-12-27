import { ScrollView, View, Text } from "@tarojs/components";
import Card from "@/components/card";
import {
  AtActivityIndicator,
  AtAvatar,
  AtIcon,
  AtList,
  AtListItem,
} from "taro-ui";
import { useEffect, useState } from "react";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import { debounce } from "@/utils/common";
import { getStorageSync, setStorageSync, navigateTo, pxTransform } from "@tarojs/taro";
import "./index.less";

interface User {
  username: string;
  authorization: string;
}

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

  useEffect(() => {
    fetchUser();
  }, []);

  const [user, setUser] = useState<User>({
    username: "未登录",
    authorization: "",
  });
  async function fetchUser() {
    const userStore = getStorageSync("user");
    if (!userStore) return;
    if (
      userStore.username === user.username &&
      userStore.authorization === user.authorization
    ) {
      const valid = await verify(userStore.authorization);
      if (!valid) {
        setUser({
          username: "未登录",
          authorization: "",
        });
      }
    } else {
      setStorageSync("user", undefined);
      setUser({
        username: "未登录",
        authorization: "",
      });
    }
  }
  async function login() {
    try {
      const data = await request(`/api/user/login`, {
        method: "post",
        data: {
          username: "test123",
          password: "123456",
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function verify(code: string) {
    try {
      const data = await request(`/api/user/verify`, {
        params: {
          code,
        },
      });
      return data.data.success || false;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  function intoSetting() {
    navigateTo({ url: "/pages/settings/index" });
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
          <Text style={{fontSize: pxTransform(24), color: 'var(--fs-text-second-color)'}}>登录</Text>
          <AtIcon value="chevron-right"></AtIcon>
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
