import type { Project, RouteHref } from '../../types/site';
import { ButtonLink } from '../ui/ButtonLink';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './ProjectRecord.module.css';

interface ProjectRecordProps {
  project: Project;
  index: number;
  onNavigate: (href: RouteHref) => void;
}

export function ProjectRecord({ project, index, onNavigate }: ProjectRecordProps) {
  return (
    <article className={styles.record}>
      <span className={styles.index} aria-hidden="true">0{index + 1}</span>
      <div className={styles.media}>
        <ResponsiveImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 760px) 100vw, 34vw" />
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{project.category}</p>
        <h3>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.outcome}>{project.outcome}</p>
        <ButtonLink href="/du-an" variant="outline" size="small" onNavigate={onNavigate} ariaLabel={`Xem dự án ${project.title}`}>
          Xem dự án
        </ButtonLink>
      </div>
    </article>
  );
}
