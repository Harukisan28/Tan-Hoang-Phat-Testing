import { ArrowUpRight } from 'lucide-react';
import type { RouteHref, ServiceArea } from '../../types/site';
import { serviceHref, siteHref } from '../../utils/routing';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: ServiceArea;
  onNavigate: (href: RouteHref) => void;
}

export function ServiceCard({ service, onNavigate }: ServiceCardProps) {
  const href = serviceHref(service.slug);

  return (
    <a
      className={`${styles.card} reveal`}
      href={siteHref(href)}
      aria-label={`Xem lĩnh vực ${service.title}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      <div className={styles.media}>
        <ResponsiveImage src={service.imageUrl} alt={service.imageAlt} sizes="(max-width: 760px) 76vw, (max-width: 1100px) 33vw, 20vw" />
      </div>
      <div className={styles.content}>
        <p>{service.title}</p>
        <span>{service.summary}</span>
        <ArrowUpRight className={styles.arrow} aria-hidden="true" size={21} strokeWidth={2.2} />
      </div>
    </a>
  );
}
