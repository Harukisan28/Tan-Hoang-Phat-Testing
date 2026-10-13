import { PhoneCall } from 'lucide-react';
import { companyProfile } from '../../data/siteData';
import styles from './FloatingContactActions.module.css';

export function FloatingContactActions() {
  return (
    <nav className={styles.actions} aria-label="Liên hệ nhanh">
      <a
        className={`${styles.action} ${styles.call}`}
        href={`tel:${companyProfile.phone}`}
        aria-label={`Gọi ${companyProfile.phone}, mở trình quay số`}
      >
        <PhoneCall aria-hidden="true" size={19} strokeWidth={2} />
        <span className={styles.desktopLabel}>Gọi {companyProfile.phone}</span>
        <span className={styles.mobileLabel}>Gọi điện</span>
      </a>
      <a
        className={`${styles.action} ${styles.zalo}`}
        href={`https://zalo.me/${companyProfile.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Nhắn Zalo qua số ${companyProfile.phone}, mở trong tab mới`}
      >
        <span className={styles.desktopLabel}>Nhắn Zalo</span>
        <span className={styles.mobileLabel}>Zalo</span>
      </a>
    </nav>
  );
}
