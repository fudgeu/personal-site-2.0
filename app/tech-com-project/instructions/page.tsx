import styles from './styles.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <p>
        This project required us to write a set of instructions using the techniques we learned in the Technical Communication class.
        For my set of instructions, I chose to write about something that I was already familiar with - React.
      </p>

      <div className={styles.divider} />

      <header className={styles.header}>
        <h1 className={styles.title}>Creating your First React App with Vite from Scratch</h1>
        <p className={styles.intro}>
          Learning how to use React is a vital skill for many software engineers today.
          This tutorial looks at how you can set up your first React project from scratch so that you may begin development.
        </p>
        <p className={styles.paragraph}>
          Modern day React cannot be used on its own directly and must instead be set up with a bundler.
          This bundler handles the process of converting your React code into web-ready code and can bundle in other packages as well.
          Vite is a popular bundler that is widely used, fast, and simple to set up.
          For this tutorial, we will be using Vite.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 1: Installing Node.JS on your computer</h2>
        <p className={styles.paragraph}>
          In order to use Vite and begin developing with React, we must first install Node.JS.
          Node.JS allows your computer to run JavaScript directly (as opposed to in a browser).
          The process for installation varies by your platform.
        </p>

        <h3 className={styles.subSectionTitle}>macOS</h3>
        <p className={styles.paragraph}>
          Installation of Node.JS on macOS can be done using Homebrew, a popular package manager for macOS.
          If you already have Homebrew installed, you may skip to section 2.
        </p>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            <strong>Installing Homebrew on macOS (If not installed already):</strong>
            <div className={styles.codeBlock}>
              /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            </div>
          </li>
          <li className={styles.listItem}>
            <strong>Installing Node.JS with Homebrew:</strong>
            <div className={styles.codeBlock}>brew install node</div>
          </li>
        </ol>

        <h3 className={styles.subSectionTitle}>Windows</h3>
        <ol className={styles.list}>
          <li className={styles.listItem}>Visit the official Node.JS download site, and scroll down to the section labeled 'Or get a prebuilt Node.js...'.</li>
          <li className={styles.listItem}>Press 'Windows Installer (.msi)' to download the Node.JS installer.</li>
          <li className={styles.listItem}>Once the installer has finished downloading, run it to install Node.JS.</li>
        </ol>

        <h3 className={styles.subSectionTitle}>Linux</h3>
        <p className={styles.paragraph}>
          Installing Node.JS on Linux varies based on your distribution.
          If your distribution is not listed here, refer to your distribution's package manager.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Ubuntu:</strong>
            <div className={styles.codeBlock}>sudo apt install nodejs</div>
          </li>
          <li className={styles.listItem}>
            <strong>Fedora:</strong>
            <div className={styles.codeBlock}>sudo dnf install nodejs</div>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 2: Navigating to your Project Location</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}>Open a terminal (such as 'Terminal' for macOS, or 'Command Prompt' for Windows).</li>
          <li className={styles.listItem}>
            Use the cd command to change directories to the location you want to store your project.
            <div className={styles.codeBlock}>cd Documents</div>
          </li>
        </ol>
        <blockquote className={styles.tipBox}>
          Tip: If you ever get lost, your terminal should display your current location to the left of your terminal cursor.
          You can also use the command <code>cd</code> to return to your home directory.
          If you ever want to go up a folder, use the command <code>cd ..</code>
        </blockquote>
        <div className={styles.imageContainer}>
          <img src="/instructions/1.png" alt="Terminal navigation" className={styles.image} />
          <p className={styles.caption}>Figure 1: A screenshot showing navigation in a terminal to the Documents folder</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 3: Using Vite to create a React project</h2>
        <p className={styles.paragraph}>
          Vite offers an easy way to start your React project with one command.
        </p>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            In the same terminal from the last step, run the following command:
            <div className={styles.codeBlock}>npm create vite@latest</div>
            Note: npm stands for Node Package Manager, and was installed alongside Node.JS.
          </li>
          <li className={styles.listItem}>
            The command may prompt you to enter 'y' to continue. Answer the appearing questions using the following responses:
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Project Name:</strong> Use any name you'd like!</li>
              <li className={styles.listItem}><strong>Framework:</strong> Select 'React'.</li>
              <li className={styles.listItem}><strong>Variant:</strong> Select 'Javascript'.</li>
              <li className={styles.listItem}><strong>Use Rolldown-Vite:</strong> Select 'No'.</li>
              <li className={styles.listItem}><strong>Install with npm:</strong> Select 'No'.</li>
            </ul>
          </li>
          <li className={styles.listItem}>After a few seconds, Vite will have created the essential files to start work on a React project.</li>
        </ol>
        <div className={styles.imageContainer}>
          <img src="/instructions/2.png" alt="Vite setup process" className={styles.image} />
          <p className={styles.caption}>Figure 2: A screenshot showing the Vite setup process</p>
        </div>
        <div className={styles.imageContainer}>
          <img src="/instructions/3.png" alt="Vite setup finished" className={styles.image} />
          <p className={styles.caption}>Figure 3: A screenshot showing the Vite setup process finished</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 4: Entering and Starting your Project</h2>
        <p className={styles.paragraph}>
          Now that our project files have been created, we must navigate into our project, install its dependencies, and start it up.
        </p>
        <ol className={styles.list}>
          <li className={styles.listItem}>
            Use the cd command again to navigate into your project folder.
            <div className={styles.codeBlock}>cd my-project</div>
          </li>
          <li className={styles.listItem}>
            Run npm install to install all of your project's dependencies.
            <div className={styles.codeBlock}>npm install</div>
          </li>
          <li className={styles.listItem}>
            Run npm run dev to start a Vite development server for previewing.
            <div className={styles.codeBlock}>npm run dev</div>
          </li>
        </ol>
        <div className={styles.imageContainer}>
          <img src="/instructions/4.png" alt="Vite development server" className={styles.image} />
          <p className={styles.caption}>Figure 4: A screenshot showing the Vite development server running</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 5: Viewing your Project, and Start Coding!</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}>Open your preferred browser, like Google Chrome.</li>
          <li className={styles.listItem}>Navigate to <strong>localhost:5173</strong> using the URL bar.</li>
          <li className={styles.listItem}>You should now see the template that Vite had set up for your React project!</li>
        </ol>
        <p className={styles.paragraph}>
          From here, you may also open up your project folder in an IDE like Visual Studio Code and begin coding.
          There are many great resources online for learning React, ranging from YouTube videos to the official React tutorial.
        </p>
        <div className={styles.imageContainer}>
          <img src="/instructions/5.png" alt="Project running in browser" className={styles.image} />
          <p className={styles.caption}>Figure 5: A screenshot showing the new project running in a browser with the template code</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Troubleshooting</h2>
        <p className={styles.paragraph}>Here are some common scenarios and solutions for any potential trouble you may have encountered:</p>

        <div className={styles.qaContainer}>
          <div className={styles.question}>Q: npm install is failing!</div>
          <div className={styles.answer}>
            A: You may already have a node_modules folder in your project that is interfering with the install command.
            You may remove it using the command <code>rm -rf node_modules</code>.
          </div>
        </div>

        <div className={styles.qaContainer}>
          <div className={styles.question}>Q: My development server is crashing immediately!</div>
          <div className={styles.answer}>
            A: If you already had Node.JS installed, it is likely that the version you have installed is outdated.
            You can check the version by running <code>node -v</code>. If the version is less than 16, please follow the instructions above to install a more modern version of Node.JS.
          </div>
        </div>

        <div className={styles.qaContainer}>
          <div className={styles.question}>Q: I cannot access my website after running npm run dev!</div>
          <div className={styles.answer}>
            A: Check your terminal where you ran <code>npm run dev</code>.
            Vite will show any errors that have occurred while attempting to start the development server.
            One very common error is when port 5173 is already in use.
            This often means another Vite development server is already running in the background.
          </div>
        </div>
      </section>
    </div>
  );
};
