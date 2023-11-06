import Marquee from 'react-fast-marquee'
import styles from './styles.module.css'
import { useCallback, useEffect, useState } from 'react'

export default function About() {

	const [ _, forceRerender ] = useState(0);

	const generateHeader = useCallback(() => {
		const array = Array(15)
		for (let i = 0; i < 15; i++) {
			const dir = (i % 2 == 0) ? "left" : "right";
			array[i] = <Marquee className={styles.marquee} autoFill speed={20} direction={dir}><h1>ABOUT ME&nbsp;</h1></Marquee>
		}
		return array;
	}, [])

	useEffect(() => {
		// Force a state update because for some reason, the marquees dont start automatically
		setTimeout(() => forceRerender(1), 100)
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{generateHeader()}
				<Marquee className={styles.marqueeFilled} autoFill speed={20} direction='right'><h1>ABOUT ME&nbsp;</h1></Marquee>
				{generateHeader()}
			</div>
			<div className={styles.content}>
				
				<section className={styles.section}>
					<div className={styles.firstHeaderContainer}>
						<h2>WELCOME!</h2>
						<div className={styles.decorationContainer}>
							<div className={styles.decoBox1} />
							<div className={styles.decoBox2} />
							<div className={styles.decoBox3} />
							<div className={styles.decoBox4} />
							<div className={styles.decoBox5} />
							<div className={styles.decoBox6} />
							<div className={styles.decoBox7} />
						</div>
					</div>
					<p>
						I&apos;m a current college student at UCF, studying computer science - I love designing great user
						interfaces and creating products that are both simple to use yet powerful. On top of that, I
						also love to experiment and create things both utterly useless and full of potential!
					</p>
				</section>
				<section className={styles.section}>
					<h2>SKILLS</h2>
					<p>BLAH BLAH BLAH</p>
				</section>
				<section className={styles.section}>
					<h2>LEARNING...</h2>
					<p>BLAH BLAH BLAH</p>
				</section>
			</div>
		</div>
	)
}