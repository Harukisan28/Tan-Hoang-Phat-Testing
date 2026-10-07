import type { ServiceArea } from '../../types/site';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: ServiceArea;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={`${styles.card} reveal`}>
      <div className={styles.media}>
        <ResponsiveImage src={service.imageUrl} alt={service.imageAlt} sizes="(max-width: 760px) 76vw, (max-width: 1100px) 33vw, 20vw" />
      </div>
      <div className={styles.content}>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
      </div>
    </article>
  );
}
