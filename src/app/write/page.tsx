"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditorBox = dynamic(
  () => import("../../../components/textEditor/textEditor"),
  { ssr: false }
);

export default function Write() {
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [submenuList, setSubMenuList] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState("");

  const [inputedText, setInputedText] = useState("");

  const [title, setTitle] = useState("");

  const handleSubmitArticle = async () => {
    try {
      const response = await axios.post(
        "https://server.kindparks.com/api/article/add",
        {
          text: inputedText,
          submenu: selectedSubMenu,
          username: "glypark",
          title,
        }
      );
      if (response.status === 200) {
        alert("등록되었습니다.");
        router.push("/");
      }
    } catch (err) {
      alert("error");
    }
  };

  /** 토큰 검증 요청 함수
   * 1.서버로 토큰 검증 요청
   * 2.만약 404로 응답이 오면, 404 페이지로 redirect
   */

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
          return;
        }
      } catch (err) {
        alert("비정상적인 접근입니다.");
        router.push("/");
      }
    }
  };

  const fetchFunc = async () => {
    const response = await axios.get(
      "https://server.kindparks.com/api/menu/view"
    );
    if (response.data.code === 200) {
      setMenuList(response.data.data);
    }
  };

  useEffect(() => {
    handleValidateToken();
    fetchFunc();
  }, []);

  useEffect(() => {
    const fetchSubmenulistFunc = async (menu: string) => {
      const response = await axios.post(
        "https://server.kindparks.com/api/menu/submenu/view",
        {
          parentMenu: menu,
        }
      );
      if (response.data.code === 200) {
        setSubMenuList(response.data.data);
        setSelectedSubMenu(response.data.data[0]?.name);
      }
    };
    if (selectedMenu) fetchSubmenulistFunc(selectedMenu);
  }, [selectedMenu]);

  return (
    <main>
      <div>
        <div>카테고리 선택</div>
        <div>
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
          >
            {menuList?.map((el: any) => (
              <option key={el.id} value={el.menu}>
                {el.menu}
              </option>
            ))}
          </select>
        </div>
        <div>하위 카테고리 선택</div>
        <div>
          <select
            value={selectedSubMenu}
            onChange={(e) => setSelectedSubMenu(e.target.value)}
          >
            {submenuList?.map((el: any) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <span>제목</span>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <EditorBox setInputedText={setInputedText} />
      {selectedMenu && selectedSubMenu ? (
        <div>
          <button onClick={handleSubmitArticle}>
            <span>작성하기</span>
          </button>
        </div>
      ) : (
        <div>
          <span>하위 카테고리를 선택해주세요.</span>
        </div>
      )}
    </main>
  );
}
