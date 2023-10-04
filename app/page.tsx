'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import GLView2 from './webgl/component/GLView2'
import MainGLView from './webgl/component/main_gl_view'
import BkgGLView from './webgl/component/background_gl'
import Marquee from 'react-fast-marquee'

export default function Home() {

	const [mousePos, setMousePos] = useState({x: 0, y: 0})

	// mouse pos effect
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePos({x: event.clientX, y: event.clientY})
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	})

  return (
    <main className={styles.main}>

			<BkgGLView mouseX={mousePos.x} mouseY={mousePos.y} model="all" />

			<div className={styles.cornerDecoration2}>
				<GLView2 mouseX={mousePos.x} mouseY={mousePos.y} />
			</div>

      <div className={styles.titleTextContainer}>
				<span className={styles.subTitleText}>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
				</span>
				<div className={styles.mainTitleText}>
					<h1>FUDGEU</h1>
				</div>
				<span className={styles.subTitleText}>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
					<h1>FUDGEU</h1>
				</span>
			</div>

			<div className={styles.scrollingTextContainer}>
				<Marquee autoFill speed={10} direction="right">011011000110111101101100001000000110011101100101011101000010000001110000011100100110000101101110011010110110010101100100</Marquee>
			</div>

			<div className={styles.textContentContainer}>
				<div className={styles.subHeader}>
					<h2>AKA PATRICK KOSS</h2>
					<div className={styles.subHeaderDecoration}>
						<div className={styles.subHeaderDecorationPiece} />	
						<div className={styles.subHeaderDecorationPiece} />	
						<div className={styles.subHeaderDecorationPiece} />	
					</div>
				</div>
				<div className={styles.descriptionAndNav}>
					<p>ASPIRING WEB DEVELOPER, GAME DEVELOPER, AND MAYBE MORE?</p>	
					<nav>
						<ul className={styles.navList}>
							<li className={styles.navItem}>
								<a className={styles.listLink} href="about">
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>ABOUT ME</span>
								</a>
							</li>
							<li className={styles.navItem}>
								<a className={styles.listLink} href="shadow">
										<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>PROJECTS</span>
								</a>
							</li>
							<li className={styles.navItem}>
								<a className={styles.listLink} href="shadow">
										<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>EDUCATION</span>
								</a>
							</li>
							<li className={styles.navItem}>
								<a className={styles.listLink} href="shadow">
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>CONTACT</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className={styles.cornerDecoration}>
				<div className={styles.cornerDecorationLine}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>
				
				<div className={styles.cornerDecorationLineRev}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>

				<div className={styles.cornerDecorationLine}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>
			</div>

			<div className={styles.bottomDecoration}>
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
			</div>
    </main>
  )
}
