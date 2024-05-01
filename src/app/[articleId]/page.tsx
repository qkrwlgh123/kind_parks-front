"use client";

import { useEffect, useState } from "react";

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
      }
    };
    fetchFunc();
  }, []);
  console.log(content);
  return <div>{content && <ContentsViewer contents={content} />}</div>;
}
