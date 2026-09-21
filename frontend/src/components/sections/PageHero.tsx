import type { ReactNode } from 'react';
import type { RouteHref } from '../../types/site';
import { ButtonLink } from '../ui/ButtonLink';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  currentLabel: string;
  onNavigate: (href: RouteHref) => void;
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  currentLabel,
  onNavigate,
  className = '',
  children,
}: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${className}`.trim()}>
      <div className="container">
        <div className={styles.breadcrumb} aria-label="Đường dẫn trang">
          <ButtonLink href="/" variant="outline" size="small" onNavigate={onNavigate}>
            Trang chủ
          </ButtonLink>
          <span aria-hidden="true">/</span>
          <span>{currentLabel}</span>
        </div>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="page-title">{title}</h1>
            <p className="lead">{description}</p>
          </div>
          {children && <div className={`${styles.aside} reveal delay-2`}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
