"use client";

import { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import axios from "axios";

export default function Sidebar({
  isSidebarActive,
}: {
  isSidebarActive: boolean;
}) {
  const [menuList, setMenuList] = useState<string[]>([]);
  const [submenuList, setSubmenuList] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const fetchMenulistFunc = async () => {
    const response = await axios.get(
      "https://server.kindparks.com/api/menu/view"
    );
    if (response.data.code === 200) {
      setMenuList(response.data.data);
    }
  };

  const fetchSubmenuFunc = async (menu: string) => {
    const response = await axios.post(
      `https://server.kindparks.com/api/menu/submenu/view`,
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
      setSelectedMenu(null);
      setSubmenuList([]);
    } else {
      setSelectedMenu(menu);
      fetchSubmenuFunc(menu);
    }
  };

  useEffect(() => {
    fetchMenulistFunc();
  }, []);
  /** 클릭 시, 해당 메뉴에 해당하는 subMenulist를 불러와서 li 태그 아래에 붙여야한다.*/
  return (
    <div
      className={`${styles.sidebar__container} ${
        isSidebarActive && styles.active
      }`}
    >
      <ul className={styles.sidebar__list}>
        {menuList?.map((item: any) => (
          <div key={item.id}>
            <li>
              <span onClick={() => handleMenuClick(item.menu)}>
                {item.menu}
              </span>
              {selectedMenu === item.menu && submenuList.length > 0 && (
                <ul className={styles.submenu__list}>
                  {submenuList?.map((submenu: any, index: number) => (
                    <li key={index}>
                      <span>{submenu.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
