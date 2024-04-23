"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function AddMenu() {
  const [inputedText, setInputedText] = useState("");

  const [menuList, setMenuList] = useState<string[]>([]);

  const fetchFunc = async () => {
    const response = await axios.get(
      "https://server.kindparks.com/api/menu/view"
    );
    if (response.data.code === 200) {
      setMenuList(response.data.data);
    }
  };

  const handleInputText = (value: string) => {
    setInputedText(value);
  };

  const handleSubmitText = async () => {
    const response = await axios.post(
      "https://server.kindparks.com/api/menu/add",
      {
        text: inputedText,
      }
    );
    console.log("Response:", response.data);
    if (response.data.code === 200) {
      const resultText = inputedText;
      alert("등록되었습니다.");
      setInputedText("");
      setMenuList([...menuList, resultText]);
      fetchFunc();
    }
  };

  useEffect(() => {
    fetchFunc();
  }, []);
  console.log(menuList);
  return (
    <main className={styles.login__box}>
      <div>
        <h1>사이드바 메뉴 편집</h1>
      </div>
      <div>
        <div>현재 메뉴 리스트</div>
        <div>
          {menuList?.map((item: any) => (
            <div key={item.id}>
              <span>{item.menu}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.input__box}>
        <div>
          <input
            type="text"
            value={inputedText}
            className={styles.input}
            onChange={(e) => handleInputText(e.target.value)}
          />
        </div>
        <button
          className={styles.submit__btn}
          onClick={(e) => handleSubmitText()}
        >
          <span>추가하기</span>
        </button>
      </div>
    </main>
  );
}
