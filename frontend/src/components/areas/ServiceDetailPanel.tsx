import { ArrowUpRight } from 'lucide-react';
import type { RouteHref, ServiceArea } from '../../types/site';
import { ButtonLink } from '../ui/ButtonLink';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './ServiceDetailPanel.module.css';

interface ServiceDetailPanelProps {
  service: ServiceArea;
  onNavigate: (href: RouteHref) => void;
}

export function ServiceDetailPanel({ service, onNavigate }: ServiceDetailPanelProps) {
  return (
    <article className={styles.panel} id={`service-${service.slug}`} aria-labelledby={`service-title-${service.slug}`}>
      <div className={styles.media}>
        <ResponsiveImage src={service.imageUrl} alt={service.imageAlt} sizes="(max-width: 780px) 100vw, 55vw" loading="eager" />
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{service.shortTitle}</p>
        <h2 id={`service-title-${service.slug}`}>{service.title}</h2>
        <p className={styles.summary}>{service.summary}</p>
        <ul>
          {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        <ButtonLink href="/lien-he" variant="solid" size="small" onNavigate={onNavigate}>
          Trao đổi về lĩnh vực này
        </ButtonLink>
        <ArrowUpRight className={styles.corner} aria-hidden="true" size={24} />
      </div>
    </article>
  );
}
