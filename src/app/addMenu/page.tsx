"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMenu() {
  let isTokenValidate = false;
  const router = useRouter();
  const [inputedText, setInputedText] = useState("");
  const [inputedSubmenuText, setInputedSubmenuText] = useState("");
  const [menuList, setMenuList] = useState<string[]>([]);

  const [submenuList, setSubmenuList] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const fetchFunc = async () => {
    const response = await axios.get(
      "https://server.kindparks.com/api/menu/view"
    );
    if (response.data.code === 200) {
      setMenuList(response.data.data);
    }
  };

  const handleValidateToken = async () => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("parks_token");
      try {
        const response = await axios.post(
          "https://server.kindparks.com/api/auth/validate",
          {
            token,
          }
        );
        if (response.data.code === 200) {
          isTokenValidate = true;
        }
      } catch (err) {
        alert("비정상적인 접근입니다.");
        router.push("/");
      }
    }
  };

  const fetchSubmenulistFunc = async (menu: string) => {
    const response = await axios.post(
      "https://server.kindparks.com/api/menu/submenu/view",
      {
        parentMenu: menu,
      }
    );
    if (response.data.code === 200) {
      setSubmenuList(response.data.data);
    }
  };
  const handleMenuClick = async (menu: string) => {
    if (selectedMenu === menu) {
      // 이미 선택된 메뉴를 다시 클릭하면 하위 메뉴 리스트를 숨깁니다.
      setSelectedMenu("");
      setSubmenuList([]);
    } else {
      setSelectedMenu(menu);
      fetchSubmenulistFunc(menu);
    }
  };
  const handleInputText = (value: string) => {
    setInputedText(value);
  };

  const handleSubmenuInputText = (value: string) => {
    setInputedSubmenuText(value);
  };

  const handleDeleteSubmenu = async (id: number) => {
    const response = await axios.post(
      "https://server.kindparks.com/api/menu/submenu/delete",
      {
        id,
      }
    );
    if (response.data.code === 200) {
      alert("등록되었습니다.");
      fetchSubmenulistFunc(selectedMenu);
    }
  };

  const handleSubmitText = async () => {
    const response = await axios.post(
      "https://server.kindparks.com/api/menu/add",
      {
        text: inputedText,
      }
    );

    if (response.data.code === 200) {
      const resultText = inputedText;
      alert("등록되었습니다.");
      setInputedText("");
      setMenuList([...menuList, resultText]);
      fetchFunc();
    }
  };

  const handleSubmitSubmenuText = async () => {
    const response = await axios.post(
      "https://server.kindparks.com/api/menu/submenu/add",
      {
        text: inputedSubmenuText,
        parentMenu: selectedMenu,
      }
    );

    if (response.data.code === 200) {
      const resultText = inputedSubmenuText;
      alert("등록되었습니다.");
      setInputedSubmenuText("");
      setSubmenuList([...submenuList, resultText]);
      fetchSubmenulistFunc(selectedMenu);
    }
  };

  useEffect(() => {
    handleValidateToken();
    fetchFunc();
  }, []);

  return isTokenValidate ? (
    <main className={styles.login__box}>
      <div>
        <h1>사이드바 메뉴 편집</h1>
      </div>
      <div className={styles.inner__container}>
        <div className={styles.left__container}>
          <div>
            <div>상위 메뉴 리스트</div>
            <div>
              <span>(메뉴를 클릭하면 하위메뉴가 나와요 !)</span>
            </div>
            <div>
              {menuList?.map((item: any) => (
                <div
                  key={item.id}
                  className={styles.menu__box}
                  onClick={() => handleMenuClick(item.menu)}
                >
                  <span className={styles.menu__btn}>{item.menu}</span>
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
              <span>상위 메뉴 추가</span>
            </button>
          </div>
        </div>
        <div>
          <div>
            <div>하위 메뉴 리스트</div>
            <div>
              <span>(메뉴를 클릭하면 하위메뉴가 나와요 !)</span>
            </div>
            <div>
              {submenuList?.map((item: any) => (
                <div key={item.id} className={styles.menu__element}>
                  <div className={styles.menu__box}>
                    <span className={styles.menu__btn}>{item.name}</span>
                  </div>
                  <div
                    className={styles.delete__btn_box}
                    onClick={() => handleDeleteSubmenu(item.id)}
                  >
                    <span>삭제</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.input__box}>
              <div>
                <input
                  type="text"
                  value={inputedSubmenuText}
                  className={styles.input}
                  onChange={(e) => handleSubmenuInputText(e.target.value)}
                />
              </div>
              <button
                className={styles.submit__btn}
                onClick={(e) => handleSubmitSubmenuText()}
              >
                <span>하위 메뉴 추가</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : null;
}
