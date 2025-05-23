"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  /** 로그인 요청 정보 */
  const [loginInfo, setLoginInfo] = useState({ id: "", password: "" });

  /** 로그인 요청 함수 */
  const handleLoginRequest = async (
    event: any,
    id: string,
    password: string
  ) => {
    event.preventDefault();
    if (id.length === 0 || password.length === 0) {
      alert("계정정보가 입력되지 않았습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "https://server.kindparks.com/api/auth/login",
        {
          id: id,
          password: password,
        }
      );

      // 로그인 성공 시 처리
      const token = response.data.token;
      if (typeof window !== undefined) {
        localStorage.setItem("parks_token", token);
        router.replace("/");
      } else {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(isMobile);
        if (isMobile) {
          localStorage.setItem("parks_token", token);
          router.replace("/");
        }
      }
    } catch (error: any) {
      // 로그인 실패 시 처리
      console.error("로그인 실패:", error.response.data);
      alert("계정정보를 확인해주세요.");
      throw error; // 예외를 다시 던져서 호출하는 부분에서 처리하도록 합니다.
    }
  };

  return (
    <main className={styles.login__box}>
      <div>
        <h1>Kind Parks</h1>
      </div>
      <form className={styles.form__box}>
        <div className={styles.inputs__container}>
          <input
            className={styles.input}
            placeholder="계정"
            value={loginInfo.id}
            onChange={(event) => {
              setLoginInfo({ ...loginInfo, id: event.target.value });
            }}
          />
          <input
            className={styles.input}
            placeholder="비밀번호"
            type="password"
            value={loginInfo.password}
            onChange={(event) => {
              setLoginInfo({ ...loginInfo, password: event.target.value });
            }}
          />
        </div>

        <button
          className={styles.submit__btn}
          onClick={(event) =>
            handleLoginRequest(event, loginInfo.id, loginInfo.password)
          }
        >
          <span>로그인</span>
        </button>
      </form>
    </main>
  );
}
