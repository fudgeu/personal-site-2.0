'use client';

import styles from './styles.module.css';
import Project, { ProjectProps } from './project/Project';
import Header from './header/Header';

const projects: ProjectProps[] = [
  {
    title: 'Playlist',
    description: 'A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to users are the ability to control the time between songs and the conditions under which song is played.',
    images: ['/projects/playlist/1.png', '/projects/playlist/2.png', '/projects/playlist/3.png'],
    imageAlts: ['Main interface of the Playlist mod', 'Settings panel', '\'Add Song to Playlist\' menu'],
    buttons: [{ type: 'curseforge', text: 'Curseforge', link: 'https://www.curseforge.com/minecraft/mc-mods/playlist' }, { type: 'github', text: 'Github', link: 'https://github.com/fudgeu/playlist' }],
  },
  {
    title: 'Refont',
    description: 'An Electron tool to quickly and automatically change Discord\'s font, built using React. Refont allows you to use any font installed on your computer, and will automatically apply it every time your computer starts.',
    images: ['/projects/refont/1.png', '/projects/refont/2.png', '/projects/refont/3.png'],
    imageAlts: ['Main interface of Refont', 'Font selector', 'Settings panel'],
    buttons: [{ type: 'github', text: 'Github', link: 'https://github.com/fudgeu/Refont' }],
  },
  {
    title: 'This site',
    description: 'Built using React, Next.js, and WebGL. I wanted this portfolio to pop out, which I feel like I\'ve succeeded in doing, and am very happy with. I do plan on eventually re-writing it though, likely with some new tech, improvements, and a new style - though It likely won\'t be for another while longer.',
    images: [],
    imageAlts: [],
    buttons: [{ type: 'github', text: 'Github', link: 'https://github.com/fudgeu/personal-site-2.0' }],
  },
];

export default function Projects() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        {projects.map((p) => (
          <Project key={p.title} title={p.title} description={p.description} images={p.images} imageAlts={p.imageAlts} buttons={p.buttons} />
        ))}

        <p className={styles.aside}>
          And, the tons of projects that I don't have listed here. Either because they're still being worked on, or am too lazy to list it.
        </p>

      </main>
    </div>
  );
}
