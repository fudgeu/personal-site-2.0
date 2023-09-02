import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

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

				</div>
				<div className={styles.textContentContainer}>
					<h2>THE FUTURE IS NOW.</h2>
					<div className={styles.descriptionAndNav}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat viverra dui, sed lobortis augue elementum nec.</p>	
						<nav>
							<ul className={styles.navList}>
								<li>&gt; ABOUT ME</li>
								<li>&gt; PROJECTS</li>
								<li>&gt; EDUCATION</li>
								<li>&gt; CONTACT</li>
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
			
    </main>
  )
}
