import styles from './page.module.css'
import GLView from './webgl/component/glview'
import GLView2 from './webgl/component/glview2'

export default function Home() {
  return (
    <main className={styles.main}>
			<div className={styles.cornerDecoration2}>
				<GLView2 />
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
				</span>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.webGLContainer}>
					<GLView />
				</div>
				<div className={styles.textContentContainer}>
					<div className={styles.subHeader}>
						<h2>HEE HEE HA HA</h2>
						<div className={styles.subHeaderDecoration}>
							<div className={styles.subHeaderDecorationPiece} />	
							<div className={styles.subHeaderDecorationPiece} />	
							<div className={styles.subHeaderDecorationPiece} />	
						</div>						
					</div>
					<div className={styles.descriptionAndNav}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat viverra dui, sed lobortis augue elementum nec.</p>	
						<nav>
							<ul className={styles.navList}>
								<li className={styles.navItem}>
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>ABOUT ME</span>
								</li>
								<li className={styles.navItem}>
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>PROJECTS</span>
								</li>
								<li className={styles.navItem}>
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>EDUCATION</span>
								</li>
								<li className={styles.navItem}>
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>CONTACT</span>
								</li>
							</ul>
						</nav>
					</div>
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
