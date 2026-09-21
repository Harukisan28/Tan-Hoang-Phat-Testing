import { Clock3 } from 'lucide-react';
import type { RouteHref } from '../types/site';
import { ContactDetails } from '../components/contact/ContactDetails';
import { ContactForm } from '../components/contact/ContactForm';
import { PageHero } from '../components/sections/PageHero';
import styles from './ContactPage.module.css';

interface ContactPageProps {
  onNavigate: (href: RouteHref) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Liên hệ Tân Hoàng Phát"
        title="Cùng bắt đầu từ một cuộc trao đổi rõ ràng."
        description="Bạn đang có một bản vẽ, một yêu cầu gia công hoặc một hạng mục cần triển khai? Hãy gửi thông tin để chúng tôi có cơ hội đồng hành."
        currentLabel="Liên hệ"
        onNavigate={onNavigate}
      >
        <div className={styles.heroAvailability}><Clock3 aria-hidden="true" size={21} /><span>Phản hồi trong giờ<br />hành chính</span></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.contactLayout}>
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </section>

      <section className={styles.noteSection}>
        <div className="container">
          <div className={styles.note}><span>Thông tin cần chuẩn bị</span><p>Nếu có thể, hãy gửi kèm bản vẽ, kích thước, vật liệu mong muốn hoặc hình ảnh hiện trạng để đội ngũ tư vấn nhanh và chính xác hơn.</p></div>
        </div>
      </section>
    </>
  );
}
