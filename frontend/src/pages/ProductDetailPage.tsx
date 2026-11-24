import { Check, ExternalLink } from 'lucide-react';
import { materialReferences } from '../data/siteData';
import type { InoxProduct, RouteHref } from '../types/site';
import { parseProductDetails } from '../utils/productDetails';
import { ButtonLink } from '../components/ui/ButtonLink';
import { PageHero } from '../components/sections/PageHero';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  product: InoxProduct;
  onNavigate: (href: RouteHref) => void;
}

export function ProductDetailPage({ product, onNavigate }: ProductDetailPageProps) {
  const details = parseProductDetails(product.description);

  return (
    <>
      <PageHero
        title={product.title}
        currentLabel={product.title}
        onNavigate={onNavigate}
      />

      <section className={`${styles.detailSection} section`} aria-labelledby="product-detail-title">
        <div className="container">
          <div className={styles.detailGrid}>
            <figure className={styles.productMedia}>
              <img className={styles.productImage} src={product.imageUrl} alt={product.imageAlt} loading="eager" decoding="async" />
              {product.imageCredit && <figcaption>{product.imageCredit}</figcaption>}
            </figure>
            <div className={styles.productCopy}>
              <p className="eyebrow">{product.category}</p>
              <h2 id="product-detail-title">{product.title}</h2>
              {details.intro.length > 0 && (
                <p className={styles.description}>{details.intro.join(' ')}</p>
              )}
              {details.specs.length + details.notes.length > 0 && (
                <dl className={styles.specs}>
                  {details.specs.map((spec) => (
                    <div key={spec.label} className={styles.specRow}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                  {details.notes.map((note) => (
                    <div key={`note-${note.label}`} className={`${styles.specRow} ${styles.specRowNote}`}>
                      <dt>{note.label}</dt>
                      <dd>{note.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {product.highlights && product.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {product.highlights.map((highlight) => (
                    <li key={highlight}><Check aria-hidden="true" size={17} /><span>{highlight}</span></li>
                  ))}
                </ul>
              )}
              <ButtonLink href="/lien-he" onNavigate={onNavigate}>Tư vấn sản phẩm</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {(Boolean(product.useCases?.length) || product.showMaterialReferences) && (
        <section className={`${styles.usesSection} section section--tint`} aria-label="Thông tin bổ sung về sản phẩm">
          <div className="container">
            {product.useCases && product.useCases.length > 0 && (
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
            )}
            {product.showMaterialReferences && (
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
            )}
          </div>
        </section>
      )}
    </>
  );
}
