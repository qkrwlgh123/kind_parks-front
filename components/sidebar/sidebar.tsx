import styles from "./sidebar.module.css";

export default function Sidebar({
  isSidebarActive,
}: {
  isSidebarActive: boolean;
}) {
  console.log(isSidebarActive);
  return (
    <div
      className={`${styles.sidebar__container} ${
        isSidebarActive && styles.active
      }`}
    >
      <ul className={styles.sidebar__list}>
        <li>English Class</li>
        <li>Book</li>
        <li>Bible</li>
      </ul>
    </div>
  );
}
