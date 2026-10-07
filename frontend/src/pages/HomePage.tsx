import { companyProfile, inoxProducts, serviceAreas } from '../data/siteData';
import type { RouteHref } from '../types/site';
import { RuleHeading } from '../components/sections/RuleHeading';
import { ValuesGrid } from '../components/about/ValuesGrid';
import { InoxProductCard } from '../components/cards/InoxProductCard';
import { ServiceCard } from '../components/cards/ServiceCard';
import { IdentityHero } from '../components/home/IdentityHero';
import { ProofStrip } from '../components/home/ProofStrip';
import styles from './HomePage.module.css';

interface HomePageProps {
  onNavigate: (href: RouteHref) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <IdentityHero onNavigate={onNavigate} />

      <section className={`${styles.servicesSection} section`} aria-labelledby="services-title">
        <div className="container">
          <RuleHeading id="services-title" title="LĨNH VỰC HOẠT ĐỘNG" />
          <p className={styles.serviceIntro}>
            Từ gia công chi tiết đến thi công hoàn thiện, mỗi lĩnh vực là một cách Tân Hoàng Phát biến yêu cầu kỹ thuật thành sản phẩm có giá trị sử dụng lâu dài.
          </p>
          <div className={styles.serviceRail}>
            {serviceAreas.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.productsSection} section`} aria-labelledby="products-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="eyebrow">Sản phẩm tiêu biểu</p>
              <h2 id="products-title" className="section-heading">Bàn và ghế inox cho nhu cầu sử dụng hằng ngày.</h2>
              <p className="lead">Tìm hiểu thông tin tham khảo về hai dòng sản phẩm inox, cách vệ sinh và những không gian sử dụng thường gặp.</p>
            </div>
          </div>
          <div className={styles.productGrid}>
            {inoxProducts.map((product) => <InoxProductCard key={product.slug} product={product} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      <section className={styles.valuesSection} aria-labelledby="core-values-title">
        <div className="container">
          <h2 id="core-values-title">GIÁ TRỊ CỐT LÕI</h2>
          <ValuesGrid dark />
        </div>
      </section>

      <ProofStrip />
      <p className={styles.screenReaderNote}>{companyProfile.name} — {companyProfile.tagline}</p>
    </>
  );
}
