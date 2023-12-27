import { disableNavBar, showNavBar } from "@/actions/page";
import ImageCom from "@/components/imageCom";
import request from "@/utils/request";
import { Swiper, SwiperItem, View, Text } from "@tarojs/components";
import { useLoad, navigateBack, getCurrentInstance, pxTransform } from "@tarojs/taro";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AtButton, AtIcon } from "taro-ui";
import "./index.less";

interface detailInfo {
  id: number;
  title: string;
  description: string;
  price: number;
  like_num: number;
  staticList: string[];
}

export default function ProductDetail() {
  const dispatch = useDispatch();
  const instance = getCurrentInstance();
  useLoad(() => {
    dispatch(disableNavBar());
    getDetailData();
  });

  function handleBackClick() {
    navigateBack();
    dispatch(showNavBar());
  }

  const [imgCurrent, setImgCurrent] = useState<number>(1);
  const [detailData, setDetailData] = useState<detailInfo>();
  const getDetailData = async () => {
    const data: { data: detailInfo } = await request(
      `/api/web/productDetail/${instance.router?.params.id}`
    );
    const formatData = {
      ...data.data,
      staticList: data.data.staticList.map(
        (staticItem) => process.env.TARO_APP_API + staticItem
      ),
    };
    setDetailData(formatData);
  };

  function handleSwiperChange(e: any) {
    const current = e.detail.current;
    setImgCurrent(current + 1);
  }

  return (
    <View className="detail-wrapper">
      <View className="back-btn box-bg position-fixed">
        <AtIcon value="chevron-left" onClick={handleBackClick} />
      </View>
      <View className="product-img">
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          indicatorDots
          style={{ height: pxTransform(600) }}
          onChange={handleSwiperChange}
        >
          {detailData?.staticList.map((item, index) => (
            <SwiperItem key={index}>
              <View className="swiper-view">
                <ImageCom src={item} mode="aspectFit" className="img" />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
        {detailData?.staticList.length ? (
          <View className="swiper-tip box-bg">
            {imgCurrent}/{detailData?.staticList.length}
          </View>
        ) : null}
      </View>
      <View className="detail-info">
        <View className="price">{detailData?.price}</View>
        <View className="title">{detailData?.title}</View>
        <View className="description">{detailData?.description}</View>
        <View className="like">
          <AtButton type="primary">
            <AtIcon value="heart"></AtIcon>
            <Text className="space">{detailData?.like_num}</Text>
          </AtButton>
        </View>
      </View>
    </View>
  );
}
