import styles from './styles.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.repeatingDecoration}>
          <div className={styles.decoBox} />
          <div className={styles.decoBox} />
        </li>
        <li className={styles.unselected}><div className={styles.liBlock} />FUDGEU</li>
        <li className={styles.selected}><div className={styles.liBlock} />ABOUT</li>
        <li className={styles.unselected}><div className={styles.liBlock} />PROJECTS</li>
        <li className={styles.unselected}><div className={styles.liBlock} />EDUCATION</li>
        <li className={styles.unselected}><div className={styles.liBlock} />CONTACT</li>
        <li className={styles.repeatingDecoration}>
          <div className={styles.decoBox} />
          <div className={styles.decoBox} />
          <div className={styles.decoBox} />
          <div className={styles.decoBox} />
          <div className={styles.decoBox} />
        </li>
      </ul>
    </nav>
  )
}