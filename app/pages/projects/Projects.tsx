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
		description: "A tool to quickly and automatically change Discord's font. Refont allows you to use any font installed on your computer, and will automatically apply it every time your computer starts.",
		images: ["/projects/refont/1.png", "/projects/refont/2.png", "/projects/refont/3.png"],
		imageAlt: "test",
		buttons: [{type: "github", text: "Github", link: "https://github.com/fudgeu/Refont"}],
	},
	{
		title: "Classabull",
		description: "Classabull was created during a 24-hour university hackathon - made with the goal of providing a better class scheduling experience for the students of USF. It features a sleek yet functional and easy to read UI, as well as a calendar to help visualize your week.",
		images: ["/projects/classabull/1.png", "/projects/classabull/2.png", "/projects/classabull/3.png"],
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
	console.log("running projects")

	const [ _, forceRerender ] = useState(0);
	const [ marqueeSpeed, setMarqueeSpeed ] = useState(0);

	useEffect(() => {
		setTimeout(() => setMarqueeSpeed, 20);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Marquee className={styles.bkgMarquee} autoFill speed={marqueeSpeed}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<Marquee className={styles.bkgMarquee} autoFill speed={20}>+</Marquee>
				<h1 className={styles.headerText}>PROJECTS</h1>
			</div>
			<main className={styles.content}>
				{projects.map((p) => (
					<Project key={p.title} title={p.title} description={p.description} images={p.images} imageAlt={p.imageAlt} buttons={p.buttons} />
				))}
			</main>
		</div>
	)
}