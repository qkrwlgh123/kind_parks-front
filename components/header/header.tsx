"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export default function Header({
  handleChangeSideBarStatus,
}: {
  handleChangeSideBarStatus: () => void;
}) {
  const router = useRouter();
  const token = localStorage.getItem("parks_token");
  /** 로그아웃 함수 */
  const handleRequestLogout = () => {
    localStorage.removeItem("parks_token");
    router.refresh();
  };
  return (
    <header className={styles.header}>
      <div className={styles.inner__container}>
        <div>
          <h2 className={styles.title}>Kind Parks</h2>
        </div>
        <div className={styles.menus__container}>
          <h3 onClick={handleChangeSideBarStatus}>Parks</h3>

          {token && <h3>글 작성하기</h3>}

          {token ? (
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
