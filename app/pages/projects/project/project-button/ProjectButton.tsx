import styles from './styles.module.css';

type ProjectButtonProps = {
	from: ProjectButton
}

export default function ProjectButton({ from }: ProjectButtonProps) {
	return (
		<button className={styles.button} type="button">
			{from.text}
		</button>
	)
}