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
  const fetchFunc = async () => {
    const response = await axios.get(
      "https://server.kindparks.com/api/menu/view"
    );
    if (response.data.code === 200) {
      setMenuList(response.data.data);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);
  return (
    <div
      className={`${styles.sidebar__container} ${
        isSidebarActive && styles.active
      }`}
    >
      <ul className={styles.sidebar__list}>
        {menuList?.map((item: any) => (
          <div key={item.id}>
            <span>{item.menu}</span>
          </div>
        ))}
      </ul>
    </div>
  );
}
