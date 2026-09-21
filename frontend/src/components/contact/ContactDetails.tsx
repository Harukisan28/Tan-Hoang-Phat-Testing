import { Globe2, Mail, MapPin, PhoneCall } from 'lucide-react';
import { companyProfile } from '../../data/siteData';
import styles from './ContactDetails.module.css';

export function ContactDetails() {
  return (
    <div className={styles.details}>
      <p className="eyebrow">Kết nối trực tiếp</p>
      <h2>Hãy kể chúng tôi nghe về nhu cầu của bạn.</h2>
      <p className={styles.copy}>Dù là một chi tiết cần gia công, một hệ thống inox hay một hạng mục cần thi công, đội ngũ Tân Hoàng Phát sẵn sàng lắng nghe.</p>
      <ul>
        <li><span><PhoneCall aria-hidden="true" size={19} /></span><div><small>Điện thoại</small><a href={`tel:${companyProfile.phone}`}>{companyProfile.phone}</a></div></li>
        <li><span><Mail aria-hidden="true" size={19} /></span><div><small>Email</small><a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a></div></li>
        <li><span><Globe2 aria-hidden="true" size={19} /></span><div><small>Website</small><a href={`https://${companyProfile.website}`} target="_blank" rel="noreferrer">{companyProfile.website}</a></div></li>
        <li><span><MapPin aria-hidden="true" size={19} /></span><div><small>Địa chỉ xưởng</small><p>{companyProfile.address}</p></div></li>
      </ul>
    </div>
  );
}
