import styles from "./header.module.css";

export default function Header({
  handleChangeSideBarStatus,
}: {
  handleChangeSideBarStatus: () => void;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner__container}>
        <div>
          <h2 className={styles.title}>Kind Parks</h2>
        </div>
        <div className={styles.menus__container}>
          <h3 onClick={handleChangeSideBarStatus}>Parks</h3>
          <h3>글 작성하기</h3>
          <h3>로그인</h3>
        </div>
      </div>
    </header>
  );
}
