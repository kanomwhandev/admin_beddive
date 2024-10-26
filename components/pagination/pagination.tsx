import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.container}>
      <button className={styles.buttons} disabled>
        Previous
      </button>
      <button className={styles.buttons}>Next</button>
    </div>
  );
};

export default Pagination;
