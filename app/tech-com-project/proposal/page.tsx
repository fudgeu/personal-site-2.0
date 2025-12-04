import styles from './styles.module.css'

export default function Page() {
  return <>
    <p className={styles.section}>
      This project was created as an example of a research proposal for the UCF Office of Undergraduate Research.
      It is meant to accustom us with writing such proposals, giving us the practice to make sure we are able to clearly convey our intents and explain how we plan to execute the research.
      This proposal is not meant to be submitted, but is written as if it were going to be.
    </p>

    <div className={styles.divider} />

    <h2 className={styles.sectionHeader}>Project Title</h2>
    <p className={styles.section}><b>Synthetic Worlds: Consumer sentiment and reactions to generative Al usage in media</b></p>

    <h2 className={styles.sectionHeader}>Project Objective or Aim</h2>
    <p className={styles.section}>This project investigates modern audience sentiment towards the usage of Al-generated
      assets in media, specifically video games and films. It seeks to answer two core research questions: (1) How do
      consumers perceive the presence of Al-generated assets in entertainment media? and (2) Does the inclusion of
      Al-generated content influence perceived quality, enjoyment, or willingness to engage with a media product? To
      address these questions, the study uses a mixed-methods survey experiment consisting of both self- reported
      attitudes regarding Al usage in media and reactions to curated media samples. The overarching aim is to identify
      patterns in consumer acceptance, skepticism, or discomfort regarding generative Al integration in mainstream
      media.</p>

    <h2 className={styles.sectionHeader}>Project Background and Significance</h2>
    <p className={styles.section}>The rapid advancement of generative Al technologies has introduced many new ways to
      create assets such as images, videos, sounds, and even 3D models. Some film and game studios praise the
      technology, aiming to incorporate it into nearly every workflow to increase efficiency. Others have sworn against
      it, promising to stick with human-created art. Nevertheless, it's usage is one the rise, and Al-generated content
      is starting to appear in many pieces of media. While this shift offers increased efficiency and reduced production
      costs, it also raises important questions about authenticity, artistic integrity, labor displacement, and the
      preservation of human creativity. Public reaction to generative Al in media has been mixed: some celebrate
      technological innovation, while others express ethical concerns or emotional resistance. Despite widespread
      discourse, empirical research examining audience perception of Al-generated media remains limited.</p>
    <p className={styles.section}>This project is significant because consumer sentiment can ultimately shape industry
      adoption. Media companies are already experimenting with Al-generated content such as textures and voice snippets.
      However, without understanding how audiences interpret and emotionally respond to these assets - especially when
      integrated subtly versus explicitly - developers and executives risk making decisions that may receive public
      backlash, ultimately hurting the company and the success of its products.</p>
    <p className={styles.section}>The theoretical frameworks guiding this research include media perception theory,
      which examines how audiences cognitively and emotionally interpret media, and technology acceptance models (TAM),
      which helps explain user attitudes toward emerging technologies based on perceived usefulness and risk.
      Additionally, elements of aesthetic theory and authenticity studies offer a lens to evaluate how Al-generated
      content influence perceived artistic value. Together, these frameworks support a thorough examination of not just
      whether people accept Al in media, but why they respond as they do. Ultimately, this research contributes to
      broader discussions on the ethics and cultural meaning of generative Al in creative industries.</p>

    <h2 className={styles.sectionHeader}>Research Methods</h2>
    <p className={styles.section}>This study uses a mixed-methods, survey-based experimental design conducted over the
      Summer C semester (May - August). It will unfold in the following steps:</p>

    <ol>
      <li>
        <h3>Media Asset Collection (May)</h3>
        <p className={styles.section}>I will gather short video clips and screenshots from video games and films, some
          of which contain verified Al-generated elements and others which rely solely on human- created content. This
          step ensures a varied set of samples necessary for evaluating participant perception.</p>
      </li>
      <li>
        <h3>Survey Design (May - June)</h3>
        <p className={styles.section}>Two survey components will be created:</p>
        <ul>
          <li>Direct sentiment assessment, measuring self-reported attitudes on Al- generated content in media on a Likert scale ranging from "not bothered at all" to "highly opposed." Participants will also be given an option to describe their thoughts further in a free-form response. This section is optional.</li>
          <li>Sample-based evaluation, in which participants view media samples and rate perceived quality, enjoyment, and authenticity without initially knowing whether the samples include assets that are Al-generated. Survey items will be pilot tested with a small group to ensure clarity and reliability.</li>
        </ul>
        <p className={styles.section}>Additionally, IRB approval for the created survey will be submitted at this time.
          Once approved, gift cards will be purchased to encourage participants to join the study.</p>
      </li>
      <li>
        <h3>Participant Recruitment and Data Collection (June - July)</h3>
        <p className={styles.section}>Participants will be recruited from both online communities and from UCF via
          mailing lists and recruitment posters around campus. The survey will be given digitally. Responses will be
          anonymous. An effort will be made to recruit a wide variety of participants across all ages and all
          backgrounds to ensure an accurate assessment of the general populous.</p>
      </li>
      <li>
        <h3>Data Analysis (July - August)</h3>
        <p className={styles.section}>Quantitative data will be analyzed using descriptive statistics, correlation
          measures, and group comparison tests. Qualitative open-ended responses will be coded for recurring themes.
          This analysis will reveal patterns in acceptance, concern, and perceived quality.</p>
      </li>
      <li>
        <h3>Synthesis and Report Writing (August)</h3>
        <p className={styles.section}>Results will be compiled into a final report summarizing findings, implications,
          and areas for future research.</p>
      </li>
    </ol>

    <h2 className={styles.sectionHeader}>Expected Outcome</h2>
    <p className={styles.section}>The primary deliverables include a formal research paper for submission to an
      undergraduate research journal, as well as a presentation for events such as a university-wide research showcase.
      Additionally, I plan to produce a concise white paper summarizing the findings for the creative industry. These
      formats ensure the research is accessible both to academic audiences and those working directly in the industry,
      especially for executives who may make overarching decisions on Al usage in the company.</p>
    <p className={styles.section}>The project is expected to generate new knowledge on how consumers understand and
      respond to the integration of generative Al into entertainment media. For the academic field, it contributes
      empirical data to debates on technological adoption and audience perception - areas that are currently largely
      undeserved in this aspect. For the UCF community, this research provides a reference point for conversations about
      Al ethics, creative originality, and future employment conditions in the creative industry. This is especially
      important in a world where adoption of Al into the curriculum of classes is becoming commonplace, especially in
      classes that teach creative studies. Understanding how audiences judge Al-generated assets in media also allows
      student game designers, artists, and filmmakers to make informed decisions on the usage of Al generative
      technologies in their own work. For the creative industry, this research provides executives and designers a clear
      signal on consumer sentiment and reactions towards generative Al usage in media. It allows these professionals to
      make informed decisions on Al usage, and whether it may ultimately harm them. It may also help guide hiring
      decisions - focused both on the skillset of potential employees and the amount of new employees to onboard.
      Ultimately, the study offers a clearer picture of the cultural and artistic implications of generative Al,
      enriching institutional conversation and providing a foundation for future research on human-Al collaboration in
      creative fields.</p>

    <h2 className={styles.sectionHeader}>Literature Review</h2>
    <ul className={styles.section}>
      <li>Yang, R., Wibowo, S (2022). User trust in artificial intelligence: A comprehensive conceptual framework. Electron Markets 32, 2053-2077. https://doi.org/10.1007/s12525-022-00592-6</li>
      <li>Ella Glikson and Anita Williams Woolley (2020): Human Trust in Artificial Intelligence: Review of Empirical Research. ANNALS, 14, 627-660, https://doi.org/10.5465/annals.2018.0057</li>
      <li>Hien Thu Bui, Viachaslau Filimonau, Hakan Sezerel (2024): Al-thenticity: Exploring the effect of perceived authenticity of Al-generated visual content on tourist patronage intentions. Journal of Destination Marketing & Management 34, https://doi.org/10.1016/j.jdmm.2024.100956</li>
      <li>Mogaji E, Viglia G, Srivastava P, Dwivedi YK (2024), "Is it the end of the technology acceptance model in the era of generative artificial intelligence?". International Journal of Contemporary Hospitality Management, Vol. 36 No. 10 pp. 3324-3339, doi: https://doi.org/10.1108/IJCHM-08-2023-1271</li>
      <li>Owsley, C.S., Greenwood, K. (2024): Awareness and perception of artificial intelligence operationalized integration in news media industry and society. Al & Soc 39, 417-431. https://doi.org/10.1007/s00146-022-01386-2</li>
    </ul>

    <h2 className={styles.sectionHeader}>Preliminary Work and Experience</h2>
    <p className={styles.section}>I have begun reviewing scholarly literature and articles on generative Al, its media
      perception, and digital aesthetics, which has helped shape my research questions and methodological framework.
      Additionally, I have assembled an initial collection of potential media samples and experimented with categorizing
      them by asset type (background art, character models, textures, voice snippets). I have also taken a look at
      research studies of a similar style being performed at UCF to lay some ground work for the surveys I will be
      creating. My previous coursework has also helped me learn much about the different research methods and media
      studies that goes into creating a research study. Additionally, they have prepared me to conduct data collection
      and analysis, while prior experience using some Al tools gives me familiarity with both their capabilities and
      limitations. Together, these experiences demonstrate my preparedness to carry out this project effectively and
      complete all stages of data gathering, analysis, and reporting.</p>

    <h2 className={styles.sectionHeader}>IRB/IACUC Statement</h2>
    <p className={styles.section}>This project involves human participants completing a survey; therefore, IRB approval
      is required and will be obtained before data collection begins.</p>

    <h2 className={styles.sectionHeader}>Budget</h2>
    <p className={styles.section}>Total Requested: $900</p>
    <ul className={styles.section}>
      <li>Gift cards (gift cards, $5 each ~150 participants): $750</li>
      <li>Poster printing and related materials: $150</li>
    </ul>
  </>
}
