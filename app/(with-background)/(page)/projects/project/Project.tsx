import ProjectButton from './project-button/ProjectButton';
import styles from './styles.module.css';
import { ProjectButtonInfo } from './project-button/project-button-type';
import ImageCarousel from '@/app/components/image-carousel/ImageCarousel';

export type ProjectProps = {
  title: string,
  description: string,
  images: string[],
  imageAlts: string[],
  buttons: ProjectButtonInfo[],
};

export default function Project({ title, description, images, imageAlts, buttons }: ProjectProps) {
  return (
    <div className={styles.container}>
      <div className={styles.contentLeft}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.buttons}>
          {buttons.map((b) => <ProjectButton key={b.text} from={b} />)}
        </div>
      </div>
      <div className={styles.contentRight}>
        <ImageCarousel images={images} alts={imageAlts} />
      </div>
    </div>
  );
}
