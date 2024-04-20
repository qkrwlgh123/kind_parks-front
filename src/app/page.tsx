"use client";

import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./page.module.css";
import Header from "../../components/header/header";

export default function Home() {
  /** 메뉴 버튼 클릭 시, Sidebar 생성 */
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  /** sideBar Active 함수 */
  const handleChangeSideBarStatus = () => {
    setIsSidebarActive((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <Header handleChangeSideBarStatus={handleChangeSideBarStatus} />
      <Sidebar isSidebarActive={isSidebarActive} />
    </main>
  );
}
