"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./page.module.css";
import Header from "../../components/header/header";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  /** 메뉴 버튼 클릭 시, Sidebar 생성 */
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const [isTitleClicked, setIsTitleClicked] = useState(0);

  const [articleList, setArticleList] = useState([]);
  /** 로그인 상태 */
  const [isLogin, setIsLogin] = useState(false);

  /** sideBar Active 함수 */
  const handleChangeSideBarStatus = () => {
    setIsSidebarActive((prev) => !prev);
  };

  const fetchFunc = async () => {
    const response = await axios.post(
      "https://server.kindparks.com/api/article/list"
    );
    if (response.data.code === 200) {
      setArticleList(response.data.data);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);
  console.log(articleList);
  return (
    <main className={styles.main}>
      <Header handleChangeSideBarStatus={handleChangeSideBarStatus} />
      <Sidebar isSidebarActive={isSidebarActive} />

      <div className={styles.article_list}>
        {isTitleClicked === 0 &&
          articleList?.map((el: any) => (
            <Link href={`/${el.id}`} key={el.id}>
              <div>
                <span>글번호:{el.id}</span>
                <span>{el.title}</span>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
