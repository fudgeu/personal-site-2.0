import styles from './app-styles.module.css'
import ShadowGL from "../rat/RatGL/RatGL";
import { makeApp, makeAppSized } from "../util/FudgeApp";
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import Projects from '../pages/projects/Projects';

export const defaultApps = [
	makeAppSized("About", 1200, 800, () => <About />),
	makeApp("Projects", () => <Projects />),
	makeApp("Education", () => <iframe className={styles.iframe} src="https://firecade.neocities.org" />),
	makeApp("Contact", () => <Contact />),
	makeApp("fish", () => (
		<div className={styles.windowContentContainer}>
			<p>Congratulations, you are our lucky winner!</p>
			<img src="https://cdn.discordapp.com/attachments/575127872516259859/1163345799250456636/image.png" width="600" />
			<p>01100001 01100111 01101111 01101110 01111001</p>
		</div>
	)),
]