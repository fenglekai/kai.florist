import { View } from "@tarojs/components";
import { useEffect, useRef } from "react";
import CardInfo from "../cardInfo";

export default function NavBar(props: {
  list: NavItem;
  current: number;
  scrollTop: number;
  nextBar: (index: number) => void;
  getHeight: (current: number, height: number) => void;
}) {
  const listDom = useRef<HTMLElement>();
  const navBarDom = useRef<HTMLElement>();
  useEffect(() => {
    setTimeout(() => {
      if (!navBarDom.current || !listDom.current) return;
      props.getHeight(
        props.current,
        listDom.current.offsetTop - navBarDom.current.offsetHeight - 10
      );
    }, 200);
  }, []);
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
          <CardInfo child={child} key={childIndex} />
        ))}
      </>
    );
  }

  return (
    <View className="list-item" ref={listDom}>
      <View
        className="nav-bar"
        ref={navBarDom}
        id={"nav-id" + String(props.current)}
      >
        {props.list.nav}
      </View>
      {cardBuild(props.list.children)}
    </View>
  );
}
