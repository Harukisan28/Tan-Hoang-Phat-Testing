import { Check, ExternalLink } from 'lucide-react';
import { materialReferences } from '../data/siteData';
import type { InoxProduct, RouteHref } from '../types/site';
import { ButtonLink } from '../components/ui/ButtonLink';
import { PageHero } from '../components/sections/PageHero';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  product: InoxProduct;
  onNavigate: (href: RouteHref) => void;
}

export function ProductDetailPage({ product, onNavigate }: ProductDetailPageProps) {
  return (
    <>
      <PageHero
        title={product.title}
        description={product.shortDescription}
        currentLabel={product.title}
        onNavigate={onNavigate}
      />

      <section className={`${styles.detailSection} section`} aria-labelledby="product-detail-title">
        <div className="container">
          <div className={styles.detailGrid}>
            <figure className={styles.productMedia}>
              <ResponsiveImage src={product.imageUrl} alt={product.imageAlt} sizes="(max-width: 800px) 100vw, 52vw" loading="eager" />
              <figcaption>{product.imageCredit}</figcaption>
            </figure>
            <div className={styles.productCopy}>
              <p className="eyebrow">Thông tin tham khảo</p>
              <h2 id="product-detail-title">Thông tin về {product.title.toLowerCase()}</h2>
              <p className={styles.description}>{product.description}</p>
              <ul className={styles.highlights}>
                {product.highlights.map((highlight) => (
                  <li key={highlight}><Check aria-hidden="true" size={17} /><span>{highlight}</span></li>
                ))}
              </ul>
              <ButtonLink href="/lien-he" onNavigate={onNavigate}>Tư vấn sản phẩm</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.usesSection} section section--tint`} aria-labelledby="product-uses-title">
        <div className="container">
          <div className={styles.usesGrid}>
            <div>
              <p className="eyebrow">Gợi ý sử dụng</p>
              <h2 id="product-uses-title" className="section-heading">Lựa chọn theo không gian và nhu cầu thực tế.</h2>
              <p className="body-copy">Các gợi ý dưới đây là những không gian thường gặp, không phải danh sách công trình hay cam kết ứng dụng riêng của Tân Hoàng Phát.</p>
            </div>
            <ul className={styles.useCases}>
              {product.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
            </ul>
          </div>
          <div className={styles.references}>
            <h3>Tham khảo về đặc tính vật liệu inox</h3>
            <p>Đặc tính vệ sinh phụ thuộc vào thiết kế bề mặt, gia công, chủng loại vật liệu và quy trình bảo dưỡng. Inox không có tác dụng kháng khuẩn chủ động.</p>
            <ul>
              {materialReferences.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    {reference.title}<ExternalLink aria-hidden="true" size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
