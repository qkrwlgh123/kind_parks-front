"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import dynamic from "next/dynamic";

const ContentsViewer = dynamic(
  () => import("../../../../components/textEditor/viewer"),
  { ssr: false }
);

type Props = {
  params: {
    articleId: number;
  };
};

export default function ArticleDetail({ params }: Props) {
  console.log(params);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdDate, setCreateDate] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await axios.post(
        "https://server.kindparks.com/api/article/view",
        {
          id: Number(params.articleId),
        }
      );
      if (response.data.code === 200) {
        setContent(response.data.data.content);
        setTitle(response.data.data.title);
        setAuthor(response.data.data.user.userId);
        setCreateDate(response.data.data.createdAt);
        setSubmenu(response.data.data.submenu.name);
      }
    };
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

    return `${year}년 ${month}월 ${day}일 ${period} ${hour}시 ${minute}분`;
  };
  return (
    <div>
      <div className={styles.title__box}>
        <h2>{submenu}</h2>
        <h1>{title}</h1>
        <div>
          <div className={styles.subtitle_box}>
            <span>{author}</span>
          </div>
          <div className={styles.subtitle_box}>
            {createdDate && <span>{formatDate(createdDate)}</span>}
          </div>
        </div>
      </div>
      {content && <ContentsViewer contents={content} />}
    </div>
  );
}
