import styles from "./page.module.css";

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.viewer__container}>{children}</div>;
}
