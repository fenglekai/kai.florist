import { View, Image } from "@tarojs/components";
import { useEffect, useRef } from "react";
import { AtIcon } from "taro-ui";
import empty from "@/assets/image/empty.png";


export default function NavBar(props: {
  list: NavItem;
  current: number;
  scrollTop: number;
  nextBar: (index: number) => void;
  getHeight: (current: number,height: number) => void;
}) {
  const listDom = useRef<HTMLElement>();
  const navBarDom = useRef<HTMLElement>();
  useEffect(() => {
    setTimeout(() => {
      if (!navBarDom.current || !listDom.current) return;
      props.getHeight(props.current,listDom.current.offsetTop - navBarDom.current.offsetHeight - 10)
    }, 200);
  },[])
  useEffect(() => {
    if (!navBarDom.current || !listDom.current) return;
    const contentHeight =
      listDom.current.offsetHeight - navBarDom.current.offsetHeight;
    if (
      navBarDom.current.offsetTop > 0 &&
      navBarDom.current.offsetTop < contentHeight
    ) {
      props.nextBar(props.current);
    }
  }, [props.scrollTop]);

  function cardBuild(card: ListItem[]) {
    return (
      <>
        {card.map((child, childIndex) => (
          <View className="card-wrapper" key={childIndex}>
            <Image className="card-left" src={child.src || empty} />
            <View className="card-main">
              <View>
                <View className="card-primary-text">{child.title}</View>
                <View className="card-second-text">{child.description}</View>
              </View>
              <View className="card-price card-primary-text">
                {child.price}
              </View>
            </View>
            <View className="card-right">
              <AtIcon value="heart"></AtIcon>
            </View>
          </View>
        ))}
      </>
    );
  }

  return (
    <View className="list-item" ref={listDom}>
      <View className="nav-bar" ref={navBarDom}>
        {props.list.nav}
      </View>
      <View className="hidden" id={"nav-id" + String(props.current)}>
        {props.list.nav}
      </View>
      {cardBuild(props.list.children)}
    </View>
  );
}
