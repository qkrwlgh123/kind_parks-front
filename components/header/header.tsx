"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({
  handleChangeSideBarStatus,
}: {
  handleChangeSideBarStatus: () => void;
}) {
  const router = useRouter();

  const [isToken, setIsToken] = useState(false);

  /** 로그아웃 함수 */
  const handleRequestLogout = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("parks_token");
      setIsToken(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("parks_token")) {
        setIsToken(true);
      }
    } else {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log(isMobile);
      if (isMobile) {
        if (localStorage.getItem("parks_token")) {
          setIsToken(true);
        }
      }
    }
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.inner__container}>
        <div>
          <h2 className={styles.title}>Kind Parks</h2>
        </div>
        <div className={styles.menus__container}>
          <h3 onClick={handleChangeSideBarStatus}>Parks</h3>

          {isToken && <h3>글 작성하기</h3>}
          {isToken && (
            <Link href="/addMenu" className={styles.link__style}>
              <h3>사이드바 메뉴 편집</h3>
            </Link>
          )}
          {isToken ? (
            <h3 onClick={handleRequestLogout}>로그아웃</h3>
          ) : (
            <Link href="/login" className={styles.link__style}>
              <h3>로그인</h3>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
