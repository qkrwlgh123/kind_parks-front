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
      "https://server.kindparks.com/api/article/latestList"
    );
    if (response.data.code === 200) {
      setArticleList(response.data.data);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);

  return (
    <main className={styles.main}>
      <Header handleChangeSideBarStatus={handleChangeSideBarStatus} />
      <Sidebar />

      <div className={styles.article_list}>
        <div>
          <h2>최신글</h2>
        </div>
        {articleList?.map((el: any) => (
          <div className={styles.article_box} key={el.id}>
            <div className={styles.author}>
              <span>{el.user.userId}</span>
            </div>
            <Link href={`/article/${el.id}`} className={styles.article_link}>
              <div>
                <span>{el.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
