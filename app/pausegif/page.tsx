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
			<video id="testVideo" width="600" height="100%" autoPlay loop muted playsInline>
        <source src="https://rotato.netlify.app/alpha-demo/movie-webm.webm" type="video/webm" />
      </video>
		</div>
	)
}