import styles from './styles.module.css'

export default function TechComHomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h2>About Me</h2>
        <p className={styles.sectionText}>
          Hi! My name is Patrick Koss, and I am a current Computer Science major at the University of Central Florida.
          I am currently in my senior year, on the verge of graduating.
          I am interested in software development, and have been coding since a very young age.
          Since then, I have learned a lot of languages and gained a lot of experience.
          I specialize in web and backend development, as well as test automation and devops.
          Additionally, I like to play around with game development and hardware projects.
          Though, I am always open to learning new things and taking on new challenges!
        </p>
      </section>

      <section className={styles.section}>
        <h2>Professional Experience</h2>
        <p className={styles.sectionText}>
          Below I have listed my recent professional experience, along with the types of technologies I was working with there.
          If you'd like more info, be sure you view my resume!
        </p>
        <ul className={styles.professionalExp}>
          <li>
            SRAM - <i>Software Engineer Intern</i>
            <ul>
              <li className={styles.skills}>Python, Django, PostgreSQL, Gitlab CI/CD</li>
            </ul>
          </li>
          <li>
            Travel and Leisure - <i>Software Engineer Intern</i>
            <ul>
              <li className={styles.skills}>Typescript, React, Vite, Jira API</li>
            </ul>
          </li>
          <li>
            University of Central Florida - <i>Techranger</i>
            <ul>
              <li className={styles.skills}>Javascript, React, Python, Flask, Django, MySQL, A11y</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  )
}
