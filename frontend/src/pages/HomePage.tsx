import { companyProfile, projects, serviceAreas } from '../data/siteData';
import type { RouteHref } from '../types/site';
import { RuleHeading } from '../components/sections/RuleHeading';
import { ValuesGrid } from '../components/about/ValuesGrid';
import { ServiceCard } from '../components/cards/ServiceCard';
import { IdentityHero } from '../components/home/IdentityHero';
import { ProofStrip } from '../components/home/ProofStrip';
import { ProjectRecord } from '../components/projects/ProjectRecord';
import { ButtonLink } from '../components/ui/ButtonLink';
import styles from './HomePage.module.css';

interface HomePageProps {
  onNavigate: (href: RouteHref) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <IdentityHero onNavigate={onNavigate} />

      <section className={styles.valuesSection} aria-labelledby="core-values-title">
        <div className="container">
          <h2 id="core-values-title">GIÁ TRỊ CỐT LÕI</h2>
          <ValuesGrid dark />
        </div>
      </section>

      <section className={`${styles.servicesSection} section`} aria-labelledby="services-title">
        <div className="container">
          <RuleHeading title="LĨNH VỰC HOẠT ĐỘNG" />
          <p id="services-title" className={styles.serviceIntro}>
            Từ gia công chi tiết đến thi công hoàn thiện, mỗi lĩnh vực là một cách Tân Hoàng Phát biến yêu cầu kỹ thuật thành sản phẩm có giá trị sử dụng lâu dài.
          </p>
          <div className={styles.serviceRail}>
            {serviceAreas.map((service) => <ServiceCard key={service.slug} service={service} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.projectsSection} section`} aria-labelledby="projects-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="eyebrow">Dự án tiêu biểu</p>
              <h2 id="projects-title" className="section-heading">Những câu chuyện bắt đầu từ một yêu cầu.</h2>
              <p className="lead">Một vài hướng triển khai tiêu biểu từ năng lực gia công, inox và thi công lắp đặt của Tân Hoàng Phát.</p>
            </div>
            <ButtonLink href="/du-an" variant="outline" size="small" onNavigate={onNavigate}>Xem danh mục dự án</ButtonLink>
          </div>
          <div className={styles.projectRecords}>
            {projects.slice(0, 3).map((project, index) => <ProjectRecord key={project.slug} project={project} index={index} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>

      <ProofStrip />
      <p className={styles.screenReaderNote}>{companyProfile.name} — {companyProfile.tagline}</p>
    </>
  );
}
