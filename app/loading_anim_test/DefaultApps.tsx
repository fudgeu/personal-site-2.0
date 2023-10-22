import styles from './app-styles.module.css'
import ShadowGL from "../rat/RatGL/RatGL";
import { makeApp } from "../util/FudgeApp";

export const defaultApps = [
	makeApp("About", () => (
		<div className={styles.windowContentContainer}>
			<p>Congratulations, you are our lucky winner!</p>
			<img src="https://cdn.discordapp.com/attachments/575127872516259859/1163345799250456636/image.png" width="600" />
			<p>01100001 01100111 01101111 01101110 01111001</p>
		</div>
	)),
	makeApp("Projects", () => <ShadowGL />),
	makeApp("Education", () => <iframe className={styles.iframe} src="https://firecade.neocities.org" />),
	makeApp("Contact", () => []),
]