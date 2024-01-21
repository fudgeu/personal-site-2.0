import styles from './not-found-styles.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        404 NOT FOUND
      </span>
    </div>
  );
}
