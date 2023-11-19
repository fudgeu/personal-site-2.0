import Marquee from 'react-fast-marquee'
import styles from './styles.module.css'

export default function Projects() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>


				<h1 className={styles.headerText}>PROJECTS</h1>

				{/*<Marquee autoFill direction='right' speed={20}>&gt;</Marquee>
				<div className={styles.headerMainRow}>
				  <Marquee className={styles.shortMarquee} autoFill speed={20}>&lt;</Marquee>
					<h1>&nbsp;PROJECTS&nbsp;</h1>
					<Marquee autoFill speed={20}>&lt;</Marquee>
				</div>
				<Marquee autoFill direction='right' speed={20}>&gt;</Marquee>*/}
			</header>
			<main className={styles.content}>
				<p>bleh</p>
				<p>test</p>
			</main>
		</div>
	)
}