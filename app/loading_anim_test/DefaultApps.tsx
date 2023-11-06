import styles from './app-styles.module.css'
import ShadowGL from "../rat/RatGL/RatGL";
import { makeApp, makeAppSized } from "../util/FudgeApp";
import About from '../pages/about/About';

export const defaultApps = [
	makeAppSized("About", 1200, 800, () => <About />),
	makeApp("Projects", () => <ShadowGL />),
	makeApp("Education", () => <iframe className={styles.iframe} src="https://firecade.neocities.org" />),
	makeApp("Contact", () => <iframe src="https://scratch.mit.edu/projects/392505255/embed" width="800" height="600"></iframe>),
	makeApp("fish", () => (
		<div className={styles.windowContentContainer}>
			<p>Congratulations, you are our lucky winner!</p>
			<img src="https://cdn.discordapp.com/attachments/575127872516259859/1163345799250456636/image.png" width="600" />
			<p>01100001 01100111 01101111 01101110 01111001</p>
		</div>
	)),
]