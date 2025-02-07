import styles from './styles.module.css';
import AdaptableBullets from '@/app/components/adaptable-bullets/AdaptableBullets';
import Header from './header/Header';
import About from '@/app/text/about.mdx'

export default function AboutPage() {
  return (
    <div className={styles.about}>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.firstHeaderContainer}>
            <h2>WELCOME!</h2>
            <div className={styles.decorationContainer}>
              <div className={styles.decoBox1} />
              <div className={styles.decoBox2} />
              <div className={styles.decoBox3} />
              <div className={styles.decoBox4} />
              <div className={styles.decoBox5} />
              <div className={styles.decoBox6} />
              <div className={styles.decoBox7} />
            </div>
          </div>
          <div className={styles.sectionContent}>
            <p>
              I&apos;m a current college student at UCF, studying computer science - I love designing great user
              interfaces and creating products that are both simple to use yet powerful - and while I've had a front-end
              focus for a while now, I've been creeping into full-stack development and am excited to try new things
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>SKILLS</h2>
          <div className={styles.sectionContent}>
            <p>I&apos;ve worked with the following a *lot*:</p>
            <AdaptableBullets>
              <li>Typescript/Javascript</li>
              <li>React.JS/Next.JS/Vite</li>
              <li>Java/Kotlin</li>
              <li>C</li>
              <li>Python</li>
              <li>Fabric Toolchain</li>
              <li>Docker</li>
              <li>Git</li>
            </AdaptableBullets>
            <p>And I also have a fair bit of experience with:</p>
            <AdaptableBullets>
              <li>C++</li>
              <li>OpenGL</li>
              <li>Flask</li>
              <li>Django</li>
              <li>REST APIs</li>
              <li>C#</li>
              <li>Unity</li>
              <li>SQL</li>
              <li>nginx</li>
            </AdaptableBullets>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Me, Actually</h2>
          <div className={styles.sectionContent}>
            <p>
              Other things I love to do in my free time include skating, traveling both through nature and cities,
              and of course playing a variety of games like Cities Skylines: 2, Counter Strike 2, and Beat Saber.
              I also love photography, especially while traveling, where I can take photos of landscapes and cityscapes.
              Outside of computer science, I also have a lot of interest in urban planning and electronics tinkering.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
}
