import { ArrowUpRight, Check } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { serviceAreas } from '../data/siteData';
import type { RouteHref, ServiceSlug } from '../types/site';
import { getCurrentServiceSlug, serviceHref, siteHref } from '../utils/routing';
import { ServiceDetailPanel } from '../components/areas/ServiceDetailPanel';
import { PageHero } from '../components/sections/PageHero';
import { SectionHeading } from '../components/sections/SectionHeading';
import styles from './AreasPage.module.css';

interface AreasPageProps {
  onNavigate: (href: RouteHref) => void;
}

export function AreasPage({ onNavigate }: AreasPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<ServiceSlug>(() => getCurrentServiceSlug() ?? serviceAreas[0].slug);
  const selectedService = useMemo(() => serviceAreas.find((service) => service.slug === selectedSlug) ?? serviceAreas[0], [selectedSlug]);

  useEffect(() => {
    const syncSelectedService = () => setSelectedSlug(getCurrentServiceSlug() ?? serviceAreas[0].slug);
    window.addEventListener('hashchange', syncSelectedService);
    window.addEventListener('popstate', syncSelectedService);
    syncSelectedService();
    return () => {
      window.removeEventListener('hashchange', syncSelectedService);
      window.removeEventListener('popstate', syncSelectedService);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`service-${selectedService.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [selectedService.slug]);

  return (
    <>
      <PageHero
        eyebrow="Lĩnh vực hoạt động"
        title="Năng lực cơ khí được tổ chức thành giải pháp."
        description="Từ gia công chi tiết đến thi công hoàn thiện, Tân Hoàng Phát cung cấp những năng lực có thể kết nối theo yêu cầu của từng công trình."
        currentLabel="Lĩnh vực hoạt động"
        onNavigate={onNavigate}
        className={styles.activityHero}
      >
        <div className={styles.heroStat}><strong>05</strong><span>hướng năng lực<br />được giới thiệu</span></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.introRow}>
            <SectionHeading eyebrow="Chọn một lĩnh vực" title="Bắt đầu từ hạng mục bạn đang cần triển khai." />
            <p className="body-copy">Mỗi dự án có một điều kiện vận hành riêng. Chọn lĩnh vực để xem nhanh phạm vi công việc và cách Tân Hoàng Phát có thể phối hợp.</p>
          </div>
          <div className={styles.areaLayout}>
            <aside className={styles.sidebar} aria-label="Danh sách lĩnh vực hoạt động">
              <p className={styles.sidebarLabel}>Các lĩnh vực</p>
              <nav>
                {serviceAreas.map((service) => {
                  const href = serviceHref(service.slug);
                  const isSelected = service.slug === selectedService.slug;
                  return (
                    <a
                      key={service.slug}
                      href={siteHref(href)}
                      className={isSelected ? styles.selectedLink : ''}
                      aria-current={isSelected ? 'page' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedSlug(service.slug);
                        onNavigate(href);
                      }}
                    >
                      <span>{service.title}</span>
                      <ArrowUpRight aria-hidden="true" size={17} />
                    </a>
                  );
                })}
              </nav>
            </aside>
            <ServiceDetailPanel service={selectedService} onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      <section className={`${styles.processSection} section section--tint`}>
        <div className="container">
          <div className={styles.processGrid}>
            <SectionHeading eyebrow="Quy trình phối hợp" title="Rõ ràng trong từng bước để cùng đi nhanh hơn." description="Một quy trình gọn giúp hạn chế sai lệch, chủ động tiến độ và tạo ra kết quả dễ kiểm soát." />
            <div className={styles.steps}>
              {['Tiếp nhận nhu cầu', 'Tư vấn & đề xuất', 'Gia công / thi công', 'Bàn giao & đồng hành'].map((step, index) => (
                <div className={styles.step} key={step}>
                  <span>0{index + 1}</span>
                  <div><strong>{step}</strong><p><Check aria-hidden="true" size={13} /> Phối hợp minh bạch</p></div>
                  {index < 3 && <ArrowUpRight aria-hidden="true" size={18} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
