import styles from './styles.module.css';
import AdaptableBullets from '@/app/components/adaptable-bullets/AdaptableBullets';
import Header from './header/Header';

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
              I&apos;m a software engineer currently based in Chicago (come say hi!), working on mobile app development
              and test systems automation. Outside of work... I do more work! I have a variety of personal software and hardware
              projects I work on, many of which relate to game modding and cool UIs (and UI libraries!).
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>SOFTWARE</h2>
          <div className={styles.sectionContent}>
            <p>
              I primarily work full-stack with a few different UI libraries (React,
              Jetpack Compose, SwiftUI), and usually Django on the backend. I also do a lot of Minecraft modding,
              primarily with Kotlin. Otherwise, I love trying new languages/platforms and have a grab-bag of experiences
              with a lot of different things (OpenGL, Unity, C...). Also trying to get more into embedded programming!
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>MUSIC</h2>
          <div className={styles.sectionContent}>
            <p>
              My music taste is best described as largely electronic, a healthy chunk of vocaloid, and a bit pop/indie.
              Most of my influence can be traced back to the euro-dance I heard regularly growing up,
              and the soundtracks of a few games (Sonic Riders, Ridge Racer, and especially Forza Horizon 2).
              I have way too many 'favorite artists' to list, but underscores, Porter Robinson, and Jamie Paige
              likely give a good basis!
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>GAMING</h2>
          <div className={styles.sectionContent}>
            <p>
              Deadlock, Minecraft, Cities: Skylines are what I play the most nowadays.
              Portal 2 is my favorite of all time! Used to play a lot of Beat Saber and got shockingly good at it,
              though haven't played in a while and really want to get back into it. Will also play Overwatch when given
              the chance.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>OTHER...</h2>
          <div className={styles.sectionContent}>
            <p>
              Love to travel, though both cities and nature. Also a lot into urban planning and
              public transit (especially trains)!
            </p>
          </div>
        </section>
      </div>

    </div>
  );
}
