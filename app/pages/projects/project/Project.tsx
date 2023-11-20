/* eslint-disable @next/next/no-img-element */
import ProjectButton from './project-button/ProjectButton';
import styles from './styles.module.css';

export type ProjectProps = {
	title: string,
	description: string,
	images: string[],
	imageAlt: string,
	buttons: ProjectButton[]
}

export default function Project({ title, description, images, imageAlt, buttons }: ProjectProps) {
	return (
		<div className={styles.container}>
			<div className={styles.contentLeft}>
				<div className={styles.title}>
					<h2>{title}</h2>
				</div>
				<div className={styles.description}>
					<p>{description}</p>
				</div>
				<div className={styles.buttons}>
					{buttons.map((b) => <ProjectButton key={b.text} from={b} />)}
				</div>
			</div>
			<div className={styles.contentRight}>
				{images.map((img) => <img key={img} src={img} alt={imageAlt} />)}
			</div>
		</div>
	)
}