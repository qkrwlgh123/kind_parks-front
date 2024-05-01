"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import dynamic from "next/dynamic";

const ContentsViewer = dynamic(
  () => import("../../../components/textEditor/viewer"),
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
      }
    };
    fetchFunc();
  }, []);
  console.log(content);
  return (
    <div>
      <div className={styles.title__box}>
        <h1>{title}</h1>
      </div>
      {content && <ContentsViewer contents={content} />}
    </div>
  );
}
