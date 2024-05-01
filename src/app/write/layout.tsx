import styles from "./page.module.css";

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.layout}>{children}</div>;
}
