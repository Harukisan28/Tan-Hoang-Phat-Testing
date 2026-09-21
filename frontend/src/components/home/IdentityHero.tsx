import { Cog } from 'lucide-react';
import { companyProfile } from '../../data/siteData';
import type { RouteHref } from '../../types/site';
import { siteAsset } from '../../utils/routing';
import { ButtonLink } from '../ui/ButtonLink';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import styles from './IdentityHero.module.css';

interface IdentityHeroProps {
  onNavigate: (href: RouteHref) => void;
}

const factoryImage = {
  imageUrl: siteAsset('/assets/tan-hoang-phat-factory.png'),
  imageAlt: 'Mặt tiền nhà xưởng Tân Hoàng Phát dưới bầu trời xanh',
};

export function IdentityHero({ onNavigate }: IdentityHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Cog className={styles.watermark} aria-hidden="true" size={230} strokeWidth={0.7} />
            <img className={styles.logo} src={siteAsset('/assets/tan-hoang-phat-logo.jpeg')} alt="Logo Tân Hoàng Phát" />
            <p className={styles.legalName}>CÔNG TY TNHH</p>
            <h1 className={styles.companyName}>TÂN HOÀNG PHÁT</h1>
            <p className={styles.tagline}>{companyProfile.tagline}</p>
            <p className={styles.description}>{companyProfile.description}</p>
            <div className={styles.actions}>
              <ButtonLink href="/linh-vuc-hoat-dong" onNavigate={onNavigate}>Khám phá năng lực</ButtonLink>
              <ButtonLink href="/lien-he" variant="outline" onNavigate={onNavigate}>Liên hệ tư vấn</ButtonLink>
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.imageWrap}>
              <ResponsiveImage
                src={factoryImage.imageUrl}
                alt={factoryImage.imageAlt}
                loading="eager"
                sizes="(max-width: 880px) 100vw, 58vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
