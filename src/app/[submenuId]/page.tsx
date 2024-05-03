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

  const formatDate = (isoDateString: string) => {
    const dateParts = isoDateString.split("T")[0].split("-");
    const timeParts = isoDateString.split("T")[1]?.split(".")[0].split(":");

    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    let hour = parseInt(timeParts[0]);
    const minute = timeParts[1];

    let period = "오전";

    if (hour >= 12) {
      period = "오후";
      hour -= 12;
    }

    return `${year}.${month}.${day} ${period} ${hour}:${minute}`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.article_list}>
        <div>
          <h2>{subTitle}</h2>
        </div>
        {articleList.length > 0 ? (
          articleList?.map((el: any) => (
            <div className={styles.article_box} key={el.id}>
              <div className={styles.submenu__title}>
                <div className={styles.submenu}>
                  <span>{el.submenu.name}</span>
                </div>
                <Link
                  href={`/article/${el.id}`}
                  className={styles.article_link}
                >
                  <div>
                    <span>{el.title}</span>
                  </div>
                </Link>
              </div>
              <div className={styles.author__createdDate}>
                <div className={styles.author__text}>
                  <span>{el.user.userId}</span>
                </div>
                <div className={styles.createdDate__text}>
                  <span>{formatDate(el.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <span>게시물이 존재하지 않습니다.</span>
          </div>
        )}
      </div>
    </main>
  );
}
