"use client";

import { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import axios from "axios";
import Link from "next/link";

export default function Sidebar() {
  const [menuList, setMenuList] = useState<any>([]);

  const handleMenuClick = (id: number) => {
    setMenuList((prevMenuList: any) =>
      prevMenuList.map((item: any) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuResponse = await axios.get(
          "https://server.kindparks.com/api/menu/view"
        );
        if (menuResponse.data.code === 200) {
          const menuData = menuResponse.data.data;
          const submenuPromises = menuData.map((menuItem: any) =>
            axios.post("https://server.kindparks.com/api/menu/submenu/view", {
              parentMenu: menuItem.menu,
            })
          );
          const submenuResponses = await Promise.all(submenuPromises);
          const menuWithSubmenus = menuData.map(
            (menuItem: any, index: number) => ({
              ...menuItem,
              submenuData: submenuResponses[index].data.data,
              active: false,
            })
          );
          setMenuList(menuWithSubmenus);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);
  console.log(menuList);
  /** 클릭 시, 해당 메뉴에 해당하는 subMenulist를 불러와서 li 태그 아래에 붙여야한다.*/
  return (
    <div className={`${styles.sidebar__container}`}>
      <ul className={styles.sidebar__list}>
        {menuList?.map((item: any) => (
          <div key={item.id} className={styles.sidebar__element}>
            <li>
              <span onClick={() => handleMenuClick(item.id)}>{item.menu}</span>
              {item.submenuData?.length > 0 && (
                <ul className={styles.submenu__list}>
                  {item.submenuData?.map((submenu: any, index: number) => (
                    <Link
                      href={{
                        pathname: `/${submenu.id}`,
                      }}
                      className={styles.link_style}
                      key={index}
                    >
                      <li>
                        <span>{submenu.name}</span>
                      </li>
                    </Link>
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
