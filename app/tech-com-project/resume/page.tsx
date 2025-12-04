import styles from './styles.module.css'

export default function Page() {
  return (
    <>
      <p className={styles.section}>
        This project had us create a set of materials that we would likely use in a real job application.
        This includes a resume and cover letter, both tailored to a job posting we had found online.
        Additionally, there is a short mock interview where we answered a short series of questions, meant to allow us to practice our interviewing skills.
      </p>

      <div className={styles.divider} />

      <h2 className={styles.sectionHeader}>EDUCATION</h2>

      <div className={styles.section}>
        <h3>University of Central Florida - <i>Orlando, FL</i></h3>
        <p>Bachelor of Science in Computer Science - 3.5 GPA</p>
        <p>Expected December 2025</p>
      </div>

      <div className={styles.spacer}/>

      <h2 className={styles.sectionHeader}>EXPERIENCE</h2>

      <div className={styles.section}>
        <h3>SRAM - <i>Chicago, IL</i></h3>
        <p>Software Engineering Intern</p>
        <p>May 2025 - Present</p>
        <ul>
          <li>Refactored and optimized database querying system for an internal Django app. Converted custom raw SQL
            querying system to the Django ORM, making it much more flexible and maintainable. Optimized queries and
            backend logic greatly, offering a 10x+ improvement in page load times in many cases. Additionally created
            many tests, ranging from unit tests all the way to integration tests, for this same app.
          </li>
          <li>Created the team's first Windows build pipelines for a set of internal apps that have traditionally been
            built only for Linux. Greatly saves time manually building these apps every time there is an update.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Travel and Leisure - <i>Orlando, FL</i></h3>
        <p>Software Engineering Intern</p>
        <p>May 2024 - December 2024</p>
        <ul>
          <li>Created extensive React web dashboard that provides Agile release status and analytics to project
            managers, replacing an old, hard to read, and fragile Excel workbook. Utilizes the MaterialUI component
            library.
          </li>
          <li>New dashboard pulls data directly via the Jira API, provides many tools and views to process data, and is
            adaptable to any Agile project in Jira.
          </li>
          <li>Department extremely impressed by dashboard and say it has improved their workflow greatly. Team has
            brought me back for extra consulting on new dashboard features after the internship ended.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>University of Central Florida - <i>Orlando, FL</i></h3>
        <p>Student Software Developer - Python, Django, React, Typescript, HTML/CSS, Ally</p>
        <p>August 2023 - Present</p>
        <ul>
          <li>Led development of a full-stack (Vite/React, Flask, MySQL) tool that automates placement of award emblems
            within Canvas course pages. Provides extensive web interfaces via LTI for adjusting badge appearance and
            administering the system. Greatly reduced amount of time spent by department administering these badges
            manually.
          </li>
          <li>Co-architected the modernization of one of our legacy PHP LTIs (Materia) by converting it into Django.
            Developed much of the new REST API (with DRF) and ensuring full feature parity with the old platform.
          </li>
          <li>Developed Category Climb, a React-based Materia widget that is embeddable into courses as a gradable,
            playable minigame. Received recognition from department heads for its above-and-beyond accessibility.
          </li>
        </ul>
      </div>

      <div className={styles.spacer}/>

      <h2 className={styles.sectionHeader}>SKILLS</h2>
      <ul className={styles.section}>
        <li>Stack: Python, Django, HTML, CSS, React, Javascript/Typescript, LTI, Java, Kotlin, C, C#, SQL, nginx, Linux,
          Gitlab CI/CD
        </li>
        <li>Tools: Git, Docker, Figma, Atlassian Jira, Unity, Adobe Photoshop & Premiere Pro</li>
      </ul>

      <div className={styles.spacer}/>

      <h2 className={styles.sectionHeader}>PROJECTS</h2>

      <div className={styles.section}>
        <h3>Canvas Dash Pro - Chrome Extension, React, Typescript, Python, Flask</h3>
        <ul>
          <li>Winner of the 'Best AI Application built with Cloudflare award at Knight Hacks Hackathon 2024.</li>
          <li>Overhauls Canvas dashboard to provide an elegant view of classes, assignments, announcements, and more. Al
            integrations to help analyze difficulty of assignments and pull out important info from announcements.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Playlist - Kotlin, Fabric</h3>
        <ul>
          <li>Popular Minecraft mod that overhauls the in-game music system to be highly customizable and expandable.
            Features a sleek Spotify-inspired in-game UI for users to control music, create playlists, and more.
          </li>
        </ul>
      </div>

      <p className={styles.sansText}>Other notable projects include: Koors, a robotic dog with a React Native mobile app
        to control it; and a rotary telephone conversion into USB number pad and microphone done using a Raspberry Pi
        Zero.</p>

      <div className={styles.divider}/>

      <h2 className={styles.sectionHeader}>COVER LETTER EXAMPLE</h2>

      <div className={styles.coverLetter}>
        <p><b>123 Sample Street</b></p>
        <p><b>Orlando, FL, 32829</b></p>
        <br/>
        <p><b>10/23/2025</b></p>
        <br/>
        <p><b>Neotecra</b></p>
        <p><b>40 Exchange Pl #1703</b></p>
        <p><b>New York, NY 10005</b></p>
        <br/>
        <p>Dear Recruiting Manager,</p>
        <br/>
        <p>
          I am writing to apply for the Software Engineer position at Neotecra. I am about to graduate as a
          Computer Science major at the University of Central Florida and hope to pursue a career in
          full-stack web development and cloud engineering. I am eager to deepen my expertise in
          building secure, scalable systems and user-friendly applications. My strong programming skills,
          experience working across both front-end and back-end technologies, and analytical
          problem-solving ability will allow me to contribute effectively to a development team at Neotecra.
        </p>
        <br/>
        <p>
          I am particularly drawn toward this opportunity because it emphasizes full-stack development
          using Python and modern frameworks like Django and FastAPI, as well as AWS-based
          deployment. This position will allow me to enhance my skills in cloud architecture and API
          design while working in an environment focused on agile collaboration and continuous
          improvement. I am excited to apply my experience with Python, Django, and AWS to help
          Neotecra deliver reliable, high-performance systems for its customers.
        </p>
        <br/>
        <p>
          My experiences with Django and Flask for API development and React for front-end integration
          have prepared me to be a successful software engineer. As a developer on several university,
          intern, and personal projects, I was responsible for designing RESTful APIs, building SQL
          databases, and managing deployment through AWS. Through these experiences, I learned the
          importance of writing maintainable, well-documented code and collaboration. After building and
          deploying web applications in cloud environments, I have developed a strong background in
          CI/CD practices and am prepared to work with diverse teams of developers and clients.
          Additionally, my work with Docker and Kubernetes has taught me about scalable deployment
          strategies. In particular, my experience using AWS IAM and API Gateway will help me
          effectively manage secure and reliable API operations at Neotecra.
        </p>
        <br/>
        <p>
          As a software engineer at Neotecra, I am excited about the opportunity to design and implement
          efficient web systems that enhance both functionality and user experience. I am confident that I
          have the technical, collaborative, and problem-solving skills to contribute to your team’s
          success. I would welcome the chance to discuss my qualifications with you in greater detail.
          Please do not hesitate to contact me by email at myemail@gmail.com or by phone at (123)
          456-7890. Thank you for your time and consideration.
        </p>
        <br/>
        <p>Sincerely,</p>
        <p><b>Patrick Koss</b></p>
      </div>

      <div className={styles.divider}/>

      <h2 className={styles.sectionHeader}>MOCK INTERVIEW EXAMPLE</h2>
      <iframe
        width="560" height="315" src="https://www.youtube-nocookie.com/embed/MBe09xv01ew?si=6WnwyvwX_Zv1-by2"
        title="YouTube video player" frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </>
  )
}
