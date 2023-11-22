import Marquee from 'react-fast-marquee'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import Project, { ProjectProps } from './project/Project';

const projects: ProjectProps[] = [
	{
		title: "Playlist",
		description: "A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to players are the ability to control the time between songs, as well as the conditions under which song is played.",
		images: ["https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png"],
		imageAlt: "test",
		buttons: [{type: "curseforge", text: "Curseforge", link: "https://www.curseforge.com/minecraft/mc-mods/playlist"}, {type: "github", text: "Github", link: "https://github.com/fudgeu/playlist"}],
	},
	{
		title: "Refont",
		description: "A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to players are the ability to control the time between songs, as well as the conditions under which song is played.",
		images: ["https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png"],
		imageAlt: "test",
		buttons: [{type: "github", text: "Github", link: "https://github.com/fudgeu/Refont"}],
	},
	{
		title: "Classabull",
		description: "A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to players are the ability to control the time between songs, as well as the conditions under which song is played.",
		images: ["https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png"],
		imageAlt: "test",
		buttons: [{type: "other", text: "Site", link: "https://classabull.vercel.app/"}, {type: "github", text: "Github", link: "https://github.com/fudgeu/classabull"}],
	},
	{
		title: "yuome",
		description: "A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to players are the ability to control the time between songs, as well as the conditions under which song is played.",
		images: ["https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png"],
		imageAlt: "test",
		buttons: [{type: "other", text: "Site", link: "https://yuome.vercel.app/"}, {type: "github", text: "Github", link: "https://github.com/fudgeu/yuome"}],
	},
	{
		title: "This site",
		description: "A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to players are the ability to control the time between songs, as well as the conditions under which song is played.",
		images: ["https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png", "https://www.fudgeu.dev/playlist1.png"],
		imageAlt: "test",
		buttons: [{type: "github", text: "Github", link: "https://github.com/fudgeu/personal-site-2.0"}],
	}
]

export default function Projects() {
	const [ _, forceRerender ] = useState(0);

	useEffect(() => {
		// Force a state update because for some reason, the marquees dont start automatically
		setTimeout(() => forceRerender(1), 10)
	}, [])

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<h1 className={styles.headerText}>PROJECTS</h1>
			</header>
			<main className={styles.content}>
				{projects.map((p) => (
					<Project key={p.title} title={p.title} description={p.description} images={p.images} imageAlt={p.imageAlt} buttons={p.buttons} />
				))}
			</main>
		</div>
	)
}