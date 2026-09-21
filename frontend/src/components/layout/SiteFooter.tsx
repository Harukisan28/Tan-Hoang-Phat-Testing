import type { MouseEvent } from 'react';
import { ArrowUpRight, Globe, Mail, MapPin, PhoneCall } from 'lucide-react';
import { companyProfile, navItems } from '../../data/siteData';
import type { RoutePath } from '../../types/site';
import { navigateTo, siteAsset, siteHref } from '../../utils/routing';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: RoutePath) => {
    event.preventDefault();
    navigateTo(href);
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.about}>
            <a className={styles.logoLink} href={siteHref('/')} onClick={(event) => handleNavigate(event, '/')}>
              <img src={siteAsset('/assets/tan-hoang-phat-logo.jpeg')} alt="Logo Tân Hoàng Phát" />
            </a>
            <p>{companyProfile.description}</p>
          </div>
          <div>
            <h2 className={styles.title}>Điều hướng</h2>
            <ul className={styles.linkList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={siteHref(item.href)} onClick={(event) => handleNavigate(event, item.href)}>
                    {item.label}<ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.title}>Liên hệ</h2>
            <ul className={styles.contactList}>
              <li><PhoneCall aria-hidden="true" size={17} /><a href={`tel:${companyProfile.phone}`}>{companyProfile.phone}</a></li>
              <li><Mail aria-hidden="true" size={17} /><a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a></li>
              <li><Globe aria-hidden="true" size={17} /><a href={`https://${companyProfile.website}`} target="_blank" rel="noreferrer">{companyProfile.website}</a></li>
              <li><MapPin aria-hidden="true" size={17} /><span>{companyProfile.address}</span></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Tân Hoàng Phát. Bảo lưu mọi quyền.</span>
          <span>Chất lượng tạo nên thương hiệu · Uy tín xây dựng niềm tin</span>
        </div>
      </div>
    </footer>
  );
}
