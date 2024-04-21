"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import styles from "./page.module.css";
import Header from "../../components/header/header";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  /** 메뉴 버튼 클릭 시, Sidebar 생성 */
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  /** 로그인 상태 */
  const [isLogin, setIsLogin] = useState(false);

  /** sideBar Active 함수 */
  const handleChangeSideBarStatus = () => {
    setIsSidebarActive((prev) => !prev);
  };

  /** 로컬 스토리지에 토큰 존재 시(로그인 완료 상태일 시), 로그인 상태 true로 변경 */
  useEffect(() => {
    if (!localStorage.getItem("kind_token")) {
      setIsLogin(true);
      return;
    }
  }, []);

  /** 비 로그인 시, 로그인 페이지 리다이렉트 */
  useEffect(() => {
    if (!isLogin) permanentRedirect("/login");
  }, [isLogin]);

  return isLogin ? (
    <main className={styles.main}>
      <Header handleChangeSideBarStatus={handleChangeSideBarStatus} />
      <Sidebar isSidebarActive={isSidebarActive} />
    </main>
  ) : null;
}
