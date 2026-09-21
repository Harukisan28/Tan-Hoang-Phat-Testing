import { ArrowUpRight, Layers3 } from 'lucide-react';
import { projects } from '../data/siteData';
import type { RouteHref } from '../types/site';
import { ProjectCard } from '../components/cards/ProjectCard';
import { PageHero } from '../components/sections/PageHero';
import { SectionHeading } from '../components/sections/SectionHeading';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import styles from './ProjectsPage.module.css';

interface ProjectsPageProps {
  onNavigate: (href: RouteHref) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Dự án & năng lực"
        title="Mỗi công trình là một bài toán đáng để làm tốt."
        description="Khám phá những hướng triển khai tiêu biểu từ gia công cơ khí, sản phẩm inox và thi công không gian sản xuất."
        currentLabel="Dự án"
        onNavigate={onNavigate}
      >
        <div className={styles.heroMark}><Layers3 aria-hidden="true" size={26} /><span>Hồ sơ<br />dự án</span></div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.introGrid}>
            <SectionHeading eyebrow="Cách chúng tôi nhìn về dự án" title="Không chỉ là sản phẩm, đó là một phần của quy trình vận hành." />
            <p className="body-copy">Các nội dung dưới đây là những hướng triển khai đại diện cho năng lực của Tân Hoàng Phát. Khi bắt đầu một dự án thực tế, chúng tôi sẽ cùng khách hàng làm rõ mục tiêu, điều kiện và tiêu chí nghiệm thu.</p>
          </div>
          <div className={styles.featured}>
            <div className={styles.featuredMedia}>
              <ResponsiveImage src={projects[0].imageUrl} alt={projects[0].imageAlt} sizes="(max-width: 800px) 100vw, 52vw" />
              <span>01 / 04</span>
            </div>
            <div className={styles.featuredCopy}>
              <p className="eyebrow">{projects[0].category}</p>
              <h2>{projects[0].title}</h2>
              <p>{projects[0].summary}</p>
              <div className={styles.featuredNote}><strong>Kết quả tập trung</strong><span>{projects[0].outcome}</span></div>
              <button className={styles.textAction} type="button" onClick={() => onNavigate('/lien-he')}>Trao đổi về dự án <ArrowUpRight aria-hidden="true" size={17} /></button>
            </div>
          </div>
          <div className={styles.grid}>
            {projects.slice(1).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onNavigate={onNavigate} />)}
          </div>
        </div>
      </section>
    </>
  );
}
