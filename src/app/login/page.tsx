import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.login__box}>
      <div>
        <h1>Kind Parks</h1>
      </div>
      <form className={styles.form__box}>
        <div className={styles.inputs__container}>
          <input className={styles.input} placeholder="계정" />
          <input className={styles.input} placeholder="비밀번호" />
        </div>

        <button className={styles.submit__btn}>
          <span>로그인</span>
        </button>
      </form>
    </main>
  );
}
