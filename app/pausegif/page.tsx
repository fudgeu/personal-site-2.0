'use client'
import { useEffect } from 'react'
import styles from './styles.module.css'

export default function PauseGif() {
	useEffect(() => {
		const el = document.getElementById("testVideo");
		el?.addEventListener("mouseenter", () => {
			(el as HTMLMediaElement).pause();
		})
		el?.addEventListener("mouseleave", () => {
			(el as HTMLMediaElement).play();
		})

	}, [])
	return (
		<div className={styles.container}>
			<video id="testVideo" width="600" autoPlay loop muted playsInline>
        <source src="https://cdn.discordapp.com/attachments/840291689889529907/1165388413558599822/0001-0020.webm" type="video/webm" />
      </video>
		</div>
	)
}