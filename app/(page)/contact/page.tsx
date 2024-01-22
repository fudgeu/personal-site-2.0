import styles from './styles.module.css';
import Marquee from 'react-fast-marquee';

export default function Contact() {
  return (
    <div>
      <div className={styles.bkgDecoration}>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
        <Marquee autoFill><img className={styles.paperAirplane} src="/paper-plane.svg" alt="" /></Marquee>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.content}>

        </div>
      </div>
    </div>
  );
}
