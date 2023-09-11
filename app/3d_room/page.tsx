import styles from './styles.module.css'

export default function Room() {
	return (
		<div className={styles.roomContainer}>
				<div />
				<div className={styles.topWall}></div>
				<div />
				<div className={styles.leftWall}>
					AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAA AAAAAA AAAAAAAAAAAAAA
				</div>
				<div className={styles.centerWall}></div>
				<div className={styles.rightWall}></div>
				<div />
				<div className={styles.botWall}></div>
				<div />
		</div>
	)
}