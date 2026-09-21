import { ArrowUpRight } from 'lucide-react';
import type { Project, RouteHref } from '../../types/site';
import { ButtonLink } from '../ui/ButtonLink';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onNavigate: (href: RouteHref) => void;
  index?: number;
}

export function ProjectCard({ project, onNavigate, index = 0 }: ProjectCardProps) {
  return (
    <article className={`${styles.card} reveal delay-${Math.min(index + 1, 4)}`}>
      <div className={styles.media}>
        <ResponsiveImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 700px) 100vw, 50vw" />
        <span className={styles.category}>{project.category}</span>
      </div>
      <div className={styles.content}>
        <div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <p className={styles.outcome}><strong>Kết quả tập trung:</strong> {project.outcome}</p>
        </div>
        <ButtonLink href="/du-an" size="small" variant="outline" onNavigate={onNavigate} ariaLabel={`Xem dự án ${project.title}`}>
          Xem dự án
        </ButtonLink>
      </div>
      <ArrowUpRight className={styles.cornerIcon} aria-hidden="true" size={26} />
    </article>
  );
}
