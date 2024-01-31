'use client';

import styles from './styles.module.css';
import Project, { ProjectProps } from './project/Project';
import Header from './header/Header';

const projects: ProjectProps[] = [
  {
    title: 'Playlist',
    description: 'A Minecraft mod rewriting the in-game music system, allowing for complete control over what and how music plays. Amongst the settings offered to users are the ability to control the time between songs and the conditions under which song is played.',
    images: ['https://www.fudgeu.dev/playlist1.png', 'https://www.fudgeu.dev/playlist1.png', 'https://www.fudgeu.dev/playlist1.png'],
    imageAlt: 'test',
    buttons: [{ type: 'curseforge', text: 'Curseforge', link: 'https://www.curseforge.com/minecraft/mc-mods/playlist' }, { type: 'github', text: 'Github', link: 'https://github.com/fudgeu/playlist' }],
  },
  {
    title: 'Refont',
    description: 'An Electron tool to quickly and automatically change Discord\'s font, built using React. Refont allows you to use any font installed on your computer, and will automatically apply it every time your computer starts.',
    images: ['/projects/refont/1.png', '/projects/refont/2.png', '/projects/refont/3.png'],
    imageAlt: 'test',
    buttons: [{ type: 'github', text: 'Github', link: 'https://github.com/fudgeu/Refont' }],
  },
  {
    title: 'Classabull',
    description: 'Classabull was created during a 24-hour university hackathon - made with the goal of providing a better class scheduling experience for the students of USF. It features a sleek, functional, and easily-digestible UI built using React, as well as a calendar to help visualize your week.',
    images: ['/projects/classabull/1.png', '/projects/classabull/2.png', '/projects/classabull/3.png'],
    imageAlt: 'test',
    buttons: [{ type: 'other', text: 'Site', link: 'https://classabull.vercel.app/' }, { type: 'github', text: 'Github', link: 'https://github.com/fudgeu/classabull' }],
  },
  {
    title: 'yuome',
    description: 'Yuome was created in 36 hours at Shellhacks 2023 with the goal of making keeping track of tabs between friends easier. Built with React, Clerk, and Twilio, Yuome was made with the goal of having a minimum barrier of entry. Logins are passwordless, and SMS messages are used to notify friends of requests.',
    images: ['/projects/yuome/1.png', '/projects/classabull/2.png'],
    imageAlt: 'test',
    buttons: [{ type: 'other', text: 'Site', link: 'https://yuome.vercel.app/' }, { type: 'github', text: 'Github', link: 'https://github.com/fudgeu/yuome' }],
  },
  {
    title: 'This site',
    description: 'Built using React, Next.js, and WebGL, this portfolio was a big challenge for me, both in advancing my understanding of these technologies and in getting the styling *just* right. I wanted this site to pop, stand out, and extrude personality. It had seen many forms in its days of development, but I\'m very happy with how it turned out',
    images: [],
    imageAlt: '',
    buttons: [{ type: 'github', text: 'Github', link: 'https://github.com/fudgeu/personal-site-2.0' }],
  },
];

export default function Projects() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        {projects.map((p) => (
          <Project key={p.title} title={p.title} description={p.description} images={p.images} imageAlt={p.imageAlt} buttons={p.buttons} />
        ))}
      </main>
    </div>
  );
}
