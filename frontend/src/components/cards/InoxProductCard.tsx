import { ArrowUpRight } from 'lucide-react';
import type { InoxProduct, RouteHref } from '../../types/site';
import { siteHref } from '../../utils/routing';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './InoxProductCard.module.css';

interface InoxProductCardProps {
  product: InoxProduct;
  onNavigate: (href: RouteHref) => void;
}

export function InoxProductCard({ product, onNavigate }: InoxProductCardProps) {
  return (
    <a
      className={styles.card}
      href={siteHref(product.path)}
      aria-label={`Xem chi tiết ${product.title}`}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(product.path);
      }}
    >
      <div className={styles.media}>
        <ResponsiveImage src={product.imageUrl} alt={product.imageAlt} sizes="(max-width: 700px) 100vw, 50vw" />
      </div>
      <div className={styles.content}>
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.title}</h3>
          <p className={styles.summary}>{product.shortDescription}</p>
        </div>
        <span className={styles.action}>Xem thông tin <ArrowUpRight aria-hidden="true" size={17} /></span>
      </div>
    </a>
  );
}
