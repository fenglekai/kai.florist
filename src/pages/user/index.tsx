import { ScrollView, View, Text } from "@tarojs/components";
import Card from "@/components/card";
import { AtActivityIndicator, AtAvatar, AtIcon } from "taro-ui";
import { useEffect, useState } from "react";
import WaterfallLayout from "@/components/waterfallLayout";
import request from "@/utils/request";
import { debounce } from "@/utils/common";
import "./index.less";

export default function User() {
  const [likeList, setLickList] = useState<{ src: string }[]>([]);
  const [page, setPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      // const data: any[] = await request(
      //   `https://picsum.photos/v2/list?page=${page}&limit=10`
      // );
      // setLickList(() => {
      //   const formatData = data.map((item: { download_url: string }) => {
      //     return {
      //       src: item.download_url,
      //     };
      //   });
      //   const res = likeList.concat(formatData);
      //   return res;
      // });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  function handleLikeBottom() {
    if (!loading) {
      setPage(page + 1);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page]);

  function infoContentBuild() {
    return (
      <View className="content">
        <AtAvatar circle text="我"></AtAvatar>
        <Text className="name">我的名称</Text>
        <AtIcon value="edit" className="i-edit"></AtIcon>
      </View>
    );
  }

  function likeTitleBuild() {
    return <Text className="title">关注列表</Text>;
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
    <ScrollView className="user" scrollY>
      <View className="top-background"></View>
      <View className="container">
        <Card className="user-info">
          {{
            content: infoContentBuild(),
          }}
        </Card>
        <Card className="user-like">
          {{
            title: likeTitleBuild(),
            content: likeContentBuild(),
          }}
        </Card>
      </View>
    </ScrollView>
  );
}
