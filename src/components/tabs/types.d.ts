interface PropsParams {
  currentTab: number;
  tabList: NavItem[];
  tabClick: (index: number) => void;
}
interface NavItem {
  nav: string;
  children: ListItem[];
}
interface ListItem {
  title: string;
  description: string;
  price: string;
  src: string;
}