"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../../components/sidebar/sidebar";
import styles from "./page.module.css";
import Header from "../../../components/header/header";
import axios from "axios";
import Link from "next/link";

export default function SubmenuPage() {
  const router = usePathname();
  console.log(router.substring(1));
  /** 메뉴 버튼 클릭 시, Sidebar 생성 */
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const [subTitle, setSubTitle] = useState("");
  const [articleList, setArticleList] = useState([]);

  /** sideBar Active 함수 */
  const handleChangeSideBarStatus = () => {
    setIsSidebarActive((prev) => !prev);
  };

  const fetchFunc = async () => {
    const response = await axios.post(
      "https://server.kindparks.com/api/article/list",
      {
        submenuId: Number(router.substring(1)),
      }
    );
    if (response.data.code === 200) {
      console.log(response.data?.data.submenu);
      setArticleList(response.data.data.list);
      setSubTitle(response.data?.data.submenu);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);
  console.log(subTitle);
  return (
    <main className={styles.main}>
      <Header handleChangeSideBarStatus={handleChangeSideBarStatus} />
      <Sidebar />

      <div className={styles.article_list}>
        <div>
          <h2>{subTitle}</h2>
        </div>
        {articleList.length > 0 ? (
          articleList?.map((el: any) => (
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
          ))
        ) : (
          <div>
            <span>게시물이 존재하지 않습니다.</span>
          </div>
        )}
        {}
      </div>
    </main>
  );
}
