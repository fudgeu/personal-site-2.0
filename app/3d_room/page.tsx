import styles from './styles.module.css'

export default function Room() {
	return (
		<div className={styles.roomContainer}>
				<div className={styles.topWall}></div>
				<div className={styles.leftWall}></div>
				<div className={styles.centerWall}></div>
				<div className={styles.rightWall}></div>
				<div className={styles.botWall}></div>
		</div>
	)
}