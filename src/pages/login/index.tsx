import { disableNavBar, showNavBar } from "@/actions/page";
import { Form, Image, Input, View } from "@tarojs/components";
import { useLoad, navigateBack, pxTransform } from "@tarojs/taro";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AtButton, AtDivider, AtIcon } from "taro-ui";
import wx from "@/assets/image/wx-logo.svg";
import request from "@/utils/request";
import { showToast } from "@/actions/toast";
import { setUser } from "@/actions/user";
import "./index.less";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  useLoad(() => {
    dispatch(disableNavBar());
  });

  function handleBackClick() {
    navigateBack();
    dispatch(showNavBar());
    onReset();
  }

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  function onSubmit() {
    login(loginForm);
  }
  function onReset() {
    setLoginForm({
      username: "",
      password: "",
    });
  }

  async function login(user: LoginForm) {
    try {
      const data = await request(`/api/user/login`, {
        method: "post",
        data: user,
      });
      const { username, authorization } = data.data;
      dispatch(setUser({ username, authorization }));
      handleBackClick()
    } catch (error) {
      console.log(error);
      dispatch(showToast({ status: "error", text: error.message }));
    }
  }

  return (
    <View className="login">
      <View className="background-img"></View>
      <View className="container">
        <View className="back-btn" onClick={handleBackClick}>
          <AtIcon value="chevron-left"></AtIcon>
        </View>
        <View className="main">
          <View className="base-title">您好，欢迎登录！</View>
          <View className="subtitle">推荐使用微信登录</View>
          <View className="form-wrapper">
            <Form onSubmit={onSubmit}>
              <View className="form-label">用户名</View>
              <Input
                name="username"
                type="text"
                placeholder="请输入用户名"
                className="form-input"
                value={loginForm.username}
                maxlength={16}
                onInput={(event) => {
                  loginForm.username = event.detail.value;
                  setLoginForm(loginForm);
                }}
              />
              <View className="form-label">密码</View>
              <Input
                name="password"
                password
                type="safe-password"
                placeholder="请输入密码"
                className="form-input"
                value={loginForm.password}
                maxlength={16}
                onInput={(event) => {
                  loginForm.password = event.detail.value;
                  setLoginForm(loginForm);
                }}
              />
              <AtButton formType="submit" type="primary">
                登录
              </AtButton>
            </Form>
          </View>
          <AtDivider
            content="第三方账号登录"
            fontColor="var(--fs-text-second-color)"
          />
          <View className="other-wrapper">
            <Image src={wx} style={{ width: pxTransform(84) }} />
          </View>
        </View>
      </View>
    </View>
  );
}
