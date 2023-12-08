export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/cate/index',
    'pages/user/index',
    'pages/search/index'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/cate/index',
        text: '分类',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Florist',
    navigationBarTextStyle: 'black'
  }
})
